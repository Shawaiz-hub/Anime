
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Film,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  Plus,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Activity,
  PlusCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// Mock data for the dashboard
const dashboardStats = {
  totalMovies: 152,
  activeUsers: 847,
  pendingReviews: 23,
  uploadProgress: 68,
};

const recentActivities = [
  {
    id: 1,
    type: "upload",
    title: "Jujutsu Kaisen 0",
    timestamp: "2 hours ago",
    user: "admin",
  },
  {
    id: 2,
    type: "review",
    title: "Demon Slayer: Mugen Train",
    timestamp: "5 hours ago",
    user: "AnimeExpert101",
  },
  {
    id: 3,
    type: "user",
    title: "New user registered",
    timestamp: "1 day ago",
    user: "SakuraChan",
  },
  {
    id: 4,
    type: "upload",
    title: "My Hero Academia: Heroes Rising",
    timestamp: "2 days ago",
    user: "admin",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(128);

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin panel",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setIsAdmin(true);
    }
    
    // Simulate active users changing
    const interval = setInterval(() => {
      setCurrentUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // Random number between -2 and 2
        return prev + change < 0 ? 0 : prev + change;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [navigate, toast]);

  const handleLogout = () => {
    logout();
    
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel",
    });
    
    navigate("/");
  };

  if (!isAdmin) {
    return null; // Don't render anything if not admin
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border hidden md:block">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Admin Panel</span>
          </div>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/20 text-primary"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/admin/movies"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-secondary"
            >
              <Film className="mr-3 h-5 w-5" />
              Movies
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-secondary"
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </Link>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-secondary"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Reviews
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-secondary"
            >
              <Clock className="mr-3 h-5 w-5" />
              Scheduled
            </a>
          </div>
        </nav>

        <div className="px-3 mt-auto absolute bottom-4 left-0 right-0">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Nav */}
        <div className="border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button size="sm" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="outline" size="sm" className="md:hidden" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Movies</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.totalMovies}</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Film className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-500">+12</span> from last month
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.activeUsers}</h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-500">+25%</span> from last month
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Users</p>
                  <h3 className="text-2xl font-bold">{currentUsers}</h3>
                </div>
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-blue-500">Live</span> right now
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.pendingReviews}</h3>
                </div>
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <MessageSquare className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-red-500">+5</span> since yesterday
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="py-6 justify-start" onClick={() => navigate("/admin/movies")}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Manage Movies
              </Button>
              <Button variant="outline" className="py-6 justify-start" onClick={() => navigate("/admin/users")}>
                <Users className="mr-2 h-5 w-5" />
                Manage Users
              </Button>
              <Button variant="secondary" className="py-6 justify-start">
                <MessageSquare className="mr-2 h-5 w-5" />
                Review Moderation
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <Button variant="ghost" size="sm" className="flex items-center text-xs">
                View All <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      activity.type === 'upload' 
                        ? 'bg-primary/10 text-primary' 
                        : activity.type === 'review'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {activity.type === 'upload' ? (
                        <Film className="h-4 w-4" />
                      ) : activity.type === 'review' ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
