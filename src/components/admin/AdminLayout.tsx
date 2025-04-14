
import { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
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
  Ship
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin' },
    { name: 'Hero Content', icon: <Image className="h-5 w-5" />, path: '/admin/hero' },
    { name: 'About Content', icon: <FileText className="h-5 w-5" />, path: '/admin/about' },
    { name: 'Gallery', icon: <Image className="h-5 w-5" />, path: '/admin/gallery' },
    { name: 'Services', icon: <ShoppingBag className="h-5 w-5" />, path: '/admin/services' },
    { name: 'For Sale Items', icon: <ShoppingBag className="h-5 w-5" />, path: '/admin/for-sale' },
    { name: 'Contact Info', icon: <Settings className="h-5 w-5" />, path: '/admin/contact' },
    { name: 'User Management', icon: <Users className="h-5 w-5" />, path: '/admin/users' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm p-4 flex items-center justify-between">
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
        <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-20 h-full w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 flex items-center border-b border-gray-200">
          <Ship className="h-8 w-8 text-marina" />
          <span className="ml-2 font-display font-bold text-marina">Mosel Marina</span>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
          <p className="font-medium text-marina truncate">{user.email}</p>
        </div>
        
        <nav className="mt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-marina-muted hover:text-marina transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center text-gray-700 hover:text-marina"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
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
