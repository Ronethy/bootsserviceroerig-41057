
import { useQuery } from '@tanstack/react-query';
import { getAboutContent } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();
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
          <div className="rounded-lg overflow-hidden shadow-xl w-full max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-full mx-auto">
            <img
              src={imageUrl}
              alt="About Mosel Marina"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
          
          <div>
            <h2 className="h2 text-marina mb-6">
              {isLoading ? t('about.defaultTitle') : aboutContent?.title || t('about.defaultTitle')}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {isLoading ? (
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: t('about.defaultContent')
                  }} 
                />
              ) : (
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: aboutContent?.content || t('about.defaultContent')
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
