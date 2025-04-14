
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getContactInfo } from '@/lib/supabase';

export function Footer() {
  const { data: contactInfo } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-marina text-white">
      <div className="wave-divider bg-white"></div>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Mosel Marina</h3>
            <p className="mb-4">
              Your trusted marina at Güls an der Mosel, providing quality boat services since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-marina-accent">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-marina-accent">
                <Instagram size={24} />
              </a>
              <a href={`mailto:${contactInfo?.email || 'info@mosel-marina.de'}`} className="text-white hover:text-marina-accent">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Contact Us</h3>
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
            <h3 className="text-xl font-display font-bold mb-4">Opening Hours</h3>
            {contactInfo?.hours ? (
              <p className="whitespace-pre-line">{contactInfo.hours}</p>
            ) : (
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday: 9:00 - 14:00</p>
                <p>Sunday: Closed</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {currentYear} Mosel Marina at Güls. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
