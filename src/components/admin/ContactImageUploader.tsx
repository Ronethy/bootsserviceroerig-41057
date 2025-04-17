
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ContactImageUploaderProps {
  currentImage?: string | null;
  onImageChange: (file: File | null) => void;
}

export function ContactImageUploader({ currentImage, onImageChange }: ContactImageUploaderProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      onImageChange(file);
    }
  };

  return (
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
      {currentImage && (
        <img 
          src={currentImage} 
          alt="Current location" 
          className="mt-2 max-w-xs rounded-lg"
        />
      )}
    </div>
  );
}
