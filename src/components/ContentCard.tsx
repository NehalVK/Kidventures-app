
import { ReactNode } from "react";

interface ContentCardProps {
  title: string;
  content: ReactNode;
  type: string;
  points?: number;
  showPoints?: boolean;
}

const ContentCard = ({ title, content, type, points = 5, showPoints = true }: ContentCardProps) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "puzzle": return "bg-gradient-to-br from-kidblue to-blue-400";
      case "video": return "bg-gradient-to-br from-kidpurple to-purple-400";
      case "picture": return "bg-gradient-to-br from-kidgreen to-green-400";
      case "myth": return "bg-gradient-to-br from-kidpink to-pink-400";
      case "fact": return "bg-gradient-to-br from-kidorange to-orange-400";
      case "story": return "bg-gradient-to-br from-kidpurple to-purple-400";
      default: return "bg-gradient-to-br from-kidblue to-blue-400";
    }
  };

  return (
    <div className="content-card w-full max-w-md mx-auto my-4">
      <div className={`${getBackgroundColor()} p-4`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="bg-white p-6">
        <div className="mb-4">{content}</div>
        {showPoints && points && (
          <div className="text-right">
            <span className="bg-kidyellow text-white px-3 py-1 rounded-full font-bold">
              +{points} points
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
