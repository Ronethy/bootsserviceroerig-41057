
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

const defaultTranslations = {
  // Navbar
  'nav.home': {
    en: 'Home',
    de: 'Startseite'
  },
  'nav.about': {
    en: 'About',
    de: 'Über uns'
  },
  'nav.gallery': {
    en: 'Gallery',
    de: 'Galerie'
  },
  'nav.services': {
    en: 'Services',
    de: 'Dienstleistungen'
  },
  'nav.forSale': {
    en: 'For Sale',
    de: 'Zu verkaufen'
  },
  'nav.contact': {
    en: 'Contact',
    de: 'Kontakt'
  },
  'nav.login': {
    en: 'Login',
    de: 'Anmelden'
  },
  'nav.admin': {
    en: 'Admin',
    de: 'Admin'
  },
  
  // Hero Section
  'hero.defaultTitle': {
    en: 'Welcome to Mosel Marina',
    de: 'Willkommen im Mosel Marina'
  },
  'hero.defaultSubtitle': {
    en: 'Your trusted marina at Güls an der Mosel',
    de: 'Ihre vertrauenswürdige Marina in Güls an der Mosel'
  },

  // Services Section
  'services.title': {
    en: 'Our Services',
    de: 'Unsere Dienstleistungen'
  },
  'services.description': {
    en: 'We offer a wide range of services to meet all your boating needs, from maintenance and repairs to docking and storage facilities.',
    de: 'Wir bieten eine breite Palette von Dienstleistungen, um alle Ihre Bootsanforderungen zu erfüllen, von Wartung und Reparaturen bis hin zu Anlege- und Lagereinrichtungen.'
  },
  
  // About Section
  'about.defaultTitle': {
    en: 'About Bootsservice Rörig',
    de: 'Über Bootsservice Rörig'
  },
  'about.defaultContent': {
    en: '<p class="mb-4">Located at the beautiful Mosel river in Güls, our marina has been serving boat enthusiasts for decades. We offer comprehensive services for all your boating needs, from maintenance and repairs to storage and accessories.</p><p>Our experienced team is passionate about boats and committed to providing excellent service to every customer. Whether you\'re a seasoned sailor or new to boating, we\'re here to help you make the most of your time on the water.</p>',
    de: '<p class="mb-4">An der schönen Mosel in Güls gelegen, dient unsere Marina seit Jahrzehnten Bootsliebhabern. Wir bieten umfassende Dienstleistungen für alle Ihre Bootsanforderungen, von Wartung und Reparaturen bis hin zu Lagerung und Zubehör.</p><p>Unser erfahrenes Team ist leidenschaftlich für Boote und setzt sich dafür ein, jedem Kunden einen ausgezeichneten Service zu bieten. Ob Sie ein erfahrener Segler sind oder neu beim Bootfahren sind, wir sind hier, um Ihnen zu helfen, das Beste aus Ihrer Zeit auf dem Wasser zu machen.</p>'
  },
  
  // Gallery Section
  'gallery.title': {
    en: 'Gallery',
    de: 'Galerie'
  },
  'gallery.description': {
    en: 'Explore our marina through these images showcasing our facilities, services, and the beautiful surroundings of Güls an der Mosel.',
    de: 'Erkunden Sie unsere Marina durch diese Bilder, die unsere Einrichtungen, Dienstleistungen und die schöne Umgebung von Güls an der Mosel präsentieren.'
  },
  
  // For Sale Section
  'forSale.title': {
    en: 'Boats For Sale',
    de: 'Boote zu verkaufen'
  },
  'forSale.description': {
    en: 'Browse our current selection of boats and equipment for sale. Contact us for more details on any listing.',
    de: 'Durchsuchen Sie unsere aktuelle Auswahl an Booten und Ausrüstung zum Verkauf. Kontaktieren Sie uns für weitere Details zu jedem Angebot.'
  },
  'forSale.viewDetails': {
    en: 'View Details',
    de: 'Details anzeigen'
  },
  'forSale.price': {
    en: 'Price',
    de: 'Preis'
  },
  'forSale.yearBuilt': {
    en: 'Year',
    de: 'Baujahr'
  },
  'forSale.length': {
    en: 'Length',
    de: 'Länge'
  },
  'forSale.contactUs': {
    en: 'Contact Us',
    de: 'Kontaktieren Sie uns'
  },
  
  // Contact Section
  'contact.title': {
    en: 'Contact Us',
    de: 'Kontakt'
  },
  'contact.description': {
    en: 'Have questions or need more information? Send us a message and we\'ll get back to you as soon as possible.',
    de: 'Haben Sie Fragen oder benötigen Sie weitere Informationen? Senden Sie uns eine Nachricht und wir werden uns so schnell wie möglich bei Ihnen melden.'
  },
  'contact.getInTouch': {
    en: 'Get In Touch',
    de: 'Kontaktieren Sie uns'
  },
  'contact.name': {
    en: 'Name',
    de: 'Name'
  },
  'contact.email': {
    en: 'Email',
    de: 'E-Mail'
  },
  'contact.phone': {
    en: 'Phone (optional)',
    de: 'Telefon (optional)'
  },
  'contact.subject': {
    en: 'Subject',
    de: 'Betreff'
  },
  'contact.selectSubject': {
    en: 'Select a subject',
    de: 'Wählen Sie einen Betreff'
  },
  'contact.generalInquiry': {
    en: 'General Inquiry',
    de: 'Allgemeine Anfrage'
  },
  'contact.message': {
    en: 'Message',
    de: 'Nachricht'
  },
  'contact.send': {
    en: 'Send Message',
    de: 'Nachricht senden'
  },
  'contact.sending': {
    en: 'Sending...',
    de: 'Wird gesendet...'
  },
  'contact.location': {
    en: 'Our Location',
    de: 'Unser Standort'
  },
  'contact.address': {
    en: 'Address',
    de: 'Adresse'
  },
  'contact.mapLoading': {
    en: 'Map Loading...',
    de: 'Karte wird geladen...'
  },
  
  // Footer
  'footer.rights': {
    en: 'All rights reserved.',
    de: 'Alle Rechte vorbehalten.'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    de: 'Datenschutz'
  },
  'footer.terms': {
    en: 'Terms of Service',
    de: 'Nutzungsbedingungen'
  },
  'footer.imprint': {
    en: 'Imprint',
    de: 'Impressum'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or use browser language or default to 'en'
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'de' ? 'de' : 'en';
  };

  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || getBrowserLanguage();
  });

  const [translations] = useState(defaultTranslations);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key '${key}' not found.`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
