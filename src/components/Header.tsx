import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// --- THE NEW APPROACH: Import the logo directly ---
// This path is relative to the Header.tsx file.
import newLogo from '../assets/kidventurelogo.jpg'; 

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-kidblue via-kidpurple to-kidpink p-4 shadow-md">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          {/* --- Use the imported logo variable as the source --- */}
          <img 
            src={newLogo} 
            alt="Kidventures Logo" 
            className="h-14 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-white rounded-lg px-2 py-1">
            <Select>
              <SelectTrigger className="w-[120px] border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-5">Ages 2-5</SelectItem>
                <SelectItem value="5-7">Ages 5-7</SelectItem>
                <SelectItem value="8-10">Ages 8-10</SelectItem>
                <SelectItem value="11-15">Ages 11-15</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <a 
            href="/login" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <LogIn size={16} />
            Login
          </a>
          
          <a 
            href="/signup" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <UserPlus size={16} />
            Sign Up
          </a>
          
          <a 
            href="/parents-zone" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Parents Zone
          </a>
          
          <a 
            href="/leaderboard" 
            className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors"
          >
            Leaderboard
          </a>
        </div>

        {/* Mobile Menu Button */}
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
        <div className="md:hidden mt-4 pb-4 border-t border-white/20">
          <div className="flex flex-col gap-4 pt-4">
            <div className="bg-white rounded-lg px-2 py-1 w-full">
              <Select>
                <SelectTrigger className="w-full border-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-5">Ages 2-5</SelectItem>
                  <SelectItem value="5-7">Ages 5-7</SelectItem>
                  <SelectItem value="8-10">Ages 8-10</SelectItem>
                  <SelectItem value="11-15">Ages 11-15</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <a 
              href="/login" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              Login
            </a>
            
            <a 
              href="/signup" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={16} />
              Sign Up
            </a>
            
            <a 
              href="/parents-zone" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Parents Zone
            </a>
            
            <a 
              href="/leaderboard" 
              className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
