import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { LegalContent } from '@/lib/supabase';

interface LegalFormProps {
  legalContent?: LegalContent;
  type: 'privacy' | 'terms' | 'imprint';
  isSubmitting: boolean;
  onSubmit: (data: Partial<LegalContent>) => void;
}

export function LegalForm({ legalContent, type, isSubmitting, onSubmit }: LegalFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (legalContent) {
      setTitle(legalContent.title);
      setContent(legalContent.content);
    } else {
      // Set default titles based on type
      const defaultTitles = {
        privacy: 'Datenschutzerklärung',
        terms: 'Allgemeine Geschäftsbedingungen',
        imprint: 'Impressum'
      };
      setTitle(defaultTitles[type]);
      setContent('');
    }
  }, [legalContent, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      title,
      content
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor={`${type}-title`}>Titel</Label>
        <Input
          id={`${type}-title`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel eingeben..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-content`}>Inhalt</Label>
        <Textarea
          id={`${type}-content`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Inhalt eingeben..."
          className="min-h-[400px]"
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Speichern...
          </>
        ) : (
          'Speichern'
        )}
      </Button>
    </form>
  );
}