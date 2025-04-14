
import { useQuery } from '@tanstack/react-query';
import { getAboutContent } from '@/lib/supabase';

export function AboutSection() {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: getAboutContent
  });

  // Default image in case none is available from Supabase
  const defaultImage = "https://images.unsplash.com/photo-1583004231608-3ce598e9879a?auto=format&fit=crop&q=80&w=2070";
  const imageUrl = aboutContent?.image_url || defaultImage;

  return (
    <section id="about" className="section bg-marina-muted">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={imageUrl}
              alt="About Mosel Marina"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
          
          <div>
            <h2 className="h2 text-marina mb-6">
              {isLoading ? "About Mosel Marina" : aboutContent?.title || "About Mosel Marina"}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {isLoading ? (
                <p className="text-gray-600 mb-4">
                  Located at the beautiful Mosel river in Güls, our marina has been serving boat 
                  enthusiasts for decades. We offer comprehensive services for all your boating needs,
                  from maintenance and repairs to storage and accessories.
                </p>
              ) : (
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: aboutContent?.content || `
                      <p class="mb-4">
                        Located at the beautiful Mosel river in Güls, our marina has been serving boat 
                        enthusiasts for decades. We offer comprehensive services for all your boating needs,
                        from maintenance and repairs to storage and accessories.
                      </p>
                      <p>
                        Our experienced team is passionate about boats and committed to providing 
                        excellent service to every customer. Whether you're a seasoned sailor or new to 
                        boating, we're here to help you make the most of your time on the water.
                      </p>
                    `
                  }} 
                />
              )}
            </div>
            
            <div className="mt-8">
              <a 
                href="#services" 
                className="btn btn-primary px-6 py-3 rounded-md text-white"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
