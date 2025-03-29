
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, Save, Film, Heart } from "lucide-react";

const Profile = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "User");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "user@example.com");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock watched history
  const [watchHistory] = useState([
    {
      id: "1",
      title: "Demon Slayer: Mugen Train",
      poster: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
      watchedDate: "2023-05-15",
    },
    {
      id: "2",
      title: "My Hero Academia: Heroes Rising",
      poster: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
      watchedDate: "2023-06-10",
    },
  ]);

  // Mock favorite list
  const [favorites] = useState([
    {
      id: "3",
      title: "Weathering With You",
      poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
      addedDate: "2023-04-22",
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate saving profile
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <MainLayout>
      <div className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-gradient-to-br from-primary/30 to-secondary/30 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="userName" className="block text-sm font-medium mb-1">Name</label>
                        <input
                          id="userName"
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="px-4 py-2 w-full md:w-72 bg-background rounded-md border border-input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium mb-1">Email</label>
                        <input
                          id="userEmail"
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="px-4 py-2 w-full md:w-72 bg-background rounded-md border border-input"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{userName}</h1>
                      <p className="text-muted-foreground mb-2">{userEmail}</p>
                      <p className="text-sm text-muted-foreground">Member since {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long' })}</p>
                      <p className="text-sm font-medium mt-1">Account type: <span className="text-primary">{userRole === "admin" ? "Administrator" : "Member"}</span></p>
                    </>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveProfile} disabled={isLoading}>
                          {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recently Watched */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Film className="mr-2 h-5 w-5" /> Recently Watched
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {watchHistory.map((item) => (
                  <div key={item.id} className="group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" variant="secondary" className="text-xs">
                          Watch Again
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">Watched on {item.watchedDate}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Favorites */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Heart className="mr-2 h-5 w-5" /> My Favorites
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {favorites.length > 0 ? (
                  favorites.map((item) => (
                    <div key={item.id} className="group">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" variant="secondary" className="text-xs">
                            Watch Now
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm truncate">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">Added on {item.addedDate}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    You haven't added any favorites yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
