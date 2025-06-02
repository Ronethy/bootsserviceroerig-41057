
import React, { useState, useEffect } from 'react';
import { Loader2, Save, PhoneCall, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactInfo } from '@/lib/supabase';
import { ContactImageUploader } from './ContactImageUploader';

interface ContactFormProps {
  contactInfo: ContactInfo | null;
  isSubmitting: boolean;
  onSubmit: (formData: Partial<ContactInfo>, imageFile: File | null) => void;
}

export function ContactForm({ contactInfo, isSubmitting, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<{
    address: string;
    phone: string;
    email: string;
    hours: string;
    location_image?: string;
  }>({
    address: '',
    phone: '',
    email: '',
    hours: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Update form data when contact info is loaded
  useEffect(() => {
    if (contactInfo) {
      setFormData({
        address: contactInfo.address,
        phone: contactInfo.phone,
        email: contactInfo.email,
        hours: contactInfo.hours,
        location_image: contactInfo.location_image || undefined,
      });
    }
  }, [contactInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" />
            Adresse
          </label>
          <Textarea 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            placeholder="Vollständige Adresse Ihrer Marina"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
            <PhoneCall className="h-4 w-4" />
            Telefon
          </label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            placeholder="Kontakt-Telefonnummer"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4" />
            E-Mail
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="Kontakt-E-Mail-Adresse"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="hours" className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Öffnungszeiten
          </label>
          <Textarea 
            id="hours" 
            name="hours" 
            value={formData.hours} 
            onChange={handleChange} 
            required 
            placeholder="Informationen zu den Öffnungszeiten"
            rows={3}
          />
        </div>
      </div>
      
      <ContactImageUploader 
        currentImage={formData.location_image} 
        onImageChange={setImageFile} 
      />
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wird gespeichert...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Änderungen speichern
          </>
        )}
      </Button>
    </form>
  );
}
