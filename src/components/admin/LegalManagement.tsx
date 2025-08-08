import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalForm } from './LegalForm';
import { useLegalData } from '@/hooks/useLegalData';
import { LegalContent } from '@/lib/supabase';

export function LegalManagement() {
  const { legalContent, isLoading, isPending, handleSaveLegal } = useLegalData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-marina" />
      </div>
    );
  }

  const privacyContent = legalContent?.find(item => item.type === 'privacy');
  const termsContent = legalContent?.find(item => item.type === 'terms');
  const imprintContent = legalContent?.find(item => item.type === 'imprint');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-marina-dark">Rechtliche Inhalte verwalten</h2>
      
      <Tabs defaultValue="privacy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="privacy">Datenschutz</TabsTrigger>
          <TabsTrigger value="terms">AGB</TabsTrigger>
          <TabsTrigger value="imprint">Impressum</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Datenschutzerklärung bearbeiten</CardTitle>
            </CardHeader>
            <CardContent>
              <LegalForm 
                legalContent={privacyContent}
                type="privacy"
                isSubmitting={isPending}
                onSubmit={handleSaveLegal}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Geschäftsbedingungen bearbeiten</CardTitle>
            </CardHeader>
            <CardContent>
              <LegalForm 
                legalContent={termsContent}
                type="terms"
                isSubmitting={isPending}
                onSubmit={handleSaveLegal}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imprint">
          <Card>
            <CardHeader>
              <CardTitle>Impressum bearbeiten</CardTitle>
            </CardHeader>
            <CardContent>
              <LegalForm 
                legalContent={imprintContent}
                type="imprint"
                isSubmitting={isPending}
                onSubmit={handleSaveLegal}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}