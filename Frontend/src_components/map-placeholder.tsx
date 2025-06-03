import { MapIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function MapPlaceholder() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card aspect-[16/9] min-h-[300px] p-6 text-center sm:min-h-[400px] md:p-12">
          <MapIcon className="h-12 w-12 text-primary sm:h-16 sm:w-16" />
          <p className="mt-4 text-lg font-medium text-foreground font-headline">Interactive Map Area</p>
          <p className="text-sm text-muted-foreground">
            Real-time locations of donors, volunteers, and recipients will be displayed here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
