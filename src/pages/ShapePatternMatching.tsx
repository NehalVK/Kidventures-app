import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shapes, Star, Trophy, RefreshCw, Target, Volume2, VolumeX } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { audioManager } from "../utils/audioUtils";

const ShapePatternMatching = () => {
  const [currentActivity, setCurrentActivity] = useState("menu");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const shapes = [
    { name: "Circle", emoji: "🔴", color: "bg-red-200", sides: 0 },
    { name: "Square", emoji: "🟦", color: "bg-blue-200", sides: 4 },
    { name: "Triangle", emoji: "🔺", color: "bg-green-200", sides: 3 },
    { name: "Rectangle", emoji: "🟨", color: "bg-yellow-200", sides: 4 },
    { name: "Pentagon", emoji: "⬟", color: "bg-purple-200", sides: 5 },
    { name: "Hexagon", emoji: "⬡", color: "bg-pink-200", sides: 6 },
    { name: "Star", emoji: "⭐", color: "bg-orange-200", sides: 5 },
    { name: "Heart", emoji: "❤️", color: "bg-red-200", sides: 0 }
  ];

  const patterns = [
    { pattern: ["Circle", "Square", "Circle", "Square"], next: "Circle" },
    { pattern: ["Red", "Blue", "Red", "Blue"], next: "Red" },
    { pattern: ["Big", "Small", "Big", "Small"], next: "Big" },
    { pattern: ["Triangle", "Circle", "Square", "Triangle"], next: "Circle" }
  ];

  const activities = [
    {
      id: "shape-match",
      title: "Shape Matching",
      description: "Match shapes by their properties!",
      icon: <Shapes className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
      id: "pattern-complete",
      title: "Complete the Pattern",
      description: "Find the missing shape in the pattern!",
      icon: <Target className="w-8 h-8" />,
      color: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
      id: "shape-builder",
      title: "Shape Builder",
      description: "Build shapes using smaller pieces!",
      icon: <Star className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-400 to-purple-600"
    },
    {
      id: "sorting-game",
      title: "Shape Sorting",
      description: "Sort shapes by color, size, and type!",
      icon: <Trophy className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-400 to-orange-600"
    }
  ];

  const ShapeMatchingGame = () => {
    const [currentShape, setCurrentShape] = useState(shapes[0]);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      setCurrentShape(randomShape);
      
      const similarShapes = shapes.filter(s => s.sides === randomShape.sides || s.color === randomShape.color);
      const wrongOptions = shapes.filter(s => s.name !== randomShape.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      setOptions([randomShape, ...wrongOptions].sort(() => Math.random() - 0.5));
    }, [level]);

    const handleAnswer = (selectedShape) => {
      if (soundEnabled) {
        audioManager.playClickSound();
      }

      if (selectedShape.name === currentShape.name) {
        setScore(score + 10);
        setFeedback("Perfect match! 🎉");
        if (soundEnabled) {
          audioManager.playSuccessSound();
        }
      } else {
        setFeedback(`Not quite! Look for the ${currentShape.name}`);
        if (soundEnabled) {
          audioManager.playErrorSound();
        }
      }
      
      setTimeout(() => {
        setLevel(level + 1);
        setFeedback("");
      }, 2000);
    };

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">
              Find the matching shape!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">{currentShape.emoji}</div>
              <div className="text-2xl font-bold text-gray-700">
                Find another {currentShape.name}
              </div>
            </div>
            
            {feedback && (
              <div className={`text-xl font-bold mb-4 ${feedback.includes('Perfect') ? 'text-green-600' : 'text-orange-600'}`}>
                {feedback}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((shape, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(shape)}
                  className={`${shape.color} text-gray-800 hover:scale-110 transition-all duration-200 p-8 h-auto shadow-lg hover:shadow-xl`}
                  disabled={feedback !== ""}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2">{shape.emoji}</div>
                    <div className="text-lg font-bold">{shape.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const PatternGame = () => {
    const [currentPattern, setCurrentPattern] = useState(patterns[0]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const handlePatternAnswer = (answer) => {
      setSelectedAnswer(answer);
      if (soundEnabled) {
        audioManager.playClickSound();
      }

      if (answer === currentPattern.next) {
        setScore(score + 15);
        setFeedback("Excellent pattern recognition! 🌟");
        if (soundEnabled) {
          audioManager.playSuccessSound();
        }
      } else {
        setFeedback("Look at the pattern more carefully!");
        if (soundEnabled) {
          audioManager.playErrorSound();
        }
      }
      
      setTimeout(() => {
        const nextPattern = patterns[Math.floor(Math.random() * patterns.length)];
        setCurrentPattern(nextPattern);
        setSelectedAnswer("");
        setFeedback("");
      }, 2500);
    };

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">
              Complete the Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-lg mb-4">What comes next in this pattern?</p>
              <div className="flex justify-center gap-4 mb-6">
                {currentPattern.pattern.map((item, index) => (
                  <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold animate-fade-in">
                    {item === "Circle" && "🔴"}
                    {item === "Square" && "🟦"}
                    {item === "Triangle" && "🔺"}
                    {item === "Red" && "🔴"}
                    {item === "Blue" && "🔵"}
                    {item === "Big" && "⬜"}
                    {item === "Small" && "▫️"}
                    {item.length > 5 && item}
                  </div>
                ))}
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-3xl animate-pulse">
                  ?
                </div>
              </div>
            </div>
            
            {feedback && (
              <div className={`text-xl font-bold mb-4 ${feedback.includes('Excellent') ? 'text-green-600' : 'text-orange-600'}`}>
                {feedback}
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shapes.slice(0, 4).map((shape, index) => (
                <Button
                  key={index}
                  onClick={() => handlePatternAnswer(shape.name)}
                  className={`${shape.color} text-gray-800 hover:scale-105 transition-transform p-6 h-auto`}
                  disabled={feedback !== ""}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{shape.emoji}</div>
                    <div className="text-sm font-bold">{shape.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ShapeBuilderGame = () => {
    const [targetShape, setTargetShape] = useState("Square");
    const [builderPieces, setBuilderPieces] = useState([]);
    const [availablePieces] = useState([
      { name: "Small Triangle", emoji: "🔺", size: "small" },
      { name: "Small Square", emoji: "🟦", size: "small" },
      { name: "Small Circle", emoji: "🔴", size: "small" },
      { name: "Line", emoji: "➖", size: "small" }
    ]);

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-600">
              Shape Builder Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-lg mb-4">Build a {targetShape} using the pieces below!</p>
              <div className="bg-gray-100 rounded-lg p-8 mb-6 min-h-32">
                <p className="text-gray-500">Drag pieces here to build your shape</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {builderPieces.map((piece, index) => (
                    <span key={index} className="text-2xl">{piece.emoji}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availablePieces.map((piece, index) => (
                <Button
                  key={index}
                  onClick={() => setBuilderPieces([...builderPieces, piece])}
                  className="bg-purple-200 text-gray-800 hover:scale-105 transition-transform p-4 h-auto"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{piece.emoji}</div>
                    <div className="text-xs font-bold">{piece.name}</div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={() => setBuilderPieces([])}
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button className="bg-purple-500 hover:bg-purple-600">
                Check My Shape
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderActivity = () => {
    switch (currentActivity) {
      case "shape-match":
        return <ShapeMatchingGame />;
      case "pattern-complete":
        return <PatternGame />;
      case "shape-builder":
        return <ShapeBuilderGame />;
      case "sorting-game":
        return <ShapeMatchingGame />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className={`${activity.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3">
                    {activity.icon}
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <Button 
                    onClick={() => {
                      setCurrentActivity(activity.id);
                      if (soundEnabled) audioManager.playClickSound();
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    Start Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔷 Shape & Pattern Matching 🔷
          </h1>
          <p className="text-xl text-gray-700">
            Explore shapes, patterns, and spatial relationships!
          </p>
          
          {currentActivity !== "menu" && (
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white rounded-full px-4 py-2 shadow-md">
                <span className="text-blue-600 font-bold">Score: {score}</span>
              </div>
              <div className="bg-white rounded-full px-4 py-2 shadow-md">
                <span className="text-purple-600 font-bold">Level: {level}</span>
              </div>
              <Button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                className="rounded-full"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {soundEnabled ? "Sound On" : "Sound Off"}
              </Button>
              <Button 
                onClick={() => {
                  setCurrentActivity("menu");
                  if (soundEnabled) audioManager.playClickSound();
                }}
                variant="outline"
                className="rounded-full"
              >
                Back to Menu
              </Button>
            </div>
          )}
        </div>

        {renderActivity()}
      </main>
      
      <Footer />
    </div>
  );
};

export default ShapePatternMatching;
