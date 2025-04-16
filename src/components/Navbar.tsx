
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Ship } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm py-3 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Ship className="h-8 w-8 text-marina" />
          <span className="font-display font-bold text-marina text-xl">Bootsservice Rörig</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-marina hover:text-marina-accent font-medium">{t('nav.home')}</Link>
          <a href="#about" className="text-marina hover:text-marina-accent font-medium">{t('nav.about')}</a>
          <a href="#gallery" className="text-marina hover:text-marina-accent font-medium">{t('nav.gallery')}</a>
          <a href="#services" className="text-marina hover:text-marina-accent font-medium">{t('nav.services')}</a>
          <a href="#for-sale" className="text-marina hover:text-marina-accent font-medium">{t('nav.forSale')}</a>
          <a href="#contact" className="text-marina hover:text-marina-accent font-medium">{t('nav.contact')}</a>
          
          <LanguageSwitcher />
          
          {user ? (
            <Link to="/admin">
              <Button variant="outline" className="border-marina text-marina hover:bg-marina hover:text-white">
                {t('nav.admin')}
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-marina text-marina hover:bg-marina hover:text-white">
                {t('nav.login')}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-6 w-6 text-marina" />
            ) : (
              <Menu className="h-6 w-6 text-marina" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <a 
              href="#about" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a 
              href="#gallery" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.gallery')}
            </a>
            <a 
              href="#services" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </a>
            <a 
              href="#for-sale" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.forSale')}
            </a>
            <a 
              href="#contact" 
              className="text-marina hover:text-marina-accent font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </a>
            
            {user ? (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-marina text-white hover:bg-marina-light">
                  {t('nav.admin')}
                </Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-marina text-white hover:bg-marina-light">
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
