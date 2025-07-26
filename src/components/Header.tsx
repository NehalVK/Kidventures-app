
import { Link } from "react-router-dom";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAge } from "../context/AgeContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { ageGroup, setAgeGroup } = useAge();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-kidblue via-kidpurple to-kidpink p-4 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/65dcc61f-5783-43db-bfa9-dd94f5947f8c.png" 
            alt="Kidventures Logo" 
            className="h-12 w-auto"
          />
          <div className="text-2xl md:text-3xl font-bold text-white">
            Kid<span className="text-kidyellow">ventures</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-white rounded-lg px-2 py-1">
            <Select 
              value={ageGroup} 
              onValueChange={(value) => setAgeGroup(value as "2-5" | "5-7" | "8-10" | "11-15")}
            >
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
          
          <Link 
            to="/login" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <LogIn size={16} />
            Login
          </Link>
          
          <Link 
            to="/signup" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <UserPlus size={16} />
            Sign Up
          </Link>
          
          <Link 
            to="/parents-zone" 
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Parents Zone
          </Link>
          
          <Link 
            to="/leaderboard" 
            className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors"
          >
            Leaderboard
          </Link>
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
              <Select 
                value={ageGroup} 
                onValueChange={(value) => setAgeGroup(value as "2-5" | "5-7" | "8-10" | "11-15")}
              >
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
            
            <Link 
              to="/login" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              Login
            </Link>
            
            <Link 
              to="/signup" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={16} />
              Sign Up
            </Link>
            
            <Link 
              to="/parents-zone" 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Parents Zone
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
