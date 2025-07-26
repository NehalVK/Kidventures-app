
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAge } from "../context/AgeContext";
import { Car, Bike, Mountain } from "lucide-react";

const PictureHunt = () => {
  const { ageGroup } = useAge();
  const { toast } = useToast();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const quizData = [
    {
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      question: "What type of car is this?",
      options: ["Sports Car", "SUV", "Sedan", "Truck"],
      correct: 0,
      hint: "It's designed for speed and performance!",
      difficulty: "easy",
      category: "Cars",
      info: "This is a Ferrari sports car! Sports cars are designed for high speed, agility, and dynamic performance. They typically have powerful engines, aerodynamic designs, and are built for racing or recreational driving.",
      icon: <Car className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      question: "What type of vehicle is this?",
      options: ["Motorcycle", "Scooter", "Bicycle", "Tricycle"],
      correct: 0,
      hint: "It has an engine and two wheels for racing!",
      difficulty: "easy",
      category: "Bikes",
      info: "This is a motorcycle! Motorcycles are motorized two-wheeled vehicles used for transportation, sport, and recreation. They come in many styles including sport bikes, cruisers, and touring bikes.",
      icon: <Bike className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      question: "What famous mountain range is this?",
      options: ["Rocky Mountains", "Alps", "Himalayas", "Andes"],
      correct: 1,
      hint: "These snow-capped peaks are in Europe!",
      difficulty: "medium",
      category: "Mountains",
      info: "These are the Alps! The Alps are the highest and most extensive mountain range in Europe, stretching across 8 countries. They're famous for skiing, mountaineering, and stunning scenery.",
      icon: <Mountain className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
      question: "What famous monument is this?",
      options: ["Big Ben", "Eiffel Tower", "Statue of Liberty", "Leaning Tower of Pisa"],
      correct: 1,
      hint: "This iron tower is in Paris, France!",
      difficulty: "easy",
      category: "Monuments",
      info: "This is the Eiffel Tower! Built in 1889 for the World's Fair in Paris, it's 330 meters tall and was the world's tallest structure until 1930. It's made of iron and is one of the most recognizable landmarks in the world.",
      icon: <Mountain className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop",
      question: "What type of car is shown?",
      options: ["Electric Car", "Vintage Car", "Race Car", "Luxury Car"],
      correct: 1,
      hint: "This car is from many decades ago!",
      difficulty: "medium",
      category: "Cars",
      info: "This is a vintage car! Vintage cars are typically from the 1920s-1940s and are prized for their classic design, craftsmanship, and historical significance. They often feature unique styling that's very different from modern cars.",
      icon: <Car className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      question: "What type of bike is this?",
      options: ["Mountain Bike", "Road Bike", "BMX Bike", "Electric Bike"],
      correct: 0,
      hint: "This bike is designed for rough terrain and trails!",
      difficulty: "easy",
      category: "Bikes",
      info: "This is a mountain bike! Mountain bikes are designed for off-road cycling with features like knobby tires, sturdy frames, and suspension systems to handle rough terrain, rocks, and trails.",
      icon: <Bike className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1464822759844-d150dd23bae0?w=400&h=300&fit=crop",
      question: "What type of mountain formation is this?",
      options: ["Volcano", "Mesa", "Canyon", "Plateau"],
      correct: 0,
      hint: "This mountain can erupt and has lava!",
      difficulty: "medium",
      category: "Mountains",
      info: "This is a volcano! Volcanoes are mountains formed by erupted material from the Earth's interior. They can be active, dormant, or extinct, and play important roles in shaping our planet's landscape.",
      icon: <Mountain className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=400&h=300&fit=crop",
      question: "What famous monument is this?",
      options: ["Colosseum", "Parthenon", "Taj Mahal", "Machu Picchu"],
      correct: 2,
      hint: "This white marble mausoleum is in India!",
      difficulty: "medium",
      category: "Monuments",
      info: "This is the Taj Mahal! Built in the 17th century in India, it's a white marble mausoleum built by Emperor Shah Jahan for his wife. It's considered one of the finest examples of Mughal architecture and a UNESCO World Heritage Site.",
      icon: <Mountain className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&h=300&fit=crop",
      question: "What luxury car brand is this?",
      options: ["BMW", "Mercedes", "Audi", "Lexus"],
      correct: 1,
      hint: "This German luxury brand has a three-pointed star logo!",
      difficulty: "hard",
      category: "Cars",
      info: "This is a Mercedes-Benz! Founded in 1926, Mercedes-Benz is a German luxury automotive brand known for innovation, safety, and performance. They invented the first gasoline-powered automobile and continue to be leaders in automotive technology.",
      icon: <Car className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1558897620-4d1a7a54ea1b?w=400&h=300&fit=crop",
      question: "What type of racing bike is this?",
      options: ["Dirt Bike", "Sport Bike", "Cruiser", "Touring Bike"],
      correct: 1,
      hint: "This bike is built for speed and track racing!",
      difficulty: "medium",
      category: "Bikes",
      info: "This is a sport bike! Sport bikes are motorcycles optimized for speed, acceleration, braking, and cornering on paved roads. They feature aggressive riding positions, powerful engines, and aerodynamic fairings.",
      icon: <Bike className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
      question: "What mountain range formation is this?",
      options: ["Glacier", "Ridge", "Peak", "Valley"],
      correct: 0,
      hint: "This is made of ice and moves very slowly!",
      difficulty: "hard",
      category: "Mountains",
      info: "This is a glacier! Glaciers are large masses of ice that form from compressed snow over many years. They move slowly and carve out valleys and other landscape features. They're important indicators of climate change.",
      icon: <Mountain className="w-4 h-4" />
    },
    {
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=400&h=300&fit=crop",
      question: "What ancient monument is this?",
      options: ["Stonehenge", "Pyramids of Giza", "Angkor Wat", "Petra"],
      correct: 1,
      hint: "These ancient structures are in Egypt!",
      difficulty: "easy",
      category: "Monuments",
      info: "These are the Pyramids of Giza! Built over 4,500 years ago in Egypt, they were tombs for pharaohs. The Great Pyramid was the tallest human-made structure for over 3,800 years and is the only surviving Wonder of the Ancient World.",
      icon: <Mountain className="w-4 h-4" />
    }
  ];

  const getPointsForDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return 10;
      case "medium": return 15;
      case "hard": return 20;
      default: return 10;
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === quizData[currentQuiz].correct;
    const points = getPointsForDifficulty(quizData[currentQuiz].difficulty);
    
    if (isCorrect) {
      setScore(score + points);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${points} points! Total: ${score + points}`,
      });
    } else {
      toast({
        title: "Try Again! 💪",
        description: "That's not quite right. Look at the hint!",
        variant: "destructive"
      });
    }
    
    setShowAnswer(true);
    
    setTimeout(() => {
      if (currentQuiz < quizData.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setShowAnswer(false);
      } else {
        toast({
          title: "Game Complete! 🏆",
          description: `Final Score: ${isCorrect ? score + points : score} points`,
        });
      }
    }, 4000);
  };

  const restartGame = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowAnswer(false);
  };

  const currentData = quizData[currentQuiz];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            🔍 Picture Hunt
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Discover cars, bikes, mountains, monuments and more!
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <p className="font-bold text-lg">Score: {score} points</p>
            <p className="text-sm text-gray-600">Question {currentQuiz + 1} of {quizData.length}</p>
          </div>
        </div>

        {currentQuiz < quizData.length ? (
          <div className="max-w-2xl mx-auto">
            <ContentCard
              title={`Picture ${currentQuiz + 1}`}
              type="puzzle"
              content={
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={currentData.image} 
                      alt="Mystery item" 
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${
                      currentData.difficulty === 'easy' ? 'bg-green-500' :
                      currentData.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {currentData.difficulty.toUpperCase()} - {getPointsForDifficulty(currentData.difficulty)} pts
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      {currentData.icon}
                      {currentData.category}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-center">{currentData.question}</h3>
                  
                  {showAnswer && (
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">💡 Hint: {currentData.hint}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    {currentData.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showAnswer}
                        variant={showAnswer && index === currentData.correct ? "default" : "outline"}
                        className={`p-4 text-lg ${
                          showAnswer && index === currentData.correct 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : ""
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showAnswer && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                      <h4 className="font-bold text-green-800 mb-2">📚 Did You Know?</h4>
                      <p className="text-green-700 text-sm leading-relaxed">{currentData.info}</p>
                    </div>
                  )}
                </div>
              }
            />
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <ContentCard
              title="Game Complete!"
              type="puzzle"
              content={
                <div className="space-y-4">
                  <div className="text-6xl">🏆</div>
                  <h3 className="text-2xl font-bold">Well Done!</h3>
                  <p className="text-lg">Final Score: {score} points</p>
                  <div className="text-sm text-gray-600">
                    {score >= 200 ? "🌟 Perfect Score! Amazing!" :
                     score >= 160 ? "🎉 Excellent work!" :
                     score >= 120 ? "👍 Good job!" :
                     "💪 Keep practicing!"}
                  </div>
                  <Button onClick={restartGame} className="w-full">
                    Play Again
                  </Button>
                </div>
              }
            />
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-3">🎯 Categories</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>Cars</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-4 h-4" />
                <span>Bikes</span>
              </div>
              <div className="flex items-center gap-1">
                <Mountain className="w-4 h-4" />
                <span>Mountains</span>
              </div>
              <div className="flex items-center gap-1">
                <Mountain className="w-4 h-4" />
                <span>Monuments</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-600">
              <p>• <span className="text-green-600 font-bold">Easy</span>: 10 points | <span className="text-yellow-600 font-bold">Medium</span>: 15 points | <span className="text-red-600 font-bold">Hard</span>: 20 points</p>
              <p>• Learn something new with each answer!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PictureHunt;
