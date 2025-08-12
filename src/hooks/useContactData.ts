
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactInfoAdmin, saveContactInfo, ContactInfo, uploadFile } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function useContactData() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { 
    data: contactInfo, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['contactInfoAdmin'],
    queryFn: getContactInfoAdmin
  });

  const saveContactMutation = useMutation({
    mutationFn: async (data: Partial<ContactInfo>) => {
      let imageUrl = data.location_image;
      
      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'location_images', 'contact');
      }

      return await saveContactInfo({...data, location_image: imageUrl});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfoAdmin'] });
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

  const handleSaveContact = (formData: Partial<ContactInfo>, newImageFile: File | null) => {
    if (newImageFile) {
      setImageFile(newImageFile);
    }
    saveContactMutation.mutate(formData);
  };

  return {
    contactInfo,
    isLoading,
    isError,
    isPending: saveContactMutation.isPending,
    handleSaveContact
  };
}
