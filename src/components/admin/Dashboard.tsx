
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  ShoppingBag, 
  UserPlus, 
  Phone, 
  Settings,
  Anchor,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import management components
import { HeroManagement } from './HeroManagement';
import { AboutManagement } from './AboutManagement';
import { GalleryManagement } from './GalleryManagement';
import { ServicesManagement } from './ServicesManagement';
import { ForSaleManagement } from './ForSaleManagement';
import { ContactManagement } from './ContactManagement';
import { UserManagement } from './UserManagement';

export function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('overview');

  const dashboardSections = [
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Edit the main banner of your website',
      icon: <Image className="h-5 w-5" />,
      component: <HeroManagement />
    },
    {
      id: 'about',
      name: 'About Content',
      description: 'Update information about your marina',
      icon: <FileText className="h-5 w-5" />,
      component: <AboutManagement />
    },
    {
      id: 'gallery',
      name: 'Gallery',
      description: 'Manage images in your gallery',
      icon: <Image className="h-5 w-5" />,
      component: <GalleryManagement />
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Edit services offered at your marina',
      icon: <Anchor className="h-5 w-5" />,
      component: <ServicesManagement />
    },
    {
      id: 'for-sale',
      name: 'For Sale Items',
      description: 'Manage items available for purchase',
      icon: <DollarSign className="h-5 w-5" />,
      component: <ForSaleManagement />
    },
    {
      id: 'contact',
      name: 'Contact Info',
      description: 'Update contact details and opening hours',
      icon: <Phone className="h-5 w-5" />,
      component: <ContactManagement />
    },
    {
      id: 'users',
      name: 'User Management',
      description: 'Manage admin users',
      icon: <UserPlus className="h-5 w-5" />,
      component: <UserManagement />
    },
  ];

  // Render the active section component or the overview grid
  const renderContent = () => {
    if (activeSection === 'overview') {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardSections.map((section) => (
            <Card key={section.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{section.name}</CardTitle>
                <div className="rounded-full bg-marina-muted p-2 text-marina">
                  {section.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveSection(section.id)}
                >
                  Manage
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    } else {
      const section = dashboardSections.find((s) => s.id === activeSection);
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setActiveSection('overview')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
          </div>
          {section?.component}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {activeSection === 'overview' && (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-marina-dark">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your marina's content management system. Select a section below to manage its content.
          </p>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
}
