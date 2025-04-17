import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getContactInfo } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: contactInfo } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="h2 text-marina mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-display font-semibold text-marina-dark mb-6">{t('contact.getInTouch')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marina"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marina"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marina"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marina"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="General Inquiry">{t('contact.generalInquiry')}</option>
                    <option value="Services">{t('contact.services')}</option>
                    <option value="For Sale Items">{t('contact.forSaleItems')}</option>
                    <option value="Other">{t('contact.other')}</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marina"
                ></textarea>
              </div>
              
              <Button
                type="submit"
                className="w-full md:w-auto bg-marina hover:bg-marina-light text-white px-8 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </div>
          
          <div>
            <h3 className="text-2xl font-display font-semibold text-marina-dark mb-6">{t('contact.ourLocation')}</h3>
            
            <div className="mb-8">
              <AspectRatio ratio={16/9}>
                <img 
                  src={contactInfo?.location_image || "/location-image.jpg"} 
                  alt="Our Location"
                  className="rounded-lg object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-marina mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-marina-dark mb-1">{t('contact.address')}</h4>
                  <p className="text-gray-600">
                    {contactInfo?.address || "Bootsservice Rörig, Güls an der Mosel, 56073 Koblenz, Germany"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-marina mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-marina-dark mb-1">{t('contact.phone')}</h4>
                  <p className="text-gray-600">
                    {contactInfo?.phone || "+49 123 456 7890"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-marina mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-marina-dark mb-1">{t('contact.email')}</h4>
                  <p className="text-gray-600">
                    {contactInfo?.email || "info@mosel-marina.de"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
