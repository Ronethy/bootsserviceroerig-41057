import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServices, uploadFile, supabase, Service } from '@/lib/supabase';
import { Wrench, Anchor, ShieldCheck, LifeBuoy, Plus, Pencil, Trash2, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function ServicesManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Wrench',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  const createServiceMutation = useMutation({
    mutationFn: async (newService: Omit<Service, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('services')
        .insert([newService])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Success',
        description: 'Service created successfully',
      });
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create service: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const updateServiceMutation = useMutation({
    mutationFn: async (updatedService: Partial<Service> & { id: number }) => {
      const { data, error } = await supabase
        .from('services')
        .update(updatedService)
        .eq('id', updatedService.id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Success',
        description: 'Service updated successfully',
      });
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update service: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete service: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectIcon = (value: string) => {
    setFormData(prev => ({ ...prev, icon: value }));
  };

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrls: string[] = editingService?.image_urls || [];
    
    if (imageFiles.length > 0) {
      setIsUploading(true);
      try {
        const uploadPromises = imageFiles.map(file => 
          uploadFile(file, 'marina-content', 'services')
        );
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls.filter(url => url !== null) as string[]];
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload images',
          variant: 'destructive',
        });
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }
    
    const serviceData = {
      ...formData,
      image_urls: imageUrls,
    };
    
    if (editingService) {
      updateServiceMutation.mutate({ id: editingService.id, ...serviceData });
    } else {
      createServiceMutation.mutate(serviceData as Omit<Service, 'id' | 'created_at'>);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      image_url: service.image_url,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteServiceMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Wrench',
      image_url: '',
    });
    setImageFile(null);
    setEditingService(null);
  };

  const iconOptions = [
    { value: 'Wrench', label: 'Wrench' },
    { value: 'Anchor', label: 'Anchor' },
    { value: 'ShieldCheck', label: 'Shield Check' },
    { value: 'LifeBuoy', label: 'Life Buoy' },
  ];
  
  // Function to render icon preview
  const renderIconPreview = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="h-5 w-5" />;
      case 'Anchor':
        return <Anchor className="h-5 w-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5" />;
      case 'LifeBuoy':
        return <LifeBuoy className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
    }
  };

  // Update form in dialog to support multiple image uploads
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-marina-dark">Services Management</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
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
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="icon" className="text-sm font-medium">Icon</label>
                  <Select 
                    value={formData.icon} 
                    onValueChange={handleSelectIcon}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {renderIconPreview(option.value)}
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="images" className="text-sm font-medium">Images</label>
                  <Input 
                    id="images" 
                    type="file" 
                    multiple 
                    onChange={handleFileChange} 
                    accept="image/*"
                  />
                  {formData.image_urls && formData.image_urls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.image_urls.map((url, index) => (
                        <img 
                          key={index}
                          src={url} 
                          alt={`Service preview ${index + 1}`} 
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      ))}
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
                  disabled={isUploading || createServiceMutation.isPending || updateServiceMutation.isPending}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : createServiceMutation.isPending || updateServiceMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingService ? 'Update' : 'Create'}
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
      ) : isError ? (
        <div className="text-center py-10">
          <p className="text-red-500">Failed to load services. Please try again.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead className="w-[150px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services && services.length > 0 ? (
                services.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="p-2 bg-marina-muted rounded-md inline-flex">
                        {renderIconPreview(service.icon)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.description.length > 100 
                        ? `${service.description.substring(0, 100)}...` 
                        : service.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.image_urls && service.image_urls.length > 0 ? (
                        <div className="flex gap-2">
                          {service.image_urls.slice(0, 3).map((url, index) => (
                            <img 
                              key={index}
                              src={url} 
                              alt={`${service.title} image ${index + 1}`} 
                              className="w-10 h-10 object-cover rounded"
                            />
                          ))}
                          {service.image_urls.length > 3 && (
                            <span className="text-gray-400">
                              +{service.image_urls.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No images</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEdit(service)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                    No services found. Add your first service to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
