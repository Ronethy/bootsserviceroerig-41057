
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAboutContent, uploadFile, supabase, AboutContent } from '@/lib/supabase';
import { FileText, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { data: aboutContent, isLoading, isError } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: getAboutContent
  });

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    image_url: string;
  }>({
    title: '',
    content: '',
    image_url: '',
  });

  // Update form data when about content is loaded
  useEffect(() => {
    if (aboutContent) {
      setFormData({
        title: aboutContent.title,
        content: aboutContent.content,
        image_url: aboutContent.image_url,
      });
    }
  }, [aboutContent]);

  const saveAboutMutation = useMutation({
    mutationFn: async (data: Partial<AboutContent>) => {
      let result;
      
      if (aboutContent) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('about_content')
          .update(data)
          .eq('id', aboutContent.id)
          .select();
        
        if (updateError) throw updateError;
        result = updateData[0];
      } else {
        // Insert new
        const { data: insertData, error: insertError } = await supabase
          .from('about_content')
          .insert([data])
          .select();
        
        if (insertError) throw insertError;
        result = insertData[0];
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
      toast({
        title: 'Success',
        description: 'About content saved successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save about content: ${error.message}`,
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
        const uploadedUrl = await uploadFile(imageFile, 'marina-content', 'about');
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
    
    saveAboutMutation.mutate({
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
      <h2 className="text-2xl font-bold text-marina-dark">About Section Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit About Content</CardTitle>
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
                  placeholder="About Section Title"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <Textarea 
                  id="content" 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  required 
                  placeholder="Detailed content about your marina"
                  rows={8}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="aboutImage" className="text-sm font-medium">About Image</label>
                <Input 
                  id="aboutImage" 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*"
                />
                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Current image:</p>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                      <img 
                        src={formData.image_url} 
                        alt="About section" 
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
              disabled={isUploading || saveAboutMutation.isPending}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Image...
                </>
              ) : saveAboutMutation.isPending ? (
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
