
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
      title: "Boat Maintenance",
      description: "Professional maintenance services for all types of boats, keeping your vessel in optimal condition year-round.",
      icon: "Wrench",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Docking & Mooring",
      description: "Secure docking facilities with modern amenities and 24/7 surveillance to keep your boat safe.",
      icon: "Anchor",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Boat Insurance",
      description: "Comprehensive insurance options tailored to your specific needs and vessel type.",
      icon: "ShieldCheck",
      image_urls: [] as string[],
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Emergency Assistance",
      description: "Rapid response service for any boating emergencies on the Mosel river.",
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
        className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
        onClick={() => setSelectedService(service)}
      >
        {hasImages ? (
          <div className="mb-6">
            <ServiceSlideshow 
              imageUrls={service.image_urls} 
              title={service.title} 
            />
          </div>
        ) : (
          <div className="mb-6">
            {getIconComponent(service.icon)}
          </div>
        )}
        <h3 className="text-xl font-display font-semibold text-marina-dark mb-4 truncate" title={service.title}>
          {service.title}
        </h3>
        <p className="text-gray-600 flex-grow">
          {service.description}
        </p>
      </div>
    );
  };

  return (
    <section id="services" className="section bg-white hero-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of services to meet all your boating needs
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
