
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGalleryImages, uploadFile, supabase, GalleryImage } from '@/lib/supabase';
import { Image, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

export function GalleryManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: galleryImages, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: getGalleryImages
  });

  const createImageMutation = useMutation({
    mutationFn: async (newImage: Omit<GalleryImage, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('gallery_images')
        .insert([newImage])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast({
        title: 'Success',
        description: 'Gallery image added successfully',
      });
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add gallery image: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const updateImageMutation = useMutation({
    mutationFn: async (updatedImage: Partial<GalleryImage> & { id: number }) => {
      const { data, error } = await supabase
        .from('gallery_images')
        .update(updatedImage)
        .eq('id', updatedImage.id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast({
        title: 'Success',
        description: 'Gallery image updated successfully',
      });
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update gallery image: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast({
        title: 'Success',
        description: 'Gallery image deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete gallery image: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = editingImage?.image_url || '';
    
    if (imageFile) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadFile(imageFile, 'marina-content', 'gallery');
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload image',
          variant: 'destructive',
        });
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }
    
    const imageData = {
      ...formData,
      image_url: imageUrl,
    };
    
    if (editingImage) {
      updateImageMutation.mutate({ id: editingImage.id, ...imageData });
    } else {
      createImageMutation.mutate(imageData as Omit<GalleryImage, 'id' | 'created_at'>);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      image_url: image.image_url,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImageMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
    });
    setImageFile(null);
    setEditingImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-marina-dark">Gallery Management</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Gallery Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="galleryImage" className="text-sm font-medium">Image</label>
                  <Input 
                    id="galleryImage" 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    required={!editingImage}
                  />
                  {formData.image_url && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-2">Current image:</p>
                      <img 
                        src={formData.image_url} 
                        alt="Gallery preview" 
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isUploading || createImageMutation.isPending || updateImageMutation.isPending}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : createImageMutation.isPending || updateImageMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingImage ? 'Update' : 'Add'} Image
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-marina" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages && galleryImages.length > 0 ? (
            galleryImages.map(image => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleEdit(image)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{image.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{image.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10 border rounded-lg">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold">No gallery images</h3>
              <p className="mt-1 text-sm text-gray-500">Add images to your gallery to showcase your marina.</p>
              <div className="mt-6">
                <Button onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Gallery Image
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
