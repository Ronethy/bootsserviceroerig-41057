
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceSlideshowProps {
  imageUrl: string;
  title: string;
}

export function ServiceSlideshow({ imageUrl, title }: ServiceSlideshowProps) {
  if (!imageUrl || imageUrl.trim() === '') {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-md">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-500"
      />
    </div>
  );
}
