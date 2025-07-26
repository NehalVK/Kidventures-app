
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette, Star, RefreshCw, CheckCircle } from "lucide-react";

const ColorShapeSorting = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const colorGames = [
    {
      id: 1,
      title: "Sort by Colors",
      description: "Click all the RED items!",
      targetColor: "red",
      items: [
        { id: 1, name: "Apple", color: "red", emoji: "🍎", isTarget: true },
        { id: 2, name: "Banana", color: "yellow", emoji: "🍌", isTarget: false },
        { id: 3, name: "Fire Truck", color: "red", emoji: "🚒", isTarget: true },
        { id: 4, name: "Grass", color: "green", emoji: "🌱", isTarget: false },
        { id: 5, name: "Heart", color: "red", emoji: "❤️", isTarget: true },
        { id: 6, name: "Ocean", color: "blue", emoji: "🌊", isTarget: false }
      ]
    },
    {
      id: 2,
      title: "Sort by Shapes",
      description: "Click all the CIRCLES!",
      targetShape: "circle",
      items: [
        { id: 1, name: "Ball", shape: "circle", emoji: "⚽", isTarget: true },
        { id: 2, name: "Box", shape: "square", emoji: "📦", isTarget: false },
        { id: 3, name: "Sun", shape: "circle", emoji: "☀️", isTarget: true },
        { id: 4, name: "Book", shape: "rectangle", emoji: "📚", isTarget: false },
        { id: 5, name: "Pizza", shape: "circle", emoji: "🍕", isTarget: true },
        { id: 6, name: "Star", shape: "star", emoji: "⭐", isTarget: false }
      ]
    }
  ];

  const handleItemClick = (itemId: number, isTarget: boolean) => {
    if (selectedItems.includes(itemId)) return;
    
    setSelectedItems(prev => [...prev, itemId]);
    
    if (isTarget) {
      setScore(prev => prev + 10);
    }
  };

  const resetGame = () => {
    setSelectedItems([]);
    setScore(0);
  };

  const getCurrentGameData = () => {
    return colorGames.find(game => game.id.toString() === currentGame);
  };

  const isGameComplete = () => {
    const gameData = getCurrentGameData();
    if (!gameData) return false;
    
    const targetItems = gameData.items.filter(item => item.isTarget);
    return targetItems.every(item => selectedItems.includes(item.id));
  };

  if (currentGame) {
    const gameData = getCurrentGameData();
    if (!gameData) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-rainbow-50 via-yellow-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{gameData.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{gameData.description}</p>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-purple-600">Score: {score} points 🌟</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {gameData.items.map((item) => (
              <Card 
                key={item.id}
                className={`cursor-pointer transition-all hover:scale-105 border-4 ${
                  selectedItems.includes(item.id) 
                    ? item.isTarget 
                      ? 'border-green-400 bg-green-100' 
                      : 'border-red-400 bg-red-100'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleItemClick(item.id, item.isTarget)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  {selectedItems.includes(item.id) && (
                    <div className="mt-2">
                      {item.isTarget ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-red-500 font-bold">Try Again!</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {isGameComplete() && (
            <div className="bg-gradient-to-r from-green-200 to-blue-200 p-6 rounded-2xl text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Great Job! 🎉</h2>
              <p className="text-xl text-gray-700">You found all the correct items!</p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={() => setCurrentGame(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rainbow-50 via-yellow-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
            Color & Shape Sorting 🌈
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Let's learn colors and shapes by sorting fun items!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {colorGames.map((game) => (
            <Card key={game.id} className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 hover:shadow-xl transition-all cursor-pointer">
              <CardHeader className="text-center">
                <Palette className="w-16 h-16 mx-auto text-purple-600 mb-4" />
                <CardTitle className="text-2xl text-gray-800">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">{game.description}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentGame(game.id.toString())}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Start Game!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎨 Learning About Colors & Shapes! 🔶
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🔴 Primary Colors</h4>
              <p>Red, Blue, and Yellow are the main colors!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">⭕ Basic Shapes</h4>
              <p>Circles are round, squares have 4 equal sides!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👀 Look Around</h4>
              <p>Can you find these colors and shapes at home?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎯 Practice</h4>
              <p>The more you practice, the better you get!</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto text-lg px-6 py-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ColorShapeSorting;
