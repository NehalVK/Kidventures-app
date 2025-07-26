import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import EscapeRoomGame from "../components/EscapeRoomGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, Trophy, Star, Lock, Unlock, Map } from "lucide-react";
import { useAge } from "../context/AgeContext";

const EscapeRooms = () => {
  const { ageGroup } = useAge();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [gameOpen, setGameOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const difficulties = [
    { id: "all", title: "All Levels", emoji: "🎯" },
    { id: "easy", title: "Easy", emoji: "🟢" },
    { id: "medium", title: "Medium", emoji: "🟡" },
    { id: "hard", title: "Hard", emoji: "🔴" }
  ];

  const escapeRooms = [
    {
      id: 1,
      title: "Pirate Treasure Island",
      description: "Help Captain Kiddo find the lost treasure by solving maritime puzzles and decoding ancient maps!",
      difficulty: "easy",
      timeLimit: "30 minutes",
      maxPlayers: 4,
      ageRange: ["5-7", "8-10"],
      theme: "Adventure",
      rating: 4.8,
      completedBy: 1250,
      image: "🏴‍☠️",
      clues: 8,
      story: "The infamous pirate captain has left clues across the seven seas. Can you follow the treasure map?",
      skills: ["Problem Solving", "Map Reading", "Teamwork"]
    },
    {
      id: 2,
      title: "Space Station Mystery",
      description: "The space station has lost communication with Earth. Solve technical puzzles to restore the connection!",
      difficulty: "medium",
      timeLimit: "45 minutes", 
      maxPlayers: 6,
      ageRange: ["8-10", "11-15"],
      theme: "Science Fiction",
      rating: 4.9,
      completedBy: 890,
      image: "🚀",
      clues: 12,
      story: "Astronauts need your help to fix the communication system and return safely to Earth.",
      skills: ["Logic", "Science Knowledge", "Critical Thinking"]
    },
    {
      id: 3,
      title: "Enchanted Forest Quest",
      description: "Navigate through a magical forest filled with talking animals and mystical creatures to break an ancient curse!",
      difficulty: "easy",
      timeLimit: "25 minutes",
      maxPlayers: 4,
      ageRange: ["5-7", "8-10"],
      theme: "Fantasy",
      rating: 4.7,
      completedBy: 1560,
      image: "🧚‍♀️",
      clues: 6,
      story: "A wicked witch has cursed the forest. Only brave hearts can restore peace and harmony.",
      skills: ["Creativity", "Pattern Recognition", "Storytelling"]
    },
    {
      id: 4,
      title: "Detective Academy Case",
      description: "A mysterious theft at the school! Use your detective skills to find clues and catch the culprit.",
      difficulty: "medium",
      timeLimit: "40 minutes",
      maxPlayers: 5,
      ageRange: ["8-10", "11-15"],
      theme: "Mystery",
      rating: 4.6,
      completedBy: 720,
      image: "🕵️",
      clues: 10,
      story: "Someone stole the principal's special award. Follow the evidence and solve the mystery!",
      skills: ["Deduction", "Observation", "Analysis"]
    },
    {
      id: 5,
      title: "Time Machine Malfunction",
      description: "The time machine is broken and you're stuck in different eras! Fix it before you're trapped forever.",
      difficulty: "hard",
      timeLimit: "60 minutes",
      maxPlayers: 6,
      ageRange: ["11-15"],
      theme: "Time Travel",
      rating: 4.9,
      completedBy: 450,
      image: "⏰",
      clues: 15,
      story: "Travel through ancient Egypt, medieval times, and the future to collect parts for the time machine.",
      skills: ["History Knowledge", "Complex Problem Solving", "Time Management"]
    },
    {
      id: 6,
      title: "Robot Factory Crisis",
      description: "The robot factory has gone haywire! Reprogram the robots and restore order to the facility.",
      difficulty: "medium",
      timeLimit: "35 minutes",
      maxPlayers: 4,
      ageRange: ["8-10", "11-15"],
      theme: "Technology",
      rating: 4.8,
      completedBy: 680,
      image: "🤖",
      clues: 9,
      story: "Malfunctioning robots are creating chaos. Use coding logic to fix their programming.",
      skills: ["Basic Coding", "Logic Sequences", "Technology Understanding"]
    }
  ];

  const getFilteredRooms = () => {
    let filtered = escapeRooms;
    
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(room => room.difficulty === selectedDifficulty);
    }
    
    // Filter by age group
    filtered = filtered.filter(room => room.ageRange.includes(ageGroup));
    
    return filtered.sort((a, b) => b.rating - a.rating);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "easy": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";  
      case "hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleStartGame = (room: any) => {
    setSelectedRoom(room);
    setGameOpen(true);
  };

  const handleCloseGame = () => {
    setGameOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Digital Escape Rooms 🏴‍☠️
          </h1>
          <p className="text-xl text-gray-700">
            Challenge your mind with exciting digital escape room adventures!
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty.id}
              variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setSelectedDifficulty(difficulty.id)}
            >
              <span className="text-lg">{difficulty.emoji}</span>
              {difficulty.title}
            </Button>
          ))}
        </div>

        {/* Escape Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRooms().map((room) => (
            <Card key={room.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-6xl mb-2">{room.image}</div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      {room.rating}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(room.difficulty)}`}>
                      {room.difficulty.toUpperCase()}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{room.title}</CardTitle>
                <p className="text-sm text-gray-600">{room.theme}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{room.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{room.timeLimit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Up to {room.maxPlayers} players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-purple-500" />
                    <span>{room.clues} clues to solve</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>{room.completedBy.toLocaleString()} completed</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{room.story}"</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {room.skills.map((skill, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => handleStartGame(room)}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Start Escape Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredRooms().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏴‍☠️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No escape rooms found</h3>
            <p className="text-gray-500">Try selecting a different difficulty level!</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Escape Room Game Modal */}
      <EscapeRoomGame
        isOpen={gameOpen}
        onClose={handleCloseGame}
        roomData={selectedRoom}
      />
    </div>
  );
};

export default EscapeRooms;
