
import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Ship,
  Anchor,
  FileImage,
  Phone,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: '/admin',
      active: location.pathname === '/admin' || location.pathname === '/admin/'
    },
    { 
      name: 'Hero Content', 
      icon: <Image className="h-5 w-5" />, 
      path: '/admin/hero',
      active: location.pathname === '/admin/hero'
    },
    { 
      name: 'About Content', 
      icon: <FileText className="h-5 w-5" />, 
      path: '/admin/about',
      active: location.pathname === '/admin/about'
    },
    { 
      name: 'Gallery', 
      icon: <FileImage className="h-5 w-5" />, 
      path: '/admin/gallery',
      active: location.pathname === '/admin/gallery'
    },
    { 
      name: 'Services', 
      icon: <Anchor className="h-5 w-5" />, 
      path: '/admin/services',
      active: location.pathname === '/admin/services'
    },
    { 
      name: 'For Sale Items', 
      icon: <DollarSign className="h-5 w-5" />, 
      path: '/admin/for-sale',
      active: location.pathname === '/admin/for-sale'
    },
    { 
      name: 'Contact Info', 
      icon: <Phone className="h-5 w-5" />, 
      path: '/admin/contact',
      active: location.pathname === '/admin/contact'
    },
    { 
      name: 'User Management', 
      icon: <Users className="h-5 w-5" />, 
      path: '/admin/users',
      active: location.pathname === '/admin/users'
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Ship className="h-8 w-8 text-marina" />
          <span className="ml-2 font-display font-bold text-marina">Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 hover:text-marina focus:outline-none"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar for mobile (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-6 flex items-center border-b border-gray-100">
          <Ship className="h-8 w-8 text-marina" />
          <span className="ml-2 font-display font-bold text-marina text-lg">Mosel Marina</span>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-marina text-white flex items-center justify-center">
              <span className="font-medium text-lg">
                {user.email?.substring(0, 1).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                {user.email}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 text-sm rounded-md transition-colors ${
                    item.active 
                      ? 'bg-marina text-white' 
                      : 'text-gray-700 hover:bg-marina-muted hover:text-marina'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={`mr-3 ${item.active ? 'text-white' : 'text-marina'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-gray-700 hover:text-red-600 hover:border-red-200"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
