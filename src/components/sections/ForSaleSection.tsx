import { useQuery } from '@tanstack/react-query';
import { getForSaleItems } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Euro, X, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

export function ForSaleSection() {
  const { data: forSaleItems, isLoading } = useQuery({
    queryKey: ['forSaleItems'],
    queryFn: getForSaleItems
  });

  const [selectedItem, setSelectedItem] = useState<null | (typeof forSaleItems)[0]>(null);

  const defaultItems = [
    {
      id: 1,
      title: "Motor Yacht 28ft",
      description: "Well-maintained 28ft motor yacht with a spacious cabin, perfect for weekend trips on the Mosel.",
      price: 45000,
      year_built: 2015,
      image_urls: [
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=2074",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=2072"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Fishing Boat with Equipment",
      description: "Fully equipped fishing boat, including rods, tackle, and sonar. Ready for your next fishing adventure.",
      price: 12500,
      year_built: 2018,
      image_urls: [
        "https://images.unsplash.com/photo-1564762861010-0473a5cff334?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1483981154649-2c91bca6518b?auto=format&fit=crop&q=80&w=2070"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Vintage Wooden Sailboat",
      description: "Beautifully restored wooden sailboat from the 1950s. A true classic that turns heads on the water.",
      price: 28900,
      year_built: 1952,
      image_urls: [
        "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1575397721175-a2cec84e9bc4?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1625399359396-9af41981fac4?auto=format&fit=crop&q=80&w=2071"
      ],
      created_at: new Date().toISOString()
    }
  ];

  const displayItems = forSaleItems?.length ? forSaleItems : defaultItems;

  const openItemDetails = (item: (typeof displayItems)[0]) => {
    setSelectedItem(item);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (yearBuilt: number | null) => {
    if (!yearBuilt) return "-";
    const date = new Date(yearBuilt);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section id="for-sale" className="section bg-marina-muted">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">For Sale</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse our current selection of boats and equipment for sale. All items are thoroughly inspected and in excellent condition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white animate-pulse rounded-lg shadow-lg h-96"></div>
            ))
          ) : (
            displayItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => openItemDetails(item)}
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 h-56 relative">
                    <img
                      src={item.image_urls[0]}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-marina-accent text-marina-dark px-3 py-1 rounded-full font-semibold flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    {formatPrice(item.price)}
                  </div>
                  
                  {item.year_built && (
                    <div className="absolute top-4 left-4 bg-white text-marina-dark px-3 py-1 rounded-full font-semibold flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(item.year_built)}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-display font-semibold text-marina mb-3">{item.title}</h3>
                  <div className="mt-auto flex justify-center">
                    <Button className="bg-marina hover:bg-marina-light text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-marina font-display">{selectedItem.title}</DialogTitle>
                <div className="flex items-center justify-between mt-2">
                  <DialogDescription className="text-lg font-semibold text-marina-accent">
                    {formatPrice(selectedItem.price)}
                  </DialogDescription>
                  
                  {selectedItem.year_built && (
                    <div className="flex items-center text-gray-700 font-medium">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Baujahr: {selectedItem.year_built}</span>
                    </div>
                  )}
                </div>
              </DialogHeader>

              <div className="mt-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedItem.image_urls.map((url, idx) => (
                      <CarouselItem key={idx}>
                        <div className="p-1">
                          <div className="aspect-video relative rounded-lg overflow-hidden">
                            <img 
                              src={url} 
                              alt={`${selectedItem.title} - image ${idx + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-2 mt-2">
                    <CarouselPrevious className="relative static left-0 translate-x-0 translate-y-0" />
                    <CarouselNext className="relative static right-0 translate-x-0 translate-y-0" />
                  </div>
                </Carousel>
                
                <div className="flex justify-center mt-2 gap-1">
                  {selectedItem.image_urls.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 w-2 rounded-full ${idx === 0 ? 'bg-marina' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedItem.description}</p>
              </div>

              <DialogFooter className="mt-6">
                <Button className="bg-marina hover:bg-marina-light text-white w-full sm:w-auto">
                  Contact About This Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
