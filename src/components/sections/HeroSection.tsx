
import { useQuery } from '@tanstack/react-query';
import { getHeroContent } from '@/lib/supabase';
import { Anchor, ArrowDown } from 'lucide-react';

export function HeroSection() {
  const { data: heroContent, isLoading } = useQuery({
    queryKey: ['heroContent'],
    queryFn: getHeroContent
  });

  // Default background in case no image is available from Supabase
  const defaultBg = "https://images.unsplash.com/photo-1540946485063-a40da27545f7?auto=format&fit=crop&q=80&w=2070";
  const bgImageUrl = heroContent?.image_url || defaultBg;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 77, 104, 0.7), rgba(10, 77, 104, 0.7)), url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-marina-dark opacity-30"></div>
      
      <div className="container relative z-10 text-center px-4 py-24 md:py-32">
        <div className="inline-block mb-6">
          <Anchor className="text-white h-16 w-16 md:h-24 md:w-24 animate-float" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
          {isLoading ? "Welcome to Mosel Marina" : heroContent?.title || "Welcome to Mosel Marina"}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
          {isLoading ? "Your trusted marina at Güls an der Mosel" : heroContent?.subtitle || "Your trusted marina at Güls an der Mosel"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="btn btn-accent px-6 py-3 rounded-md text-lg"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="btn px-6 py-3 rounded-md text-lg bg-white text-marina hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white">
          <ArrowDown className="h-10 w-10" />
        </a>
      </div>
    </section>
  );
}
