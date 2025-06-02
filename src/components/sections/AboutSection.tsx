
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
  
  const defaultTitle = "Über Bootsservice Rörig";
  const defaultContent = "<p class=\"mb-4\">An der wunderschönen Mosel in Güls gelegen, dient unser Marina seit Jahrzehnten Bootsliebhabern. Wir bieten umfassende Dienstleistungen für alle Ihre Bootsbedürfnisse, von Wartung und Reparaturen bis hin zu Lagerung und Zubehör.</p><p>Unser erfahrenes Team ist leidenschaftlich über Boote und engagiert sich dafür, jedem Kunden einen exzellenten Service zu bieten. Ob Sie ein erfahrener Segler oder neu beim Bootfahren sind, wir sind hier, um Ihnen dabei zu helfen, das Beste aus Ihrer Zeit auf dem Wasser zu machen.</p>";

  return (
    <section id="about" className="section bg-marina-muted">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl w-full max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-full mx-auto">
            <img
              src={imageUrl}
              alt="Über Mosel Marina"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
          
          <div>
            <h2 className="h2 text-marina mb-6">
              {isLoading ? defaultTitle : aboutContent?.title || defaultTitle}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {isLoading ? (
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: defaultContent 
                  }} 
                />
              ) : (
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: aboutContent?.content || defaultContent
                  }} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
