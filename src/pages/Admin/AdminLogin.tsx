
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (username === "Shawaiz" && password === "231980079") {
        // Store admin status in localStorage
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Admin Access Only</h1>
          <p className="text-muted-foreground">Enter admin credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter admin username"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hint: Shawaiz</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2 w-full bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hint: 231980079</p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Access Admin Panel"}
          </Button>

          <div className="text-center text-sm">
            <Link to="/" className="text-primary hover:underline">
              Back to main site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
