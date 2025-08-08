import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllLegalContent, saveLegalContent, LegalContent } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function useLegalData() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: legalContent, isLoading } = useQuery({
    queryKey: ['allLegalContent'],
    queryFn: getAllLegalContent
  });

  const mutation = useMutation({
    mutationFn: saveLegalContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allLegalContent'] });
      queryClient.invalidateQueries({ queryKey: ['legalContent'] });
      toast({
        title: "Erfolg",
        description: "Rechtliche Inhalte wurden erfolgreich aktualisiert.",
      });
    },
    onError: (error) => {
      console.error('Error saving legal content:', error);
      toast({
        title: "Fehler",
        description: "Beim Speichern der rechtlichen Inhalte ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  });

  const handleSaveLegal = (data: Partial<LegalContent>) => {
    mutation.mutate(data);
  };

  return {
    legalContent,
    isLoading,
    isPending: mutation.isPending,
    handleSaveLegal
  };
}