
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

interface ForSaleItemDialogProps {
  item: ForSaleItem | null;
  onClose: () => void;
  onContact: (item: ForSaleItem) => void;
}

export function ForSaleItemDialog({ item, onClose, onContact }: ForSaleItemDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-marina font-display">{item.title}</DialogTitle>
          <div className="flex items-center justify-between mt-2">
            <DialogDescription className="text-lg font-semibold text-marina-accent">
              {formatPrice(item.price)}
            </DialogDescription>
            
            {item.year_built && (
              <div className="flex items-center text-gray-700 font-medium">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>Datum: {formatDate(item.year_built)}</span>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="mt-4">
          <Carousel className="w-full">
            <CarouselContent>
              {item.image_urls.map((url, idx) => (
                <CarouselItem key={idx}>
                  <div className="p-1">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img 
                        src={url} 
                        alt={`${item.title} - image ${idx + 1}`}
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
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="text-gray-700">{item.description}</p>
        </div>

        <DialogFooter className="mt-6">
          <Button 
            className="bg-marina hover:bg-marina-light text-white w-full sm:w-auto"
            onClick={() => onContact(item)}
          >
            Contact About This Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
