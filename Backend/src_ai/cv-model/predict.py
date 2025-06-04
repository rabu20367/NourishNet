import base64
import json
import sys
from io import BytesIO

import torch
from PIL import Image
import torchvision.transforms as T

FOOD_LABELS = ["carrots", "apples", "bananas", "bread"]


def preprocess(data_uri: str) -> torch.Tensor:
    _, b64 = data_uri.split(',', 1)
    img = Image.open(BytesIO(base64.b64decode(b64))).convert('RGB')
    transform = T.Compose([T.Resize((224, 224)), T.ToTensor()])
    return transform(img).unsqueeze(0)


def predict(model_path: str, data_uri: str) -> dict:
    model = torch.jit.load(model_path, map_location='cpu')
    model.eval()
    inp = preprocess(data_uri)
    with torch.no_grad():
        out = model(inp)[0]
    cls = out[: len(FOOD_LABELS)].argmax().item()
    weight = float(out[len(FOOD_LABELS)])
    spoil = torch.sigmoid(out[len(FOOD_LABELS) + 1]).item() > 0.5
    pack = torch.sigmoid(out[len(FOOD_LABELS) + 2]).item() > 0.5
    return {
        "foodType": FOOD_LABELS[cls],
        "estimatedWeightKg": weight,
        "spoilageDetected": spoil,
        "packagingOk": pack,
    }


if __name__ == "__main__":
    model = sys.argv[1]
    uri = sys.argv[2]
    result = predict(model, uri)
    print(json.dumps(result))
