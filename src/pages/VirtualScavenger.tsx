
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Search, CheckCircle, Clock, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ScavengerItem {
  id: number;
  name: string;
  description: string;
  hint: string;
  location: string;
  image: string;
  points: number;
  found: boolean;
}

const VirtualScavenger = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedHunt, setSelectedHunt] = useState<string>("");

  const scavengerHunts = {
    backyard: [
      {
        id: 1,
        name: "Red Flower",
        description: "Find a beautiful red flower",
        hint: "Look for something that smells sweet and attracts bees",
        location: "Garden area",
        image: "🌹",
        points: 10,
        found: false
      },
      {
        id: 2,
        name: "Round Stone",
        description: "Find a smooth, round stone",
        hint: "Check near pathways or under trees",
        location: "Ground level",
        image: "🪨",
        points: 15,
        found: false
      },
      {
        id: 3,
        name: "Green Leaf",
        description: "Find a large green leaf",
        hint: "Look up! Trees have the biggest leaves",
        location: "Tree branches",
        image: "🍃",
        points: 8,
        found: false
      },
      {
        id: 4,
        name: "Bird Feather",
        description: "Find a bird feather",
        hint: "Birds often drop feathers near their favorite spots",
        location: "Under trees or near bird baths",
        image: "🪶",
        points: 20,
        found: false
      }
    ],
    house: [
      {
        id: 1,
        name: "Something Blue",
        description: "Find something that is completely blue",
        hint: "Could be clothing, toys, or household items",
        location: "Any room",
        image: "💙",
        points: 10,
        found: false
      },
      {
        id: 2,
        name: "Kitchen Spoon",
        description: "Find a wooden spoon",
        hint: "Where do we cook and prepare food?",
        location: "Kitchen",
        image: "🥄",
        points: 12,
        found: false
      },
      {
        id: 3,
        name: "Soft Pillow",
        description: "Find the softest pillow",
        hint: "Where do we rest our heads at night?",
        location: "Bedroom",
        image: "🛏️",
        points: 8,
        found: false
      },
      {
        id: 4,
        name: "Family Photo",
        description: "Find a family photograph",
        hint: "Pictures that capture happy memories",
        location: "Living room or hallway",
        image: "📸",
        points: 15,
        found: false
      }
    ],
    park: [
      {
        id: 1,
        name: "Pinecone",
        description: "Find a pinecone from a tree",
        hint: "Look under evergreen trees",
        location: "Near pine trees",
        image: "🌲",
        points: 12,
        found: false
      },
      {
        id: 2,
        name: "Park Bench",
        description: "Find a place to sit and rest",
        hint: "People sit here to watch the world go by",
        location: "Walking paths",
        image: "🪑",
        points: 10,
        found: false
      },
      {
        id: 3,
        name: "Playground Swing",
        description: "Find something that moves back and forth",
        hint: "Children love to play on these",
        location: "Playground area",
        image: "🛝",
        points: 15,
        found: false
      },
      {
        id: 4,
        name: "Duck or Bird",
        description: "Spot a duck or bird",
        hint: "Look near water or in the sky",
        location: "Pond or trees",
        image: "🦆",
        points: 18,
        found: false
      }
    ]
  };

  const [currentItems, setCurrentItems] = useState<ScavengerItem[]>([]);

  const startHunt = (huntType: string) => {
    setSelectedHunt(huntType);
    setCurrentItems(scavengerHunts[huntType as keyof typeof scavengerHunts]);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(300);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's Up! ⏰",
            description: "Great effort! Try again to improve your score!",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "Hunt Started! 🏃‍♂️",
      description: `Find all items in the ${huntType}! You have 5 minutes!`,
    });
  };

  const markItemFound = (itemId: number) => {
    setCurrentItems(prev => prev.map(item => {
      if (item.id === itemId && !item.found) {
        setScore(score + item.points);
        toast({
          title: "Item Found! 🎉",
          description: `Great job! You earned ${item.points} points!`,
        });
        return { ...item, found: true };
      }
      return item;
    }));
  };

  const resetHunt = () => {
    setGameStarted(false);
    setSelectedHunt("");
    setCurrentItems([]);
    setScore(0);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedItems = currentItems.filter(item => item.found).length;
  const totalItems = currentItems.length;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="text-green-500" size={40} />
              <h1 className="text-4xl font-bold text-gray-800">Virtual Scavenger Hunt</h1>
            </div>
            <p className="text-lg text-gray-600">Choose your adventure and find hidden treasures!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startHunt('backyard')}>
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">🏡</div>
                <CardTitle className="text-green-600">Backyard Adventure</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Explore your backyard and find natural treasures!</p>
                <div className="text-sm text-gray-500">4 items to find • 5 minutes</div>
                <Button className="mt-4 bg-green-500 hover:bg-green-600">
                  Start Hunt
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startHunt('house')}>
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">🏠</div>
                <CardTitle className="text-blue-600">House Explorer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Hunt for items around your house!</p>
                <div className="text-sm text-gray-500">4 items to find • 5 minutes</div>
                <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                  Start Hunt
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startHunt('park')}>
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">🌳</div>
                <CardTitle className="text-purple-600">Park Adventure</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Discover treasures in the great outdoors!</p>
                <div className="text-sm text-gray-500">4 items to find • 5 minutes</div>
                <Button className="mt-4 bg-purple-500 hover:bg-purple-600">
                  Start Hunt
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
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
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
              <Trophy size={20} className="text-green-600" />
              <span className="font-bold text-green-600">{score} points</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedHunt.charAt(0).toUpperCase() + selectedHunt.slice(1)} Hunt
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg text-gray-600">Progress: {completedItems}/{totalItems}</span>
            <div className="w-32 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((item) => (
            <Card key={item.id} className={`transition-all ${item.found ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{item.image}</span>
                    <span className={item.found ? 'text-green-600 line-through' : 'text-gray-800'}>
                      {item.name}
                    </span>
                  </CardTitle>
                  {item.found && <CheckCircle className="text-green-500" size={24} />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Search size={16} className="text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Hint:</span>
                  </div>
                  <p className="text-yellow-700 text-sm">{item.hint}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">📍 {item.location}</span>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={16} />
                    <span className="font-semibold text-yellow-600">{item.points} pts</span>
                  </div>
                </div>
                <Button
                  onClick={() => markItemFound(item.id)}
                  disabled={item.found}
                  className={`w-full mt-3 ${
                    item.found 
                      ? 'bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {item.found ? '✓ Found!' : 'Mark as Found'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {completedItems === totalItems && (
          <Card className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300">
            <CardContent className="text-center p-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Hunt Complete!</h2>
              <p className="text-lg text-gray-700 mb-4">
                Amazing work! You found all items and scored {score} points!
              </p>
              <Button onClick={resetHunt} className="bg-green-500 hover:bg-green-600">
                Start New Hunt
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VirtualScavenger;
