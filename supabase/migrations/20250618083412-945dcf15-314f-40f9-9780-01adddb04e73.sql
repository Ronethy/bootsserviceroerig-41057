
-- Create sequence for footer_content first
CREATE SEQUENCE IF NOT EXISTS footer_content_id_seq;

-- Create a table for footer content
CREATE TABLE public.footer_content (
  id INTEGER NOT NULL DEFAULT nextval('footer_content_id_seq'::regclass) PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Mosel Marina',
  company_description TEXT NOT NULL DEFAULT 'Ihr vertrauensvoller Marina-Partner in Güls an der Mosel',
  facebook_url TEXT,
  instagram_url TEXT,
  email_url TEXT,
  copyright_text TEXT NOT NULL DEFAULT 'Alle Rechte vorbehalten.',
  privacy_link_text TEXT NOT NULL DEFAULT 'Datenschutz',
  terms_link_text TEXT NOT NULL DEFAULT 'Nutzungsbedingungen',
  imprint_link_text TEXT NOT NULL DEFAULT 'Impressum',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default footer content
INSERT INTO public.footer_content (
  company_name, 
  company_description, 
  facebook_url, 
  instagram_url, 
  email_url, 
  copyright_text, 
  privacy_link_text, 
  terms_link_text, 
  imprint_link_text
) VALUES (
  'Mosel Marina',
  'Ihr vertrauensvoller Marina-Partner in Güls an der Mosel',
  'https://facebook.com',
  'https://instagram.com',
  'mailto:info@mosel-marina.de',
  'Alle Rechte vorbehalten.',
  'Datenschutz',
  'Nutzungsbedingungen',
  'Impressum'
);
