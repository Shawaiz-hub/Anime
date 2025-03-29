
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Film, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import BlackholeAnimation from "./BlackholeAnimation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isLoggedIn, userRole, logout } = useAuth();
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled || isMenuOpen
          ? "bg-background/40 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-background/40 to-background/0"
      }`}
    >
      <div className="relative h-full">
        <BlackholeAnimation />
        
        <div className="container flex items-center justify-between py-4 px-6 relative z-10">
          <Link to="/" className="flex items-center space-x-2 font-bold">
            <Film className="h-6 w-6 text-primary" />
            <span>MyAnime</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle Dark Mode</span>
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/watchlist">My Watchlist</Link>
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md p-4 relative z-10">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="block py-2 hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/categories" className="block py-2 hover:text-primary" onClick={toggleMenu}>
              Categories
            </Link>
            <Link to="/contact" className="block py-2 hover:text-primary" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>
          <div className="mt-4 flex flex-col space-y-3">
            <Button variant="ghost" className="justify-start" onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="outline" className="justify-start w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/watchlist" onClick={toggleMenu}>
                  <Button variant="outline" className="justify-start w-full">
                    My Watchlist
                  </Button>
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" onClick={toggleMenu}>
                    <Button variant="outline" className="justify-start w-full">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="destructive" 
                  className="justify-start" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="justify-start w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="justify-start w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
