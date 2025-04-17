
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactInfo, supabase, ContactInfo, uploadFile } from '@/lib/supabase';
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
    queryKey: ['contactInfo'],
    queryFn: getContactInfo
  });

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
