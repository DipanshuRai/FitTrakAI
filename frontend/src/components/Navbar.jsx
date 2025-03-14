import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Activity, 
  User, 
  Settings, 
  Menu, 
  X,
  Moon,
  Sun,
  Home,
  Users,
  Phone
} from "lucide-react";
import { Button } from "./ui/Button.jsx";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "./ui/Dropdown-menu.jsx";
import AuthModal from "./AuthModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Badge } from "@/components/ui/badge";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState("login");
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const openLoginModal = () => {
    setAuthView("login");
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthView("signup");
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const baseNavLinks = [
    { name: "Home", path: "/", icon: <Home className="icon" /> },
    { name: "Dashboard", path: "/dashboard", icon: <Activity className="icon" /> },
  ];
  
  const roleNavLinks = {
    trainee: [
      { name: "Profile", path: "/profile", icon: <User className="icon" /> },
      { name: "Settings", path: "/settings", icon: <Settings className="icon" /> },
    ],
    trainer: [
      { name: "My Trainees", path: "/trainees", icon: <Users className="icon" /> },
      { name: "Profile", path: "/profile", icon: <User className="icon" /> },
      { name: "Settings", path: "/settings", icon: <Settings className="icon" /> },
    ],
    admin: [
      { name: "User Management", path: "/users", icon: <Users className="icon" /> },
      { name: "Settings", path: "/settings", icon: <Settings className="icon" /> },
    ]
  };

  const publicLinks = [
    { name: "Contact Us", path: "/contact", icon: <Phone className="icon" /> },
  ];
  
  const navLinks = [
    ...baseNavLinks,
    ...(user ? roleNavLinks[user.role] : []),
    ...publicLinks
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`navbar ${scrolled || location.pathname !== "/" ? "scrolled" : ""}`}
      >
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-brand">
              <Link to="/" className="brand-link">
                <span className="brand-logo">
                  <Activity className="logo-icon" />
                </span>
                <span className="brand-name">FitTrack AI</span>
                {user && (
                  <Badge className="role-badge">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                )}
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="user-button">
                      <User className="user-icon" />
                      Keshav Jindal
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dropdown-content">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button className="auth-button" onClick={openLoginModal}>
                    Log In
                  </Button>
                  <Button className="auth-button primary" onClick={openSignupModal}>
                    Sign Up
                  </Button>
                </>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="theme-button">
                    {theme === "light" ? (
                      <Moon className="theme-icon" />
                    ) : (
                      <Sun className="theme-icon" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dropdown-content">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Mobile menu button */}
            <div className="mobile-menu">
              <Button className="theme-button" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="theme-icon" />
                ) : (
                  <Sun className="theme-icon" />
                )}
              </Button>
              <Button
                className="menu-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="menu-icon" />
                ) : (
                  <Menu className="menu-icon" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            <div className="mobile-nav-content">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="auth-buttons">
                {user ? (
                  <Button className="auth-button" onClick={handleLogout}>
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button className="auth-button" onClick={openLoginModal}>
                      Log In
                    </Button>
                    <Button className="auth-button primary" onClick={openSignupModal}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authView}
      />
    </>
  );
};

export default Navbar;