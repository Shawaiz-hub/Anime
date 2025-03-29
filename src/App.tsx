
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { MovieProvider } from "@/context/MovieContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import MovieManagement from "./pages/Admin/MovieManagement";
import UserManagement from "./pages/Admin/UserManagement";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import WatchMovie from "./pages/WatchMovie";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MovieProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watch/:id" element={<WatchMovie />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/movies" element={<MovieManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MovieProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
