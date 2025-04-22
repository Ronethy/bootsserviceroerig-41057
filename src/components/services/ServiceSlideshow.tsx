
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
  fullSize?: boolean;
}

export function ServiceSlideshow({ imageUrls, title, fullSize = false }: ServiceSlideshowProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <Carousel className="w-full overflow-hidden rounded-md">
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className={`${fullSize ? "h-[500px]" : "h-48"} w-full relative`}>
              <img 
                src={imageUrl} 
                alt={`${title} image ${index + 1}`} 
                className="w-full h-full object-contain absolute inset-0"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {imageUrls.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
}
