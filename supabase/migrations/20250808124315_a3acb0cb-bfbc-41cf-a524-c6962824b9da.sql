-- Create table for legal content management
CREATE TABLE public.legal_content (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  type TEXT NOT NULL UNIQUE CHECK (type IN ('privacy', 'terms', 'imprint')),
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT ''
);

-- Enable Row Level Security
ALTER TABLE public.legal_content ENABLE ROW LEVEL SECURITY;

-- Create policies for legal content
CREATE POLICY "Anyone can view legal content" 
ON public.legal_content 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create legal content" 
ON public.legal_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update legal content" 
ON public.legal_content 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete legal content" 
ON public.legal_content 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_legal_content_updated_at
  BEFORE UPDATE ON public.legal_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for the three legal pages
INSERT INTO public.legal_content (type, title, content) VALUES
('privacy', 'Datenschutzerklärung', 'Hier steht der Inhalt der Datenschutzerklärung...'),
('terms', 'Allgemeine Geschäftsbedingungen', 'Hier stehen die Allgemeinen Geschäftsbedingungen...'),
('imprint', 'Impressum', 'Hier steht das Impressum...');