
import { Euro, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';

type ForSaleItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  year_built?: number;
  image_urls: string[];
  created_at: string;
};

interface ForSaleCardProps {
  item: ForSaleItem;
  onClick: (item: ForSaleItem) => void;
}

export function ForSaleCard({ item, onClick }: ForSaleCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick(item)}
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
            Details anzeigen
          </Button>
        </div>
      </div>
    </div>
  );
}
