
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getContactInfo, getFooterContent } from '@/lib/supabase';

export function Footer() {
  const { data: contactInfo } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

  const { data: footerContent } = useQuery({
    queryKey: ['footerContent'],
    queryFn: getFooterContent
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-marina text-white">
      <div className="wave-divider bg-white"></div>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              {footerContent?.company_name || 'Mosel Marina'}
            </h3>
            <p className="mb-4">
              {footerContent?.company_description || 'Ihr vertrauensvoller Marina-Partner in Güls an der Mosel'}
            </p>
            <div className="flex space-x-4">
              {footerContent?.facebook_url && (
                <a href={footerContent.facebook_url} className="text-white hover:text-marina-accent" target="_blank" rel="noopener noreferrer">
                  <Facebook size={24} />
                </a>
              )}
              {footerContent?.instagram_url && (
                <a href={footerContent.instagram_url} className="text-white hover:text-marina-accent" target="_blank" rel="noopener noreferrer">
                  <Instagram size={24} />
                </a>
              )}
              {footerContent?.email_url && (
                <a href={`mailto:${footerContent.email_url}`} className="text-white hover:text-marina-accent">
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Kontakt</h3>
            <div className="space-y-3">
              {contactInfo?.address && (
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
              
              {contactInfo?.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              
              {contactInfo?.email && (
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 flex-shrink-0" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Öffnungszeiten</h3>
            {contactInfo?.hours ? (
              <p className="whitespace-pre-line">{contactInfo.hours}</p>
            ) : (
              <div className="space-y-2">
                <p>Montag - Freitag: 9:00 - 18:00</p>
                <p>Samstag: 9:00 - 14:00</p>
                <p>Sonntag: Geschlossen</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {currentYear} {footerContent?.company_name || 'Mosel Marina in Güls'}. {footerContent?.copyright_text || 'Alle Rechte vorbehalten.'}</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <Link to="/privacy" className="hover:underline">{footerContent?.privacy_link_text || 'Datenschutz'}</Link>
            <Link to="/terms" className="hover:underline">{footerContent?.terms_link_text || 'Nutzungsbedingungen'}</Link>
            <Link to="/imprint" className="hover:underline">{footerContent?.imprint_link_text || 'Impressum'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
