
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

type FooterContent = {
  id: number;
  company_name: string;
  company_description: string;
  facebook_url?: string;
  instagram_url?: string;
  email_url?: string;
  copyright_text: string;
  privacy_link_text: string;
  terms_link_text: string;
  imprint_link_text: string;
  created_at: string;
};

interface FooterFormProps {
  footerContent: FooterContent | null;
  isSubmitting: boolean;
  onSubmit: (data: Partial<FooterContent>) => void;
}

export function FooterForm({ footerContent, isSubmitting, onSubmit }: FooterFormProps) {
  const [formData, setFormData] = useState({
    company_name: footerContent?.company_name || '',
    company_description: footerContent?.company_description || '',
    facebook_url: footerContent?.facebook_url || '',
    instagram_url: footerContent?.instagram_url || '',
    email_url: footerContent?.email_url || '',
    copyright_text: footerContent?.copyright_text || '',
    privacy_link_text: footerContent?.privacy_link_text || '',
    terms_link_text: footerContent?.terms_link_text || '',
    imprint_link_text: footerContent?.imprint_link_text || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_name">Firmenname</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => handleChange('company_name', e.target.value)}
            placeholder="Mosel Marina"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="copyright_text">Copyright-Text</Label>
          <Input
            id="copyright_text"
            value={formData.copyright_text}
            onChange={(e) => handleChange('copyright_text', e.target.value)}
            placeholder="Alle Rechte vorbehalten."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company_description">Firmenbeschreibung</Label>
        <Textarea
          id="company_description"
          value={formData.company_description}
          onChange={(e) => handleChange('company_description', e.target.value)}
          placeholder="Ihr vertrauensvoller Marina-Partner in Güls an der Mosel"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="facebook_url">Facebook URL</Label>
            <Input
              id="facebook_url"
              type="url"
              value={formData.facebook_url}
              onChange={(e) => handleChange('facebook_url', e.target.value)}
              placeholder="https://facebook.com/ihr-profil"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input
              id="instagram_url"
              type="url"
              value={formData.instagram_url}
              onChange={(e) => handleChange('instagram_url', e.target.value)}
              placeholder="https://instagram.com/ihr-profil"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email_url">E-Mail</Label>
            <Input
              id="email_url"
              type="email"
              value={formData.email_url}
              onChange={(e) => handleChange('email_url', e.target.value)}
              placeholder="info@mosel-marina.de"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Footer-Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="privacy_link_text">Datenschutz-Text</Label>
            <Input
              id="privacy_link_text"
              value={formData.privacy_link_text}
              onChange={(e) => handleChange('privacy_link_text', e.target.value)}
              placeholder="Datenschutz"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms_link_text">Nutzungsbedingungen-Text</Label>
            <Input
              id="terms_link_text"
              value={formData.terms_link_text}
              onChange={(e) => handleChange('terms_link_text', e.target.value)}
              placeholder="Nutzungsbedingungen"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imprint_link_text">Impressum-Text</Label>
            <Input
              id="imprint_link_text"
              value={formData.imprint_link_text}
              onChange={(e) => handleChange('imprint_link_text', e.target.value)}
              placeholder="Impressum"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Footer-Inhalte speichern
      </Button>
    </form>
  );
}
