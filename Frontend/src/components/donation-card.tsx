import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Donation } from "@/lib/types";
import { MapPin, CalendarDays, Package, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DonationCardProps {
  donation: Donation;
}

export function DonationCard({ donation }: DonationCardProps) {
  const postedAgo = formatDistanceToNow(new Date(donation.postedAt), {
    addSuffix: true,
  });

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl">
      {donation.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={donation.imageUrl}
            alt={donation.foodName}
            layout="fill"
            objectFit="cover"
            data-ai-hint={donation.dataAiHint || "food donation"}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-1">
            {donation.foodName}
          </CardTitle>
          <Badge
            variant={donation.status === "Available" ? "default" : "secondary"}
            className={
              donation.status === "Available"
                ? "bg-primary text-primary-foreground"
                : ""
            }
          >
            {donation.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm">
          <Package className="mr-2 h-4 w-4" />
          {donation.category} - {donation.quantity}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {donation.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" /> {donation.location.address}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" /> Posted {postedAgo}
        </div>
        {donation.pickupBy && (
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" /> Pickup by:{" "}
            {new Date(donation.pickupBy).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href={`/donation/${donation.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
