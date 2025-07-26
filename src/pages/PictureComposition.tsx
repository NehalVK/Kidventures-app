import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { ImageIcon, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PictureComposition = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [userStory, setUserStory] = useState("");
  const [submittedComposition, setSubmittedComposition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const { toast } = useToast();

  const themes = [
    {
      id: 1,
      title: "Magical Rainbow Forest",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      description: "A mystical forest filled with colorful trees and rainbow lights!",
      prompt: "Write a story about this magical rainbow forest. What creatures live here? What adventures happen under these colorful trees?",
      points: 15
    },
    {
      id: 2,
      title: "Underwater Palace",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      description: "Dive into an amazing underwater world with coral castles!",
      prompt: "Create a story about this underwater palace. Who are the mer-people living here? What treasures are hidden in the depths?",
      points: 15
    },
    {
      id: 3,
      title: "Flying Hot Air Balloons",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Colorful hot air balloons floating through a dreamy sky!",
      prompt: "Tell a story about a journey in these hot air balloons. Where are they going? What do they see from up high?",
      points: 15
    },
    {
      id: 4,
      title: "Enchanted Garden",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
      description: "A beautiful garden bursting with vibrant flowers and butterflies!",
      prompt: "Write about the magical creatures in this enchanted garden. What happens when the flowers start to glow at night?",
      points: 15
    },
    {
      id: 5,
      title: "Arctic Aurora Adventure",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
      description: "The magical northern lights dancing across the snowy landscape!",
      prompt: "Create a story about an adventure in the Arctic. What causes these beautiful lights? Who might you meet in this icy wonderland?",
      points: 15
    },
    {
      id: 6,
      title: "Sunset Beach Paradise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A tropical beach with the most beautiful sunset colors!",
      prompt: "Tell a story about a magical day at this beach. What treasures wash up on shore? What adventures await in the crystal blue water?",
      points: 15
    },
    {
      id: 7,
      title: "Fairy Tale Castle",
      image: "https://images.unsplash.com/photo-1535139061908-1f4b25db1926?w=400&h=300&fit=crop",
      description: "A magnificent castle straight out of a fairy tale!",
      prompt: "Write about the royal family living in this castle. What magical events happen in the grand ballroom? What secrets are hidden in the towers?",
      points: 15
    },
    {
      id: 8,
      title: "Colorful Market Festival",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=300&fit=crop",
      description: "A vibrant market filled with colorful balloons and celebrations!",
      prompt: "Create a story about this festive market. What special foods and treats are being sold? What celebration is taking place?",
      points: 15
    }
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setUserStory("");
    setSubmittedComposition(null);
  };

  const handleSubmit = () => {
    if (userStory.trim().length < 50) {
      toast({
        title: "Story too short!",
        description: "Please write at least 50 characters to earn points.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const basePoints = selectedTheme.points;
      const lengthBonus = Math.floor(userStory.length / 50) * 5;
      const totalPoints = basePoints + lengthBonus;
      
      setSubmittedComposition({
        theme: selectedTheme,
        story: userStory,
        points: totalPoints,
        timestamp: new Date().toISOString()
      });
      
      setTotalScore(totalScore + totalPoints);
      
      toast({
        title: "Composition Submitted! 🎉",
        description: `Great creative writing! You earned ${totalPoints} points!`,
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const resetComposition = () => {
    setSelectedTheme(null);
    setUserStory("");
    setSubmittedComposition(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ImageIcon className="text-cyan-500 text-3xl" />
          <h1 className="text-4xl font-bold text-cyan-600">Picture Composition</h1>
        </div>

        <div className="text-center mb-6">
          <div className="bg-cyan-100 px-6 py-3 rounded-full inline-block shadow-md">
            <span className="font-bold text-cyan-800 text-lg">🏆 Total Score: {totalScore} points</span>
          </div>
        </div>

        <p className="text-center text-lg mb-8 text-gray-600">
          Look at these beautiful pictures and write creative stories! Earn points for your imagination! ✨
        </p>

        {!selectedTheme ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <ContentCard
                  title={theme.title}
                  type="picture-theme"
                  points={theme.points}
                  showPoints={true}
                  content={
                    <div className="text-center">
                      <img 
                        src={theme.image} 
                        alt={theme.title}
                        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                      />
                      <p className="text-gray-600 mb-4">{theme.description}</p>
                      <Button className="bg-cyan-500 hover:bg-cyan-600">
                        Choose This Theme
                      </Button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        ) : !submittedComposition ? (
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setSelectedTheme(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Themes
            </Button>

            <ContentCard
              title={selectedTheme.title}
              type="composition"
              points={selectedTheme.points}
              showPoints={true}
              content={
                <div>
                  <div className="text-center mb-6">
                    <img 
                      src={selectedTheme.image} 
                      alt={selectedTheme.title}
                      className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
                    />
                    <p className="text-lg text-gray-700 mb-4">{selectedTheme.prompt}</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Write your story here:
                    </label>
                    <textarea
                      value={userStory}
                      onChange={(e) => setUserStory(e.target.value)}
                      placeholder="Once upon a time..."
                      className="w-full h-40 p-4 border rounded-lg resize-none"
                      maxLength={1000}
                    />
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{userStory.length}/1000 characters</span>
                      <span>{userStory.length >= 50 ? "✅" : "❌"} Minimum 50 characters</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                      <strong>Points:</strong> {selectedTheme.points} base points + {Math.floor(userStory.length / 50) * 5} bonus points = {selectedTheme.points + Math.floor(userStory.length / 50) * 5} total points
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={handleSubmit}
                        disabled={userStory.trim().length < 50 || isSubmitting}
                        className="bg-cyan-500 hover:bg-cyan-600"
                      >
                        {isSubmitting ? "Submitting..." : "Submit My Story"}
                      </Button>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ContentCard
              title="🎉 Composition Complete!"
              type="completed"
              showPoints={false}
              content={
                <div className="text-center space-y-6">
                  <img 
                    src={submittedComposition.theme.image} 
                    alt={submittedComposition.theme.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md mx-auto"
                  />
                  
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="text-yellow-500" />
                      <span className="text-xl font-bold text-yellow-700">
                        You earned {submittedComposition.points} points!
                      </span>
                      <Star className="text-yellow-500" />
                    </div>
                  </div>

                  <div className="text-left bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Your Story:</h3>
                    <p className="text-gray-700 italic">"{submittedComposition.story}"</p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={resetComposition}
                      variant="outline"
                    >
                      Write Another Story
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PictureComposition;
