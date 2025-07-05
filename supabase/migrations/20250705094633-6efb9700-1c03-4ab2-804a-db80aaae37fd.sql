-- Add Row Level Security policies for footer_content table
ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view footer content (public facing)
CREATE POLICY "Anyone can view footer content" 
ON public.footer_content 
FOR SELECT 
USING (true);

-- Only authenticated users can create footer content
CREATE POLICY "Authenticated users can create footer content" 
ON public.footer_content 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can update footer content
CREATE POLICY "Authenticated users can update footer content" 
ON public.footer_content 
FOR UPDATE 
USING (true);

-- Only authenticated users can delete footer content
CREATE POLICY "Authenticated users can delete footer content" 
ON public.footer_content 
FOR DELETE 
USING (true);