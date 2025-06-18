
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FooterForm } from './FooterForm';
import { useFooterData } from '@/hooks/useFooterData';

export function FooterManagement() {
  const { footerContent, isLoading, isPending, handleSaveFooter } = useFooterData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-marina" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-marina-dark">Footer-Inhalte verwalten</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Footer-Informationen bearbeiten</CardTitle>
        </CardHeader>
        <CardContent>
          <FooterForm 
            footerContent={footerContent} 
            isSubmitting={isPending}
            onSubmit={handleSaveFooter}
          />
        </CardContent>
      </Card>
    </div>
  );
}
