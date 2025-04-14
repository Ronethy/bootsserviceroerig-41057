
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHeroContent, uploadFile, supabase, HeroContent } from '@/lib/supabase';
import { Image, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export function HeroManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { data: heroContent, isLoading, isError } = useQuery({
    queryKey: ['heroContent'],
    queryFn: getHeroContent
  });

  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    image_url: string;
  }>({
    title: heroContent?.title || '',
    subtitle: heroContent?.subtitle || '',
    image_url: heroContent?.image_url || '',
  });

  // Update form data when hero content is loaded
  useState(() => {
    if (heroContent) {
      setFormData({
        title: heroContent.title,
        subtitle: heroContent.subtitle,
        image_url: heroContent.image_url,
      });
    }
  });

  const saveHeroMutation = useMutation({
    mutationFn: async (data: Partial<HeroContent>) => {
      let result;
      
      if (heroContent) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('hero_content')
          .update(data)
          .eq('id', heroContent.id)
          .select();
        
        if (updateError) throw updateError;
        result = updateData[0];
      } else {
        // Insert new
        const { data: insertData, error: insertError } = await supabase
          .from('hero_content')
          .insert([data])
          .select();
        
        if (insertError) throw insertError;
        result = insertData[0];
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroContent'] });
      toast({
        title: 'Success',
        description: 'Hero content saved successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save hero content: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.image_url;
    
    if (imageFile) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadFile(imageFile, 'marina-content', 'hero');
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload image',
          variant: 'destructive',
        });
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }
    
    saveHeroMutation.mutate({
      ...formData,
      image_url: imageUrl,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-marina" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-marina-dark">Hero Section Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Main heading for the hero section"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subtitle" className="text-sm font-medium">Subtitle</label>
                <Textarea 
                  id="subtitle" 
                  name="subtitle" 
                  value={formData.subtitle} 
                  onChange={handleChange} 
                  required 
                  placeholder="Supporting text for the hero section"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="heroImage" className="text-sm font-medium">Hero Image</label>
                <Input 
                  id="heroImage" 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*"
                />
                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Current hero image:</p>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                      <img 
                        src={formData.image_url} 
                        alt="Hero background" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto" 
              disabled={isUploading || saveHeroMutation.isPending}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Image...
                </>
              ) : saveHeroMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
