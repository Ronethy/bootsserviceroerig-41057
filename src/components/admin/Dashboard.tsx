
import { useQuery } from '@tanstack/react-query';
import { 
  getHeroContent, 
  getGalleryImages, 
  getServices, 
  getForSaleItems 
} from '@/lib/supabase';
import { 
  Ship, 
  Image, 
  ShoppingBag, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function Dashboard() {
  const { user } = useAuth();
  
  const { data: heroContent } = useQuery({
    queryKey: ['heroContent'],
    queryFn: getHeroContent
  });
  
  const { data: galleryImages } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: getGalleryImages
  });
  
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });
  
  const { data: forSaleItems } = useQuery({
    queryKey: ['forSaleItems'],
    queryFn: getForSaleItems
  });
  
  const statCards = [
    {
      title: "Gallery Images",
      value: galleryImages?.length || 0,
      icon: <Image className="h-8 w-8 text-marina" />,
      link: "/admin/gallery"
    },
    {
      title: "Services",
      value: services?.length || 0,
      icon: <Ship className="h-8 w-8 text-marina" />,
      link: "/admin/services"
    },
    {
      title: "For Sale Items",
      value: forSaleItems?.length || 0,
      icon: <ShoppingBag className="h-8 w-8 text-marina" />,
      link: "/admin/for-sale"
    },
    {
      title: "Users",
      value: 1, // This would fetch from Supabase Auth in a complete implementation
      icon: <Users className="h-8 w-8 text-marina" />,
      link: "/admin/users"
    }
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your marina website content all in one place.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
            <CardFooter>
              <Link to={card.link} className="text-marina hover:underline text-sm flex items-center">
                Manage <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Content</CardTitle>
            <CardDescription>Manage your homepage hero section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
              {heroContent?.image_url ? (
                <img 
                  src={heroContent.image_url} 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400">No hero image set</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-gray-900">{heroContent?.title || "No title set"}</h3>
              <p className="text-gray-500 text-sm mt-1">{heroContent?.subtitle || "No subtitle set"}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/admin/hero">
              <Button variant="outline">Edit Hero Content</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Recent changes to your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-marina-muted p-2 rounded-full">
                  <Ship className="h-5 w-5 text-marina" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Website launched</p>
                  <p className="text-xs text-gray-500 mt-1">Initial content added to the website</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-marina-muted p-2 rounded-full">
                  <Users className="h-5 w-5 text-marina" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Admin account created</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Last login: {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
