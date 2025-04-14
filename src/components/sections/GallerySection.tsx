
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGalleryImages } from '@/lib/supabase';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);
  
  const { data: images, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: getGalleryImages
  });

  // Default placeholder images in case none are available from Supabase
  const defaultImages = [
    {
      id: 1,
      title: "Marina View",
      description: "Beautiful view of the marina at sunset",
      image_url: "https://images.unsplash.com/photo-1540946485063-a40da27545f7?auto=format&fit=crop&q=80&w=2070",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Boat Maintenance",
      description: "Skilled technicians working on boat repairs",
      image_url: "https://images.unsplash.com/photo-1584196287766-7ca8cf01bbf2?auto=format&fit=crop&q=80&w=2070",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Mosel River",
      description: "Scenic view of the Mosel river",
      image_url: "https://images.unsplash.com/photo-1620064881843-23dbd255e0e1?auto=format&fit=crop&q=80&w=2070",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Sailing Experience",
      description: "Enjoying a day on the water",
      image_url: "https://images.unsplash.com/photo-1531339751961-324b4c494be8?auto=format&fit=crop&q=80&w=2070",
      created_at: new Date().toISOString()
    }
  ];

  const displayImages = images?.length ? images : defaultImages;

  const openLightbox = (url: string, caption: string) => {
    setSelectedImage(url);
    setSelectedCaption(caption);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedCaption(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="h2 text-marina mb-4">Gallery</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our marina through these images showcasing our facilities, 
            services, and the beautiful surroundings of Güls an der Mosel.
          </p>
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-gray-200 animate-pulse rounded-lg" style={{ height: '300px' }}></div>
            ))}
          </div>
        ) : (
          // Slideshow carousel for all screen sizes
          <div className="px-4 max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {displayImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div 
                      className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 relative"
                      onClick={() => openLightbox(image.image_url, image.title)}
                    >
                      <img 
                        src={image.image_url} 
                        alt={image.title} 
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-marina/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                        <p className="text-white/90 text-sm">{image.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static left-0 translate-x-0 translate-y-0 mr-2" />
                <CarouselNext className="relative static right-0 translate-x-0 translate-y-0" />
              </div>
            </Carousel>
            
            {/* Image indicators */}
            <div className="flex justify-center mt-4 gap-1">
              {displayImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className="h-2 w-2 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-marina-accent"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage} 
                alt={selectedCaption || 'Gallery image'} 
                className="max-w-full max-h-[80vh] object-contain"
              />
              {selectedCaption && (
                <div className="text-white text-center mt-4 text-xl">
                  {selectedCaption}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
