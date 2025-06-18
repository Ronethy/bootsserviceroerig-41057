
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFooterContent, saveFooterContent } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function useFooterData() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: footerContent, isLoading } = useQuery({
    queryKey: ['footerContent'],
    queryFn: getFooterContent
  });

  const mutation = useMutation({
    mutationFn: saveFooterContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerContent'] });
      toast({
        title: "Erfolg",
        description: "Footer-Inhalte wurden erfolgreich aktualisiert.",
      });
    },
    onError: (error) => {
      console.error('Error saving footer content:', error);
      toast({
        title: "Fehler",
        description: "Beim Speichern der Footer-Inhalte ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  });

  const handleSaveFooter = (data: any) => {
    mutation.mutate(data);
  };

  return {
    footerContent,
    isLoading,
    isPending: mutation.isPending,
    handleSaveFooter
  };
}
