
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAge } from "../context/AgeContext";

interface Challenge {
  id: number;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  explanation: string;
  ageGroups: string[];
  emoji: string;
}

const VisualIQ = () => {
  const { ageGroup } = useAge();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Shape Pattern",
      question: "Look at this pattern: 🔴 🔵 🔴 🔵 🔴 __ What comes next?",
      options: ["🔴 Red Circle", "🔵 Blue Circle", "🟢 Green Circle", "🟡 Yellow Circle"],
      correctAnswer: 1,
      difficulty: "Easy",
      points: 10,
      explanation: "The pattern alternates between red and blue circles. After red comes blue!",
      ageGroups: ["5-7", "8-10", "11-15"],
      emoji: "🔴"
    },
    {
      id: 2,
      title: "Count the Shapes",
      question: "How many triangles can you see? 🔺🔺🔺🔸🔺🔸🔺",
      options: ["3 triangles", "4 triangles", "5 triangles", "6 triangles"],
      correctAnswer: 2,
      difficulty: "Easy",
      points: 10,
      explanation: "There are 5 triangles (🔺) in the row. The diamonds (🔸) are different shapes!",
      ageGroups: ["5-7", "8-10", "11-15"],
      emoji: "🔺"
    },
    {
      id: 3,
      title: "Missing Piece",
      question: "Which piece completes this puzzle? 🧩➡️🧩 Missing: __ ⬅️🧩",
      options: ["🧩 Puzzle piece", "🔲 Square", "🔵 Circle", "❌ X mark"],
      correctAnswer: 0,
      difficulty: "Medium",
      points: 15,
      explanation: "The middle piece should be a puzzle piece to complete the sequence!",
      ageGroups: ["8-10", "11-15"],
      emoji: "🧩"
    },
    {
      id: 4,
      title: "Color Logic",
      question: "If 🍎 = Red, 🍌 = Yellow, what color is 🍇?",
      options: ["Red", "Yellow", "Purple", "Green"],
      correctAnswer: 2,
      difficulty: "Easy",
      points: 10,
      explanation: "Grapes are typically purple in color, just like real grapes!",
      ageGroups: ["5-7", "8-10", "11-15"],
      emoji: "🍇"
    },
    {
      id: 5,
      title: "Size Sequence",
      question: "Put these in order from smallest to largest: 🐘 🐭 🐕",
      options: ["🐘🐕🐭", "🐭🐕🐘", "🐕🐭🐘", "🐭🐘🐕"],
      correctAnswer: 1,
      difficulty: "Medium",
      points: 15,
      explanation: "From smallest to largest: Mouse (🐭), Dog (🐕), Elephant (🐘)",
      ageGroups: ["5-7", "8-10", "11-15"],
      emoji: "🐭"
    },
    {
      id: 6,
      title: "Odd One Out",
      question: "Which one is different? 🚗 🚕 🚙 🏠",
      options: ["🚗 Car", "🚕 Taxi", "🚙 SUV", "🏠 House"],
      correctAnswer: 3,
      difficulty: "Medium",
      points: 15,
      explanation: "The house is different because it's a building, while the others are all vehicles!",
      ageGroups: ["5-7", "8-10", "11-15"],
      emoji: "🏠"
    },
    {
      id: 7,
      title: "Mirror Image",
      question: "Which is the mirror image of this arrow? ➡️",
      options: ["⬅️", "⬆️", "⬇️", "↗️"],
      correctAnswer: 0,
      difficulty: "Hard",
      points: 20,
      explanation: "The mirror image of a right arrow (➡️) is a left arrow (⬅️)!",
      ageGroups: ["8-10", "11-15"],
      emoji: "➡️"
    },
    {
      id: 8,
      title: "Number Pattern",
      question: "What comes next? 2️⃣ 4️⃣ 6️⃣ 8️⃣ __",
      options: ["9️⃣", "🔟", "1️⃣1️⃣", "1️⃣2️⃣"],
      correctAnswer: 1,
      difficulty: "Hard",
      points: 20,
      explanation: "This is counting by 2s: 2, 4, 6, 8, 10. The pattern adds 2 each time!",
      ageGroups: ["8-10", "11-15"],
      emoji: "2️⃣"
    }
  ];

  const filteredChallenges = challenges.filter(challenge => 
    challenge.ageGroups.includes(ageGroup)
  );

  const current = filteredChallenges[currentChallenge];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === current.correctAnswer) {
      setScore(score + current.points);
    }
    
    setCompletedChallenges([...completedChallenges, current.id]);
  };

  const nextChallenge = () => {
    if (currentChallenge < filteredChallenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedChallenges([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (currentChallenge >= filteredChallenges.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <Card className="text-center p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Congratulations!</h2>
            <p className="text-xl mb-6">You completed all Visual IQ challenges!</p>
            <div className="text-2xl font-bold text-blue-600 mb-6">
              Final Score: {score} points
            </div>
            <button
              onClick={resetGame}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Try Again
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={20} />
          Back to Categories
        </Link>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Visual IQ Challenges</h1>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-purple-600">Score: {score}</div>
            <div className="text-sm text-gray-600">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{current.title}</CardTitle>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(current.difficulty)}`}>
                  {current.difficulty}
                </span>
                <span className="text-sm text-gray-600">{current.points} points</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <div className="text-8xl mb-4">{current.emoji}</div>
            </div>
            
            <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">
              {current.question}
            </h3>
            
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
                  <div className="flex items-center gap-3">
                    {showResult && index === current.correctAnswer && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                    {showResult && index === selectedAnswer && index !== current.correctAnswer && (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
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
                <button
                  onClick={nextChallenge}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {currentChallenge < filteredChallenges.length - 1 ? 'Next Challenge' : 'View Results'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisualIQ;
