import { useQuery } from '@tanstack/react-query';
import { getLegalContent } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader2 } from 'lucide-react';

export default function ImprintPage() {
  const { data: imprintContent, isLoading } = useQuery({
    queryKey: ['legalContent', 'imprint'],
    queryFn: () => getLegalContent('imprint')
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-marina" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-marina-dark mb-8">
              {imprintContent?.title || 'Impressum'}
            </h1>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {imprintContent?.content || 'Hier steht das Impressum...'}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}