
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Search, CheckCircle, Clock, Trophy, Star, Map, Play, Users, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface TreasureItem {
  id: number;
  name: string;
  description: string;
  riddle: string;
  clue: string;
  location: string;
  mapCoords: { x: number; y: number };
  image: string;
  points: number;
  found: boolean;
}

interface Hunt {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  players: string;
  theme: string;
  icon: string;
  items: TreasureItem[];
}

const TreasureHunt = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedHunt, setSelectedHunt] = useState<Hunt | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [currentRiddle, setCurrentRiddle] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  const hunts: Hunt[] = [
    {
      id: "pirate-adventure",
      title: "Pirate's Lost Treasure",
      description: "Ahoy matey! Captain Blackbeard has hidden his greatest treasure. Follow the clues, solve riddles, and claim the gold!",
      difficulty: "Medium",
      duration: "15-20 min",
      players: "1-4 players",
      theme: "Pirates & Adventure",
      icon: "🏴‍☠️",
      items: [
        {
          id: 1,
          name: "Captain's Compass",
          description: "A golden compass that points to treasure",
          riddle: "I spin and point but never walk, helping sailors navigate and talk. What am I?",
          clue: "Look where the captain plots his course on the navigation table",
          location: "Captain's Quarters",
          mapCoords: { x: 25, y: 35 },
          image: "🧭",
          points: 100,
          found: false
        },
        {
          id: 2,
          name: "Ancient Map",
          description: "A weathered treasure map with mysterious markings",
          riddle: "I show you lands both far and wide, with X marks where treasures hide. What am I?",
          clue: "Hidden behind the old sea charts in the ship's library",
          location: "Ship's Library",
          mapCoords: { x: 60, y: 25 },
          image: "🗺️",
          points: 150,
          found: false
        },
        {
          id: 3,
          name: "Silver Doubloon",
          description: "A rare silver coin from the Spanish Main",
          riddle: "Round and silver, worth much gold, in pirates' stories I am told. What am I?",
          clue: "Buried in the food storage barrel in the galley",
          location: "Ship's Galley",
          mapCoords: { x: 40, y: 70 },
          image: "🪙",
          points: 200,
          found: false
        }
      ]
    },
    {
      id: "mystery-mansion",
      title: "Mystery of Blackwood Manor",
      description: "A Victorian mansion holds dark secrets. Uncover the mystery of the missing heirloom before midnight strikes!",
      difficulty: "Hard",
      duration: "20-25 min",
      players: "1-6 players",
      theme: "Mystery & Detective",
      icon: "🏚️",
      items: [
        {
          id: 1,
          name: "Family Portrait",
          description: "An old portrait with a hidden secret",
          riddle: "I hang on walls and watch you pass, showing faces from the past. What am I?",
          clue: "Check behind the large painting in the main hall",
          location: "Grand Hall",
          mapCoords: { x: 50, y: 30 },
          image: "🖼️",
          points: 120,
          found: false
        },
        {
          id: 2,
          name: "Antique Key",
          description: "An ornate key that opens something important",
          riddle: "I open doors but have no hands, unlocking secrets of these lands. What am I?",
          clue: "Hidden in the old grandfather clock",
          location: "Library",
          mapCoords: { x: 75, y: 40 },
          image: "🗝️",
          points: 180,
          found: false
        }
      ]
    },
    {
      id: "space-odyssey",
      title: "Lost in Space Station Alpha",
      description: "The space station's AI has malfunctioned! Find the backup codes and restore power before oxygen runs out!",
      difficulty: "Easy",
      duration: "10-15 min",
      players: "1-3 players",
      theme: "Sci-Fi & Space",
      icon: "🚀",
      items: [
        {
          id: 1,
          name: "Access Card",
          description: "A security card for restricted areas",
          riddle: "I grant access with a swipe, helping astronauts reach their type. What am I?",
          clue: "Located in the security office computer terminal",
          location: "Security Office",
          mapCoords: { x: 30, y: 50 },
          image: "💳",
          points: 80,
          found: false
        },
        {
          id: 2,
          name: "Power Crystal",
          description: "A glowing crystal that powers the station",
          riddle: "I glow bright and give you power, essential in this darkest hour. What am I?",
          clue: "Hidden in the emergency power compartment",
          location: "Engine Room",
          mapCoords: { x: 70, y: 60 },
          image: "💎",
          points: 120,
          found: false
        }
      ]
    }
  ];

  const startHunt = (hunt: Hunt) => {
    if (!playerName.trim()) {
      setShowNamePrompt(true);
      return;
    }
    
    setSelectedHunt(hunt);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(parseInt(hunt.duration.split('-')[1]) * 60); // Convert max duration to seconds
    setShowNamePrompt(false);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's Up! ⏰",
            description: "The treasure hunt has ended! Check your score!",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: `${hunt.title} Started! 🎯`,
      description: `Good luck ${playerName}! Find all treasures!`,
    });
  };

  const showRiddle = (itemId: number) => {
    setCurrentRiddle(itemId);
    toast({
      title: "New Riddle! 🧩",
      description: "Solve this riddle to get your next clue!",
    });
  };

  const solveRiddle = (itemId: number) => {
    if (!selectedHunt) return;
    
    const item = selectedHunt.items.find(i => i.id === itemId);
    if (item) {
      toast({
        title: "Riddle Solved! 🎉",
        description: `Brilliant! Here's your clue: ${item.clue}`,
      });
      setCurrentRiddle(null);
    }
  };

  const markItemFound = (itemId: number) => {
    if (!selectedHunt) return;
    
    setSelectedHunt(prev => {
      if (!prev) return prev;
      
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId && !item.found) {
          setScore(score + item.points);
          toast({
            title: "Treasure Found! 💰",
            description: `Amazing work! You found the ${item.name} and earned ${item.points} points!`,
          });
          return { ...item, found: true };
        }
        return item;
      });
      
      return { ...prev, items: updatedItems };
    });
  };

  const resetHunt = () => {
    setGameStarted(false);
    setSelectedHunt(null);
    setScore(0);
    setTimeLeft(600);
    setShowMap(false);
    setCurrentRiddle(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const InteractiveMap = () => {
    if (!selectedHunt) return null;

    const getMapBackground = () => {
      switch (selectedHunt.id) {
        case 'pirate-adventure':
          return 'bg-gradient-to-br from-blue-300 to-blue-500';
        case 'mystery-mansion':
          return 'bg-gradient-to-br from-gray-300 to-gray-500';
        case 'space-odyssey':
          return 'bg-gradient-to-br from-purple-300 to-purple-500';
        default:
          return 'bg-gradient-to-br from-amber-200 to-amber-400';
      }
    };

    return (
      <div className="bg-amber-100 p-6 rounded-lg border-4 border-amber-600">
        <h3 className="text-xl font-bold text-amber-800 mb-4 text-center flex items-center justify-center gap-2">
          <Map className="w-6 h-6" />
          {selectedHunt.title} Map
        </h3>
        <div className={`relative w-full h-80 ${getMapBackground()} rounded border-2 border-amber-300 overflow-hidden`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20">
            {selectedHunt.icon}
          </div>
          
          {selectedHunt.items.map((item) => (
            <div
              key={item.id}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all transform hover:scale-110 ${
                item.found 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-red-500 text-white animate-pulse shadow-lg hover:shadow-xl'
              }`}
              style={{ 
                left: `${item.mapCoords.x}%`, 
                top: `${item.mapCoords.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => !item.found && showRiddle(item.id)}
              title={item.found ? `Found: ${item.name}` : `Click for riddle: ${item.name}`}
            >
              {item.found ? '✓' : '?'}
            </div>
          ))}
        </div>
        <p className="text-center text-amber-700 mt-3 text-sm">
          🎯 Click on the red markers to get riddles and find treasures!
        </p>
      </div>
    );
  };

  if (showNamePrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-600">Welcome Treasure Hunter!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-gray-600">What should we call you on this adventure?</p>
              <input
                type="text"
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && setShowNamePrompt(false)}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowNamePrompt(false)}
                  disabled={!playerName.trim()}
                  className="flex-1 bg-amber-500 hover:bg-amber-600"
                >
                  Start Adventure!
                </Button>
                <Button
                  onClick={() => setShowNamePrompt(false)}
                  variant="outline"
                >
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <Header />
        
        <div className="max-w-6xl mx-auto p-4">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="text-amber-600" size={48} />
              <h1 className="text-5xl font-bold text-gray-800">Interactive Treasure Hunt</h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              Embark on exciting adventures! Solve riddles, follow clues, and discover hidden treasures!
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>Multiplayer Ready</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Timed Challenges</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy size={16} />
                  <span>Score Points</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hunts.map((hunt) => (
              <Card key={hunt.id} className="hover:shadow-xl transition-all cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                    {hunt.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-800">{hunt.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center leading-relaxed">{hunt.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className={`font-semibold ${
                        hunt.difficulty === 'Easy' ? 'text-green-600' :
                        hunt.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>{hunt.difficulty}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-blue-600">{hunt.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Players:</span>
                      <span className="font-semibold text-purple-600">{hunt.players}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Theme:</span>
                      <span className="font-semibold text-indigo-600">{hunt.theme}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => startHunt(hunt)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Hunt
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  const completedItems = selectedHunt?.items.filter(item => item.found).length || 0;
  const totalItems = selectedHunt?.items.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Header />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={resetHunt} variant="outline">
            <ArrowLeft size={20} className="mr-2" />
            Back to Hunt Selection
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <Clock size={20} className="text-blue-600" />
              <span className="font-bold text-blue-600">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
              <Trophy size={20} className="text-yellow-600" />
              <span className="font-bold text-yellow-600">{score} points</span>
            </div>
            <Button onClick={() => setShowMap(!showMap)} variant="outline">
              <Map size={20} className="mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            {selectedHunt?.icon} {selectedHunt?.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="text-lg text-gray-600">
              Progress: {completedItems}/{totalItems} treasures found
            </span>
            <div className="w-40 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              ></div>
            </div>
          </div>
          {playerName && (
            <p className="text-gray-600 mt-2">Good luck, {playerName}! 🍀</p>
          )}
        </div>

        {showMap && (
          <div className="mb-6">
            <InteractiveMap />
          </div>
        )}

        {currentRiddle && selectedHunt && (
          <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
            <CardHeader>
              <CardTitle className="text-center text-purple-700 flex items-center justify-center gap-2">
                🧩 Riddle Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const riddleItem = selectedHunt.items.find(item => item.id === currentRiddle);
                return riddleItem ? (
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">{riddleItem.image}</div>
                    <p className="text-lg text-purple-800 font-medium bg-white/50 p-4 rounded-lg">
                      "{riddleItem.riddle}"
                    </p>
                    <Button 
                      onClick={() => solveRiddle(currentRiddle)}
                      className="bg-purple-500 hover:bg-purple-600 px-8 py-3"
                    >
                      💡 I Know the Answer!
                    </Button>
                  </div>
                ) : null;
              })()}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {selectedHunt?.items.map((item) => (
            <Card key={item.id} className={`transition-all ${
              item.found 
                ? 'bg-green-50 border-2 border-green-300 shadow-lg' 
                : 'bg-white hover:shadow-lg'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-4xl">{item.image}</span>
                    <div>
                      <span className={`${item.found ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                        {item.name}
                      </span>
                      {item.found && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle size={16} />
                          Found!
                        </div>
                      )}
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <span className="font-bold text-yellow-600">{item.points}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{item.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>
                </div>
                
                {!item.found && (
                  <div className="space-y-2">
                    <Button
                      onClick={() => showRiddle(item.id)}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                      size="sm"
                    >
                      🧩 Get Riddle
                    </Button>
                  </div>
                )}
                
                <Button
                  onClick={() => markItemFound(item.id)}
                  disabled={item.found}
                  className={`w-full ${
                    item.found 
                      ? 'bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {item.found ? '✅ Found!' : '🔍 Mark as Found'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {completedItems === totalItems && selectedHunt && (
          <Card className="bg-gradient-to-r from-yellow-100 to-amber-100 border-4 border-yellow-400 shadow-xl">
            <CardContent className="text-center p-8">
              <div className="text-8xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-amber-600 mb-4">
                Treasure Hunt Complete!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                🎉 Congratulations{playerName ? `, ${playerName}` : ''}! 🎉<br/>
                You found all {totalItems} treasures and scored <span className="font-bold text-amber-600">{score} points</span>!
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetHunt} className="bg-amber-500 hover:bg-amber-600 px-6 py-3">
                  🚀 Start New Hunt
                </Button>
                <Button onClick={() => window.location.reload()} variant="outline" className="px-6 py-3">
                  🔄 Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TreasureHunt;
