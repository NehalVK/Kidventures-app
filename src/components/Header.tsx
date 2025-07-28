import React from "react";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import logo from "@/assets/kidventurelogo.jpg";

interface AgeOption {
  value: string;
  label: string;
}

interface NavLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface AgeSelectorProps {
  className?: string;
}

const ageOptions: AgeOption[] = [
  { value: "2-5", label: "Ages 2-5" },
  { value: "5-7", label: "Ages 5-7" },
  { value: "8-10", label: "Ages 8-10" },
  { value: "11-15", label: "Ages 11-15" },
];

const NavLink: React.FC<NavLinkProps> = ({ href, className, children, onClick }) => (
  <a 
    href={href}
    className={`px-4 py-2 rounded-full font-bold transition-colors flex items-center gap-2 ${className}`}
    onClick={onClick}
  >
    {children}
  </a>
);

const AgeSelector: React.FC<AgeSelectorProps> = ({ className = "" }) => (
  <div className={`bg-white rounded-lg px-2 py-1 ${className}`}>
    <Select defaultValue="">
      <SelectTrigger className="border-none focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Select age" />
      </SelectTrigger>
      <SelectContent>
        {ageOptions.map(({ value, label }) => (
          <SelectItem key={value} value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleMobileNavClick = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-kidblue via-kidpurple to-kidpink p-4 shadow-md">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Kidventures Logo" 
            className="h-14 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <AgeSelector />
          
          <NavLink 
            href="/login" 
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <LogIn size={16} />
            Login
          </NavLink>
          
          <NavLink 
            href="/signup" 
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <UserPlus size={16} />
            Sign Up
          </NavLink>
          
          <NavLink 
            href="/parents-zone" 
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Parents Zone
          </NavLink>
          
          <NavLink 
            href="/leaderboard" 
            className="bg-kidyellow text-white hover:bg-yellow-500"
          >
            Leaderboard
          </NavLink>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
          <div className="flex flex-col gap-4 pt-4">
            <AgeSelector className="w-full" />
            
            <NavLink 
              href="/login" 
              className="bg-white text-purple-600 hover:bg-gray-100 justify-center"
              onClick={handleMobileNavClick}
            >
              <LogIn size={16} />
              Login
            </NavLink>
            
            <NavLink 
              href="/signup" 
              className="bg-white text-purple-600 hover:bg-gray-100 justify-center"
              onClick={handleMobileNavClick}
            >
              <UserPlus size={16} />
              Sign Up
            </NavLink>
            
            <NavLink 
              href="/parents-zone" 
              className="bg-white text-purple-600 hover:bg-gray-100 justify-center"
              onClick={handleMobileNavClick}
            >
              Parents Zone
            </NavLink>
            
            <NavLink 
              href="/leaderboard" 
              className="bg-kidyellow text-white hover:bg-yellow-500 justify-center"
              onClick={handleMobileNavClick}
            >
              Leaderboard
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;