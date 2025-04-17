
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import NotFound from "./pages/NotFound";

// Import admin management pages
import { HeroManagement } from "./components/admin/HeroManagement";
import { AboutManagement } from "./components/admin/AboutManagement";
import { GalleryManagement } from "./components/admin/GalleryManagement";
import { ServicesManagement } from "./components/admin/ServicesManagement";
import { ForSaleManagement } from "./components/admin/ForSaleManagement";
import { ContactManagement } from "./components/admin/ContactManagement";
import { UserManagement } from "./components/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="hero" element={<HeroManagement />} />
              <Route path="about" element={<AboutManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="services" element={<ServicesManagement />} />
              <Route path="for-sale" element={<ForSaleManagement />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
