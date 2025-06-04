import json
import os
from pathlib import Path
from typing import List, Dict

import torch
import torchvision.transforms as T
from torch.utils.data import DataLoader, Dataset
from PIL import Image

FOOD_LABELS = ["carrots", "apples", "bananas", "bread"]

class FoodDataset(Dataset):
    """Simple dataset expecting images in a directory and annotations.json mapping
    filename to metadata.
    {
      "image1.jpg": {"food_type": "carrots", "weight_kg": 1.2, "spoiled": false, "packaging_ok": true}
    }
    """

    def __init__(self, root: str, annotations: str) -> None:
        self.root = Path(root)
        with open(annotations, "r") as f:
            data = json.load(f)
        self.records: List[Dict] = [
            {"path": self.root / name, **info} for name, info in data.items()
        ]
        self.transform = T.Compose([T.Resize((224, 224)), T.ToTensor()])

    def __len__(self) -> int:
        return len(self.records)

    def __getitem__(self, idx: int):
        rec = self.records[idx]
        img = Image.open(rec["path"]).convert("RGB")
        img = self.transform(img)
        label = FOOD_LABELS.index(rec["food_type"])
        weight = torch.tensor([rec["weight_kg"]], dtype=torch.float32)
        spoilage = torch.tensor([float(rec["spoiled"])], dtype=torch.float32)
        packaging = torch.tensor([float(rec["packaging_ok"])], dtype=torch.float32)
        return img, label, weight, spoilage, packaging

def build_model(num_classes: int):
    model = torch.hub.load("pytorch/vision", "resnet18", pretrained=True)
    model.fc = torch.nn.Linear(model.fc.in_features, num_classes + 3)
    return model


def train(data_dir: str, annotations: str, output: str = "food_image_model.pt") -> None:
    ds = FoodDataset(data_dir, annotations)
    loader = DataLoader(ds, batch_size=8, shuffle=True)
    model = build_model(len(FOOD_LABELS))
    opt = torch.optim.Adam(model.parameters(), lr=1e-3)
    loss_fn = torch.nn.MSELoss()
    for epoch in range(1):  # short demo training
        for imgs, labels, weights, spoiled, packaging in loader:
            pred = model(imgs)
            cls_pred = pred[:, : len(FOOD_LABELS)]
            weight_pred = pred[:, len(FOOD_LABELS) : len(FOOD_LABELS) + 1]
            spoil_pred = pred[:, len(FOOD_LABELS) + 1 : len(FOOD_LABELS) + 2]
            pack_pred = pred[:, len(FOOD_LABELS) + 2 :]
            loss = (
                torch.nn.functional.cross_entropy(cls_pred, labels)
                + loss_fn(weight_pred.squeeze(), weights.squeeze())
                + torch.nn.functional.binary_cross_entropy_with_logits(spoil_pred.squeeze(), spoiled.squeeze())
                + torch.nn.functional.binary_cross_entropy_with_logits(pack_pred.squeeze(), packaging.squeeze())
            )
            opt.zero_grad()
            loss.backward()
            opt.step()
    scripted = torch.jit.script(model)
    scripted.save(output)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Train food image analysis model")
    parser.add_argument("data_dir", help="Directory of training images")
    parser.add_argument("annotations", help="Path to annotations JSON")
    parser.add_argument("--output", default="food_image_model.pt", help="Output model path")
    args = parser.parse_args()
    train(args.data_dir, args.annotations, args.output)
