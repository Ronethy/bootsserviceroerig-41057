
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactInfo, supabase, ContactInfo, uploadFile } from '@/lib/supabase';
import { Loader2, Save, PhoneCall, Mail, MapPin, Clock, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: contactInfo, isLoading, isError } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

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
        location_image: contactInfo.location_image,
      });
    }
  }, [contactInfo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const saveContactMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfo>) => {
      let imageUrl = data.location_image;
      
      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'location_images', 'contact');
      }

      let result;
      
      if (contactInfo) {
        // Update existing
        const { data: updateData, error: updateError } = await supabase
          .from('contact_info')
          .update({...data, location_image: imageUrl})
          .eq('id', contactInfo.id)
          .select();
        
        if (updateError) throw updateError;
        result = updateData[0];
      } else {
        // Insert new
        const { data: insertData, error: insertError } = await supabase
          .from('contact_info')
          .insert([{...data, location_image: imageUrl}])
          .select();
        
        if (insertError) throw insertError;
        result = insertData[0];
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      toast({
        title: 'Success',
        description: 'Contact information saved successfully',
      });
      setImageFile(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save contact information: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    saveContactMutation.mutate(formData);
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
      <h2 className="text-2xl font-bold text-marina-dark">Contact Information Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <Textarea 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                  placeholder="Full address of your marina"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                  <PhoneCall className="h-4 w-4" />
                  Phone
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="Contact phone number"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Contact email address"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="hours" className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Opening Hours
                </label>
                <Textarea 
                  id="hours" 
                  name="hours" 
                  value={formData.hours} 
                  onChange={handleChange} 
                  required 
                  placeholder="Opening hours information"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location_image" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Location Image
              </label>
              <div className="flex items-center space-x-4">
                <Input 
                  id="location_image" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-grow"
                />
                {imageFile && (
                  <span className="text-sm text-gray-600">
                    {imageFile.name}
                  </span>
                )}
              </div>
              {formData.location_image && (
                <img 
                  src={formData.location_image} 
                  alt="Current location" 
                  className="mt-2 max-w-xs rounded-lg"
                />
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto" 
              disabled={saveContactMutation.isPending}
            >
              {saveContactMutation.isPending ? (
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
