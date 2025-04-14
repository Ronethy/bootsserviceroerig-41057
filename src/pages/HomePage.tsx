
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ForSaleSection } from '@/components/sections/ForSaleSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ServicesSection />
        <ForSaleSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
