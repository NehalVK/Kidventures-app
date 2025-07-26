
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Grid3X3, Calculator, BookOpen, Shapes, Microscope, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GridChallenge {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

const LearningGrid = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const categories = [
    {
      id: "math",
      name: "Math Match",
      description: "Solve math puzzles and number challenges",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      emoji: "🔢"
    },
    {
      id: "word",
      name: "Word Whiz",
      description: "Word-based puzzles and language fun",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      emoji: "📝"
    },
    {
      id: "shape",
      name: "Shape Sleuth",
      description: "Geometry puzzles and shape challenges",
      icon: <Shapes className="w-8 h-8" />,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      emoji: "🔺"
    },
    {
      id: "science",
      name: "Science Solve",
      description: "Science-based puzzles and experiments",
      icon: <Microscope className="w-8 h-8" />,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      emoji: "🔬"
    },
    {
      id: "history",
      name: "History Hunt",
      description: "Historical clues and timeline challenges",
      icon: <Clock className="w-8 h-8" />,
      color: "bg-gradient-to-br from-red-400 to-red-600",
      emoji: "🏛️"
    }
  ];

  const challenges: {[key: string]: GridChallenge[]} = {
    math: [
      {
        id: 1,
        question: "What is 5 + 3?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
        explanation: "5 + 3 = 8. You can count: 5, 6, 7, 8!",
        points: 10
      },
      {
        id: 2,
        question: "Which number comes next? 2, 4, 6, __",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
        explanation: "This is counting by 2s: 2, 4, 6, 8!",
        points: 15
      },
      {
        id: 3,
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "A triangle has 3 sides. Tri means three!",
        points: 10
      }
    ],
    word: [
      {
        id: 1,
        question: "Which word rhymes with 'cat'?",
        options: ["dog", "hat", "bird", "fish"],
        correctAnswer: 1,
        explanation: "Hat rhymes with cat - they both end in 'at'!",
        points: 10
      },
      {
        id: 2,
        question: "What is the opposite of 'hot'?",
        options: ["warm", "cool", "cold", "big"],
        correctAnswer: 2,
        explanation: "Cold is the opposite of hot!",
        points: 10
      },
      {
        id: 3,
        question: "How many letters are in the word 'HELLO'?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "H-E-L-L-O has 5 letters!",
        points: 15
      }
    ],
    shape: [
      {
        id: 1,
        question: "What shape has 4 equal sides?",
        options: ["Triangle", "Circle", "Square", "Rectangle"],
        correctAnswer: 2,
        explanation: "A square has 4 equal sides!",
        points: 10
      },
      {
        id: 2,
        question: "Which shape has no corners?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: 2,
        explanation: "A circle is round and has no corners!",
        points: 10
      },
      {
        id: 3,
        question: "How many corners does a rectangle have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "A rectangle has 4 corners!",
        points: 15
      }
    ],
    science: [
      {
        id: 1,
        question: "What do plants need to grow?",
        options: ["Only water", "Only sunlight", "Water and sunlight", "Nothing"],
        correctAnswer: 2,
        explanation: "Plants need both water and sunlight to grow healthy and strong!",
        points: 15
      },
      {
        id: 2,
        question: "Which animal can fly?",
        options: ["Dog", "Cat", "Bird", "Fish"],
        correctAnswer: 2,
        explanation: "Birds have wings and can fly in the sky!",
        points: 10
      },
      {
        id: 3,
        question: "What color do you get when you mix red and yellow?",
        options: ["Purple", "Green", "Orange", "Blue"],
        correctAnswer: 2,
        explanation: "Red + Yellow = Orange! Like a beautiful sunset!",
        points: 15
      }
    ],
    history: [
      {
        id: 1,
        question: "What did people use before cars to travel?",
        options: ["Airplanes", "Horses", "Trains", "Bicycles"],
        correctAnswer: 1,
        explanation: "Before cars, people rode horses to travel from place to place!",
        points: 15
      },
      {
        id: 2,
        question: "What did ancient people use to make fire?",
        options: ["Matches", "Lighters", "Stones", "Wood only"],
        correctAnswer: 2,
        explanation: "Ancient people rubbed stones together to create sparks and make fire!",
        points: 20
      },
      {
        id: 3,
        question: "Where did people live long ago before houses?",
        options: ["Hotels", "Caves", "Schools", "Stores"],
        correctAnswer: 1,
        explanation: "Long ago, people lived in caves for shelter and protection!",
        points: 15
      }
    ]
  };

  const currentChallenges = selectedCategory ? challenges[selectedCategory] : [];
  const current = currentChallenges[currentChallenge];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === current.correctAnswer) {
      setScore(score + current.points);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${current.points} points!`,
      });
    } else {
      toast({
        title: "Not quite right 🤔",
        description: "Try to learn from the explanation!",
        variant: "destructive"
      });
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < currentChallenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      toast({
        title: "Category Complete! 🏆",
        description: `You finished all ${selectedCategory} challenges!`,
      });
    }
  };

  const resetToCategories = () => {
    setSelectedCategory("");
    setCurrentChallenge(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Grid3X3 className="text-purple-500" size={40} />
              <h1 className="text-4xl font-bold text-gray-800">Learning Grid</h1>
            </div>
            <p className="text-lg text-gray-600">Choose your learning adventure!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Card 
                key={category.id}
                className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white`}>
                    {category.icon}
                  </div>
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    {challenges[category.id].length} challenges available
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const categoryData = categories.find(cat => cat.id === selectedCategory);

  if (currentChallenge >= currentChallenges.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4 text-purple-600">
              {categoryData?.name} Complete!
            </h2>
            <p className="text-xl mb-6">You finished all challenges in this category!</p>
            <div className="text-2xl font-bold text-blue-600 mb-6">
              Final Score: {score} points
            </div>
            <Button onClick={resetToCategories} className="bg-purple-500 hover:bg-purple-600">
              Choose Another Category
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={resetToCategories} variant="outline">
            <ArrowLeft size={20} className="mr-2" />
            Back to Categories
          </Button>
          <div className="text-right">
            <div className="text-lg font-semibold text-purple-600">Score: {score}</div>
            <div className="text-sm text-gray-600">
              Challenge {currentChallenge + 1} of {currentChallenges.length}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-12 h-12 ${categoryData?.color} rounded-full flex items-center justify-center text-white`}>
              {categoryData?.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{categoryData?.name}</h1>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Challenge {currentChallenge + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{categoryData?.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {current.question}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    showResult
                      ? index === current.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : index === selectedAnswer && index !== current.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300'
                      : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{current.explanation}</p>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button
                  onClick={nextChallenge}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  {currentChallenge < currentChallenges.length - 1 ? 'Next Challenge' : 'Complete Category'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningGrid;
