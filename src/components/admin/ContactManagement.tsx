
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from './ContactForm';
import { useContactData } from '@/hooks/useContactData';

export function ContactManagement() {
  const { contactInfo, isLoading, isPending, handleSaveContact } = useContactData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-marina" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-marina-dark">Kontaktinformationen verwalten</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Kontaktinformationen bearbeiten</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm 
            contactInfo={contactInfo} 
            isSubmitting={isPending}
            onSubmit={handleSaveContact}
          />
        </CardContent>
      </Card>
    </div>
  );
}
