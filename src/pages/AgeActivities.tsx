import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Palette, Shapes, Volume2, BookOpen, Map, Scissors, Globe, Gamepad2, Code, Microscope } from "lucide-react";
import { useAge } from "../context/AgeContext";
import { useToast } from "@/hooks/use-toast";

const AgeActivities = () => {
  const { ageGroup } = useAge();
  const { toast } = useToast();

  const InteractiveActivity = ({ title, type, ageGroup }: { title: string, type: string, ageGroup: string }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    
    const activitySteps = {
      "coloring": [
        "Choose your favorite template",
        "Pick bright colors from the palette", 
        "Color inside the lines",
        "Add your personal touches",
        "Save and share your artwork!"
      ],
      "karaoke": [
        "Select a fun song",
        "Watch the lyrics appear",
        "Sing along with the music",
        "Record your performance",
        "Share with family!"
      ],
      "shapes": [
        "Look at the shape pattern",
        "Find the missing piece",
        "Drag and drop to complete",
        "Check if it fits perfectly",
        "Move to the next challenge!"
      ],
      "quiz": [
        "Listen to the animal sound",
        "Look at the picture options",
        "Guess which animal it is",
        "Get points for correct answers",
        "Unlock new animals!"
      ],
      "story": [
        "Choose your main character",
        "Pick the setting",
        "Add exciting events",
        "Create the ending",
        "Read your completed story!"
      ]
    };

    const steps = activitySteps[type] || activitySteps.coloring;

    const startDemo = () => {
      setIsActive(true);
      setCurrentStep(1);
      toast({
        title: `Starting ${title} Demo!`,
        description: "Follow the steps to see how it works!"
      });
    };

    const nextStep = () => {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        if (currentStep === steps.length) {
          toast({
            title: "Demo Complete! 🎉",
            description: "Great job! You've seen how this activity works!"
          });
          setTimeout(() => {
            setIsActive(false);
            setCurrentStep(0);
          }, 2000);
        }
      }
    };

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h5 className="font-medium">Interactive Demo</h5>
          {!isActive ? (
            <Button size="sm" onClick={startDemo} className="bg-blue-500 hover:bg-blue-600">
              Try Demo
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Step {currentStep}/{steps.length}</span>
            </div>
          )}
        </div>
        
        {isActive && (
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                {steps[currentStep - 1]}
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={nextStep} 
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={currentStep > steps.length}
            >
              {currentStep === steps.length ? "Finish Demo!" : "Next Step"}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const startFullActivity = (activityTitle: string) => {
    toast({
      title: `Launching ${activityTitle}! 🚀`,
      description: "This would open the full interactive activity experience!",
    });
    
    // In a real app, this would navigate to the specific activity
    console.log(`Starting full activity: ${activityTitle}`);
  };

  const activities = {
    "5-7": [
      {
        title: "Coloring Games",
        description: "Digital coloring books with animations and auto-fill tools",
        icon: <Palette className="w-8 h-8" />,
        color: "bg-gradient-to-br from-purple-400 to-purple-600",
        themes: ["Animals", "Superheroes", "Nature", "Vehicles"],
        type: "coloring"
      },
      {
        title: "Sing-Along Karaoke",
        description: "Interactive songs with lyrics and animations",
        icon: <Volume2 className="w-8 h-8" />,
        color: "bg-gradient-to-br from-pink-400 to-pink-600",
        themes: ["Nursery Rhymes", "Phonics Songs", "ABC Songs", "Animal Songs"],
        type: "karaoke"
      },
      {
        title: "Shape & Pattern Matching",
        description: "Drag-and-drop to complete shapes or patterns",
        icon: <Shapes className="w-8 h-8" />,
        color: "bg-gradient-to-br from-blue-400 to-blue-600",
        themes: ["Basic Shapes", "Color Patterns", "Size Sorting", "Number Patterns"],
        type: "shapes"
      },
      {
        title: "Animal Sound Quiz",
        description: "Match sounds with the correct animals",
        icon: <Volume2 className="w-8 h-8" />,
        color: "bg-gradient-to-br from-green-400 to-green-600",
        themes: ["Farm Animals", "Wild Animals", "Pet Sounds", "Ocean Animals"],
        type: "quiz"
      },
      {
        title: "Story Builder",
        description: "Choose scenes, characters, and endings to create stories",
        icon: <BookOpen className="w-8 h-8" />,
        color: "bg-gradient-to-br from-orange-400 to-orange-600",
        themes: ["Fairy Tales", "Adventure Stories", "Family Stories", "Animal Adventures"],
        type: "story"
      }
    ],
    "8-10": [
      {
        title: "Escape Room Puzzles",
        description: "Solve riddles and clues to escape themed rooms",
        icon: <Map className="w-8 h-8" />,
        color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
        themes: ["Mystery House", "Pi", "Space Station", "Jungle Temple"],
        type: "escape"
      },
      {
        title: "DIY Craft Simulator",
        description: "Follow steps to create digital crafts and art projects",
        icon: <Scissors className="w-8 h-8" />,
        color: "bg-gradient-to-br from-teal-400 to-teal-600",
        themes: ["Origami", "Paper Planes", "Dioramas", "Friendship Bracelets"],
        type: "craft"
      },
      {
        title: "Language Adventure",
        description: "Fun with synonyms, word search, and creative storytelling",
        icon: <Globe className="w-8 h-8" />,
        color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
        themes: ["Word Hunt", "Synonym Game", "Story Creator", "Rhyme Time"],
        type: "language"
      },
      {
        title: "Mini Quests",
        description: "Choose characters and solve missions across interactive maps",
        icon: <Map className="w-8 h-8" />,
        color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
        themes: ["Hero's Journey", "Treasure Hunt", "Save the Kingdom", "Space Explorer"],
        type: "quest"
      },
      {
        title: "Make-a-Comic",
        description: "Create comics with drag-and-drop characters and scenes",
        icon: <BookOpen className="w-8 h-8" />,
        color: "bg-gradient-to-br from-violet-400 to-violet-600",
        themes: ["Superhero Comics", "Funny Stories", "Adventure Tales", "School Life"],
        type: "comic"
      }
    ],
    "11-15": [
      {
        title: "Digital Escape Rooms",
        description: "Complex challenges with math, logic, and advanced riddles",
        icon: <Map className="w-8 h-8" />,
        color: "bg-gradient-to-br from-slate-400 to-slate-600",
        themes: ["Math Mysteries", "Science Labs", "History Puzzles", "Logic Challenges"],
        type: "advanced-escape"
      },
      {
        title: "Intro to Coding",
        description: "Block-based and text-based coding games and challenges",
        icon: <Code className="w-8 h-8" />,
        color: "bg-gradient-to-br from-amber-400 to-amber-600",
        themes: ["Scratch Projects", "Python Basics", "Game Logic", "Algorithm Challenges"],
        type: "coding"
      },
      {
        title: "Create Your Own Game",
        description: "Design characters, levels, and rules for custom games",
        icon: <Gamepad2 className="w-8 h-8" />,
        color: "bg-gradient-to-br from-red-400 to-red-600",
        themes: ["Platform Games", "Puzzle Games", "Adventure Games", "Quiz Games"],
        type: "game-design"
      },
      {
        title: "Virtual Science Experiments",
        description: "Simulate real experiments with adjustable parameters",
        icon: <Microscope className="w-8 h-8" />,
        color: "bg-gradient-to-br from-lime-400 to-lime-600",
        themes: ["Chemistry Lab", "Physics Simulations", "Biology Experiments", "Earth Science"],
        type: "science"
      },
      {
        title: "Interactive STEM/History Quests",
        description: "Choose-your-path adventures based on real-world topics",
        icon: <Globe className="w-8 h-8" />,
        color: "bg-gradient-to-br from-rose-400 to-rose-600",
        themes: ["Time Explorer", "Save the Planet", "Space Mission", "Ancient Civilizations"],
        type: "stem-quest"
      }
    ]
  };

  const currentActivities = activities[ageGroup] || [];

  const getAgeGroupTitle = () => {
    switch (ageGroup) {
      case "5-7": return "Early Learners (Ages 5-7)";
      case "8-10": return "Explorers (Ages 8-10)";
      case "11-15": return "Creators & Thinkers (Ages 11-15)";
      default: return "Activities";
    }
  };

  const getAgeGroupGoal = () => {
    switch (ageGroup) {
      case "5-7": return "Build basic skills with color, sound, shapes, simple logic, and motor skills";
      case "8-10": return "Encourage curiosity, creativity, light problem-solving, and collaboration";
      case "11-15": return "Encourage independence, critical thinking, creativity, and basic coding";
      default: return "Fun learning activities";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {getAgeGroupTitle()} ✨
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {getAgeGroupGoal()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentActivities.map((activity, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className={`${activity.color} text-white rounded-t-lg`}>
                <div className="flex items-center gap-3">
                  {activity.icon}
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{activity.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Themes:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {activity.themes.map((theme, themeIndex) => (
                      <span 
                        key={themeIndex}
                        className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <InteractiveActivity title={activity.title} type={activity.type} ageGroup={ageGroup} />

                <Button 
                  className="w-full flex items-center gap-2 mt-4"
                  onClick={() => startFullActivity(activity.title)}
                >
                  <Play className="w-4 h-4" />
                  Start Full Activity
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AgeActivities;
