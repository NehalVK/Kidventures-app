
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useAge } from "../context/AgeContext";

interface CategoryCardProps {
  title: string;
  color: string;
  path: string;
  icon: ReactNode;
  ageGroups?: string[];
  emoji?: string;
}

const CategoryCard = ({ title, color, path, icon, ageGroups = ["5-7", "8-10", "11-15"], emoji }: CategoryCardProps) => {
  const { ageGroup } = useAge();
  const isForCurrentAge = ageGroups.includes(ageGroup);
  
  return (
    <Link to={path}>
      <div 
        className={`category-card p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center gap-4 h-56 ${color} ${
          isForCurrentAge ? 'animate-bounce-slight hover:scale-105' : 'opacity-75 hover:opacity-90'
        } transition-all duration-300 relative overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          {emoji && (
            <div className="text-6xl mb-2">{emoji}</div>
          )}
          <div className="text-4xl text-white drop-shadow-lg">{icon}</div>
          <h2 className="text-xl font-bold text-white text-center drop-shadow-lg leading-tight">
            {title}
          </h2>
        </div>
        
        {!isForCurrentAge && (
          <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
            Other ages
          </div>
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-full translate-y-8 -translate-x-8"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
