
import { useQuery } from '@tanstack/react-query';
import { getForSaleItems } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Euro } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ForSaleSection() {
  const { data: forSaleItems, isLoading } = useQuery({
    queryKey: ['forSaleItems'],
    queryFn: getForSaleItems
  });

  // Default items in case none are available from Supabase
  const defaultItems = [
    {
      id: 1,
      title: "Motor Yacht 28ft",
      description: "Well-maintained 28ft motor yacht with a spacious cabin, perfect for weekend trips on the Mosel.",
      price: 45000,
      image_urls: ["https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2070"],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Fishing Boat with Equipment",
      description: "Fully equipped fishing boat, including rods, tackle, and sonar. Ready for your next fishing adventure.",
      price: 12500,
      image_urls: ["https://images.unsplash.com/photo-1564762861010-0473a5cff334?auto=format&fit=crop&q=80&w=2070"],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Vintage Wooden Sailboat",
      description: "Beautifully restored wooden sailboat from the 1950s. A true classic that turns heads on the water.",
      price: 28900,
      image_urls: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=2070"],
      created_at: new Date().toISOString()
    }
  ];

  const displayItems = forSaleItems?.length ? forSaleItems : defaultItems;

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
            // Loading skeleton
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white animate-pulse rounded-lg shadow-lg h-96"></div>
            ))
          ) : (
            displayItems.map((item) => (
              <ForSaleCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

interface ForSaleCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    image_urls: string[];
  };
}

function ForSaleCard({ item }: ForSaleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = item.image_urls.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % item.image_urls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + item.image_urls.length) % item.image_urls.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 h-56 relative">
          <img
            src={item.image_urls[currentImageIndex]}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
        
        {hasMultipleImages && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full"
            >
              <ChevronLeft className="h-6 w-6 text-marina" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full"
            >
              <ChevronRight className="h-6 w-6 text-marina" />
            </button>
          </>
        )}
        
        <div className="absolute top-4 right-4 bg-marina-accent text-marina-dark px-3 py-1 rounded-full font-semibold flex items-center">
          <Euro className="h-4 w-4 mr-1" />
          {item.price.toLocaleString()}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-display font-semibold text-marina mb-3">{item.title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
        <Button className="bg-marina hover:bg-marina-light text-white w-full">
          Inquire Now
        </Button>
      </div>
    </div>
  );
}
