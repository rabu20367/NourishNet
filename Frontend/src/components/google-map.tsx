import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    let map: google.maps.Map | undefined;

    loader.load().then(() => {
      if (mapRef.current) {
        map = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 },
          zoom: 12,
          tilt: 45,
        });
      }
    });

    return () => {
      if (map) {
        // Clean up map resources if necessary
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="aspect-[16/9] min-h-[300px] w-full rounded-lg shadow-lg"
    />
  );
}
