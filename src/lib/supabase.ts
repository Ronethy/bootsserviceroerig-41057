
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
  image_url: string;
  created_at: string;
};

export type ForSaleItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  year_built?: number; // Add the year_built property as optional
  image_urls: string[];
  created_at: string;
};

export type ContactInfo = {
  id: number;
  address: string;
  phone: string;
  email: string;
  hours: string;
  created_at: string;
};

// API functions for data fetching

// Hero content
export async function getHeroContent() {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
  
  return data as HeroContent;
}

// About content
export async function getAboutContent() {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
  
  return data as AboutContent;
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

// Contact info
export async function getContactInfo() {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
  
  return data as ContactInfo;
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
