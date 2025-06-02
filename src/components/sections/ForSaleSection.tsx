
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getForSaleItems } from '@/lib/supabase';
import { ForSaleCard } from '@/components/for-sale/ForSaleCard';
import { ForSaleItemDialog } from '@/components/for-sale/ForSaleItemDialog';
import { formatPrice } from '@/lib/utils';

export function ForSaleSection() {
  const { data: forSaleItems, isLoading } = useQuery({
    queryKey: ['forSaleItems'],
    queryFn: getForSaleItems
  });

  const [selectedItem, setSelectedItem] = useState<null | (typeof forSaleItems)[0]>(null);

  const defaultItems = [
    {
      id: 1,
      title: "Motoryacht 28ft",
      description: "Gut gepflegte 28ft Motoryacht mit geräumiger Kabine, perfekt für Wochenendausflüge auf der Mosel.",
      price: 45000,
      year_built: new Date('2015-05-15').getTime(),
      image_urls: [
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=2074",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=2072"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Angelboot mit Ausrüstung",
      description: "Vollständig ausgestattetes Angelboot, inklusive Ruten, Tackle und Sonar. Bereit für Ihr nächstes Angelabenteuer.",
      price: 12500,
      year_built: new Date('2018-08-22').getTime(),
      image_urls: [
        "https://images.unsplash.com/photo-1564762861010-0473a5cff334?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1483981154649-2c91bca6518b?auto=format&fit=crop&q=80&w=2070"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Vintage Holzsegelboot",
      description: "Wunderschön restauriertes Holzsegelboot aus den 1950er Jahren. Ein wahrer Klassiker, der auf dem Wasser alle Blicke auf sich zieht.",
      price: 28900,
      year_built: new Date('1952-06-17').getTime(),
      image_urls: [
        "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1575397721175-a2cec84e9bc4?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1625399359396-9af41981fac4?auto=format&fit=crop&q=80&w=2071"
      ],
      created_at: new Date().toISOString()
    }
  ];

  const displayItems = forSaleItems?.length ? forSaleItems : defaultItems;

  const handleContact = (item: typeof displayItems[0]) => {
    setSelectedItem(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const messageTextarea = contactSection.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      
      if (messageTextarea) {
        messageTextarea.value = `Ich interessiere mich für ${item.title} (${formatPrice(item.price)}).\n\nBitte stellen Sie mir weitere Informationen zu diesem Artikel zur Verfügung.`;
      }
      
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="for-sale" className="section bg-marina-muted">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">Zu verkaufen</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Durchstöbern Sie unsere aktuelle Auswahl an Booten und Ausrüstung zum Verkauf. Alle Artikel sind gründlich inspiziert und in ausgezeichnetem Zustand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white animate-pulse rounded-lg shadow-lg h-96"></div>
            ))
          ) : (
            displayItems.map((item) => (
              <ForSaleCard
                key={item.id}
                item={item}
                onClick={(item) => setSelectedItem(item)}
              />
            ))
          )}
        </div>

        <ForSaleItemDialog
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onContact={handleContact}
        />
      </div>
    </section>
  );
}
