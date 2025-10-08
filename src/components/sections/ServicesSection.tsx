
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/supabase';
import { Anchor, Wrench, ShieldCheck, LifeBuoy } from 'lucide-react';
import { ServiceSlideshow } from '@/components/services/ServiceSlideshow';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ServicesSection() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  const [selectedService, setSelectedService] = useState<typeof defaultServices[0] | null>(null);

  const defaultServices = [
    {
      id: 1,
      title: "Bootswartung",
      description: "Professionelle Wartungsdienste für alle Arten von Booten, um Ihr Wasserfahrzeug das ganze Jahr über in optimalem Zustand zu halten.",
      icon: "Wrench",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Anlegestelle & Liegeplatz",
      description: "Sichere Anlegeeinrichtungen mit modernen Annehmlichkeiten und 24/7-Überwachung, um Ihr Boot sicher zu halten.",
      icon: "Anchor",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Bootsversicherung",
      description: "Umfassende Versicherungsoptionen, die auf Ihre spezifischen Bedürfnisse und Ihren Bootstyp zugeschnitten sind.",
      icon: "ShieldCheck",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Notfall-Hilfe",
      description: "Schnelle Hilfe bei allen Bootsnotfällen auf der Mosel.",
      icon: "LifeBuoy",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    }
  ];

  const displayServices = services?.length ? services : defaultServices;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="h-12 w-12 text-marina" />;
      case 'Anchor':
        return <Anchor className="h-12 w-12 text-marina" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-12 w-12 text-marina" />;
      case 'LifeBuoy':
        return <LifeBuoy className="h-12 w-12 text-marina" />;
      default:
        return <Wrench className="h-12 w-12 text-marina" />;
    }
  };

  const renderServiceCard = (service: typeof displayServices[0]) => {
    const hasImages = service.image_urls && service.image_urls.length > 0;
    
    return (
      <div 
        key={service.id} 
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
        onClick={() => setSelectedService(service)}
      >
        {hasImages ? (
          <div className="w-full">
            <ServiceSlideshow 
              imageUrls={service.image_urls} 
              title={service.title} 
            />
          </div>
        ) : (
          <div className="flex justify-center items-center p-8 bg-marina/5">
            {getIconComponent(service.icon)}
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-display font-semibold text-marina-dark text-center">
            {service.title}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="section bg-white hero-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">Unsere Dienstleistungen</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Wir bieten eine umfassende Palette von Dienstleistungen, um alle Ihre Bootsbedürfnisse zu erfüllen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="bg-gray-100 animate-pulse rounded-lg p-8 h-64"></div>
            ))
          ) : (
            displayServices.map(renderServiceCard)
          )}
        </div>

        {selectedService && (
          <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-marina font-display">{selectedService.title}</DialogTitle>
                <DialogDescription>
                  <p className="text-gray-700 mt-2">{selectedService.description}</p>
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6">
                {selectedService.image_urls && selectedService.image_urls.length > 0 ? (
                  <ServiceSlideshow 
                    imageUrls={selectedService.image_urls} 
                    title={selectedService.title}
                    fullSize={true}
                  />
                ) : (
                  <div className="flex justify-center p-8">
                    {getIconComponent(selectedService.icon)}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
