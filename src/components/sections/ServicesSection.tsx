
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/supabase';
import { Anchor, Tool, ShieldCheck, LifeBuoy } from 'lucide-react';

export function ServicesSection() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  // Default services in case none are available from Supabase
  const defaultServices = [
    {
      id: 1,
      title: "Boat Maintenance",
      description: "Professional maintenance services for all types of boats, keeping your vessel in optimal condition year-round.",
      icon: "Tool",
      image_url: "",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Docking & Mooring",
      description: "Secure docking facilities with modern amenities and 24/7 surveillance to keep your boat safe.",
      icon: "Anchor",
      image_url: "",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Boat Insurance",
      description: "Comprehensive insurance options tailored to your specific needs and vessel type.",
      icon: "ShieldCheck",
      image_url: "",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Emergency Assistance",
      description: "Rapid response service for any boating emergencies on the Mosel river.",
      icon: "LifeBuoy",
      image_url: "",
      created_at: new Date().toISOString()
    }
  ];

  const displayServices = services?.length ? services : defaultServices;

  // Function to map string icon names to actual icons
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Tool':
        return <Tool className="h-12 w-12 text-marina" />;
      case 'Anchor':
        return <Anchor className="h-12 w-12 text-marina" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-12 w-12 text-marina" />;
      case 'LifeBuoy':
        return <LifeBuoy className="h-12 w-12 text-marina" />;
      default:
        return <Tool className="h-12 w-12 text-marina" />;
    }
  };

  return (
    <section id="services" className="section bg-white hero-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of services to meet all your boating needs, from maintenance and repairs
            to docking and storage facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="bg-gray-100 animate-pulse rounded-lg p-8 h-64"></div>
            ))
          ) : (
            displayServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-6">
                  {getIconComponent(service.icon)}
                </div>
                <h3 className="text-xl font-display font-semibold text-marina-dark mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
