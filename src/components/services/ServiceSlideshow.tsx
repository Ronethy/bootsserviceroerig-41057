
import { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface ServiceSlideshowProps {
  imageUrls: string[];
  title: string;
}

export function ServiceSlideshow({ imageUrls, title }: ServiceSlideshowProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <Carousel className="w-full overflow-hidden rounded-md">
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index} className="basis-full">
            <img 
              src={imageUrl} 
              alt={`${title} image ${index + 1}`} 
              className="w-full h-48 object-cover transition-transform duration-500"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {imageUrls.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
