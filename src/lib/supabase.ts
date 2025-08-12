
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Use hardcoded values instead of environment variables to ensure they're available
const supabaseUrl = "https://bfnvngjthcdbmthluwhi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbnZuZ2p0aGNkYm10aGx1d2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTg2MzgsImV4cCI6MjA2MDE5NDYzOH0.hhOwSS0LW4AksPUMrGFDX_8zNF434DF-AIAR253YE8U";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our data
export type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string; // Add the missing property as optional
};

export type HeroContent = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  created_at: string;
};

export type AboutContent = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
};

export type GalleryImage = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  image_urls: string[];
  created_at: string;
};

export type ForSaleItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  year_built?: number; // Updated to store a timestamp (number) instead of just year
  image_urls: string[];
  created_at: string;
};

export type ContactInfo = {
  id: number;
  address: string;
  phone: string;
  email: string;
  hours: string;
  location_image?: string;
  created_at: string;
};

export type FooterContent = {
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

export type LegalContent = {
  id: number;
  type: 'privacy' | 'terms' | 'imprint';
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

// API functions for data fetching

// Hero content
export async function getHeroContent() {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
  
  return data as HeroContent | null;
}

// About content
export async function getAboutContent() {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
  
  return data as AboutContent | null;
}

// Gallery images
export async function getGalleryImages() {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
  
  return data as GalleryImage[];
}

// Services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
}

// For sale items
export async function getForSaleItems() {
  const { data, error } = await supabase
    .from('for_sale_items')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching for sale items:', error);
    return [];
  }
  
  return data as ForSaleItem[];
}

// Contact info (rate-limited public endpoint)
export async function getContactInfo() {
  try {
    const { data, error } = await supabase.functions.invoke('contact-info');
    
    if (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }
    
    return data as ContactInfo | null;
  } catch (error) {
    console.error('Error calling contact info function:', error);
    return null;
  }
}

// Admin contact info functions (direct database access)
export async function getContactInfoAdmin() {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
  
  return data as ContactInfo | null;
}

export async function saveContactInfo(contactData: Partial<ContactInfo>) {
  const { data: existingData } = await supabase
    .from('contact_info')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from('contact_info')
      .update(contactData)
      .eq('id', existingData.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }

    return data;
  } else {
    // Insert new record
    const { data, error } = await supabase
      .from('contact_info')
      .insert([contactData])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error inserting contact info:', error);
      throw error;
    }

    return data;
  }
}

// Footer content
export async function getFooterContent() {
  const { data, error } = await supabase
    .from('footer_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
  
  return data as FooterContent | null;
}

export async function saveFooterContent(footerData: Partial<FooterContent>) {
  const { data: existingData } = await supabase
    .from('footer_content')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from('footer_content')
      .update(footerData)
      .eq('id', existingData.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating footer content:', error);
      throw error;
    }

    return data;
  } else {
    // Insert new record
    const { data, error } = await supabase
      .from('footer_content')
      .insert([footerData])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error inserting footer content:', error);
      throw error;
    }

    return data;
  }
}

// Legal content
export async function getLegalContent(type: 'privacy' | 'terms' | 'imprint') {
  const { data, error } = await supabase
    .from('legal_content')
    .select('*')
    .eq('type', type)
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching ${type} content:`, error);
    return null;
  }
  
  return data as LegalContent | null;
}

export async function getAllLegalContent() {
  const { data, error } = await supabase
    .from('legal_content')
    .select('*')
    .order('type');
  
  if (error) {
    console.error('Error fetching legal content:', error);
    return [];
  }
  
  return data as LegalContent[];
}

export async function saveLegalContent(legalData: Partial<LegalContent>) {
  const { data: existingData } = await supabase
    .from('legal_content')
    .select('id')
    .eq('type', legalData.type)
    .maybeSingle();

  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from('legal_content')
      .update({
        title: legalData.title,
        content: legalData.content
      })
      .eq('id', existingData.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating legal content:', error);
      throw error;
    }

    return data;
  } else {
    // Insert new record
    const { data, error } = await supabase
      .from('legal_content')
      .insert([legalData])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error inserting legal content:', error);
      throw error;
    }

    return data;
  }
}

// File upload to Supabase Storage
export async function uploadFile(file: File, bucket: string, path: string) {
  const filename = `${Date.now()}-${file.name}`;
  const fullPath = path ? `${path}/${filename}` : filename;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fullPath, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fullPath);
  
  return publicUrl;
}
