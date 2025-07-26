import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator, Brain, Trophy, Clock, Star, Play, CheckCircle } from "lucide-react";

const AdvancedMath = () => {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [realWorldStep, setRealWorldStep] = useState(0);

  const challenges = [
    {
      id: "logicPuzzles",
      title: "Logic Puzzle Challenges",
      description: "Solve number sequences and pattern recognition puzzles!",
      icon: <Brain className="w-8 h-8" />,
      points: 50,
      color: "bg-purple-100"
    },
    {
      id: "speedMath",
      title: "Speed Math Competition",
      description: "How fast can you solve math problems?",
      icon: <Clock className="w-8 h-8" />,
      points: 40,
      color: "bg-orange-100"
    },
    {
      id: "realWorldMath",
      title: "Real-World Math Problems",
      description: "Use math to solve everyday situations!",
      icon: <Calculator className="w-8 h-8" />,
      points: 45,
      color: "bg-green-100"
    },
    {
      id: "mathMystery",
      title: "Math Mystery Games",
      description: "Solve mysteries using mathematical clues!",
      icon: <Trophy className="w-8 h-8" />,
      points: 55,
      color: "bg-blue-100"
    }
  ];

  const logicPuzzles = [
    {
      question: "What comes next in this sequence: 2, 4, 8, 16, ___?",
      answer: "32",
      explanation: "Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32"
    },
    {
      question: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 6 mice in 6 minutes?",
      answer: "3",
      explanation: "Each cat catches 1 mouse every 3 minutes, so 3 cats can catch 6 mice in 6 minutes"
    },
    {
      question: "What number should replace the question mark: 5, 11, 23, 47, ___?",
      answer: "95",
      explanation: "Each number is doubled and then 1 is added: 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95"
    }
  ];

  const speedMathProblems = [
    { problem: "45 + 37", answer: "82" },
    { problem: "126 - 89", answer: "37" },
    { problem: "23 × 4", answer: "92" },
    { problem: "144 ÷ 12", answer: "12" },
    { problem: "67 + 28", answer: "95" },
    { problem: "15 × 8", answer: "120" },
    { problem: "200 - 147", answer: "53" },
    { problem: "96 ÷ 8", answer: "12" }
  ];

  const realWorldProblems = [
    {
      title: "Planning a Birthday Party",
      scenario: "You're planning a party for 24 friends. Pizza costs $12 each and feeds 4 people.",
      question: "How much will pizza cost for everyone?",
      answer: "72",
      explanation: "24 ÷ 4 = 6 pizzas needed. 6 × $12 = $72"
    },
    {
      title: "Saving for a Bike",
      scenario: "You want a bike that costs $180. You save $15 per week.",
      question: "How many weeks until you can buy the bike?",
      answer: "12",
      explanation: "$180 ÷ $15 per week = 12 weeks"
    },
    {
      title: "School Fundraiser",
      scenario: "Your class sold 45 candy bars for $2 each and 30 cookies for $1.50 each.",
      question: "How much money did you raise in total?",
      answer: "135",
      explanation: "(45 × $2) + (30 × $1.50) = $90 + $45 = $135"
    }
  ];

  const mathMysteries = [
    {
      title: "The Missing Birthday Money",
      clues: [
        "Sarah had some birthday money",
        "She spent $25 on a book",
        "Then she spent half of what was left on a game",
        "She has $15 remaining"
      ],
      question: "How much birthday money did Sarah start with?",
      answer: "55",
      explanation: "Working backwards: $15 × 2 = $30 (before buying game), $30 + $25 = $55"
    }
  ];

  const handleAnswer = (answer: string, correctAnswer: string, points: number = 10) => {
    const correct = answer.toLowerCase().trim() === correctAnswer.toLowerCase();
    
    setIsCorrect(correct);
    if (correct) {
      setScore(score + points);
    }
    
    setTimeout(() => {
      const maxProblems = currentChallenge === "logicPuzzles" ? logicPuzzles.length :
                          currentChallenge === "speedMath" ? speedMathProblems.length :
                          currentChallenge === "realWorldMath" ? realWorldProblems.length : 1;
      
      if (currentProblem < maxProblems - 1) {
        setCurrentProblem(currentProblem + 1);
        setUserAnswer("");
        setIsCorrect(null);
      }
    }, 2000);
  };

  const resetChallenge = () => {
    setCurrentChallenge(null);
    setCurrentProblem(0);
    setUserAnswer("");
    setIsCorrect(null);
    setRealWorldStep(0);
  };

  if (currentChallenge === "speedMath") {
    const problem = speedMathProblems[currentProblem];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">⚡ Speed Math Challenge</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-orange-600">Problem {currentProblem + 1} of {speedMathProblems.length} | Score: {score}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-4xl text-center">{problem.problem} = ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full p-4 border-2 border-orange-300 rounded-lg text-center text-2xl"
                  disabled={isCorrect !== null}
                />
                
                {isCorrect === null && (
                  <Button
                    onClick={() => handleAnswer(userAnswer, problem.answer, 5)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-xl py-3"
                    disabled={!userAnswer.trim()}
                  >
                    Submit Answer! (+5 points)
                  </Button>
                )}
                
                {isCorrect !== null && (
                  <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isCorrect ? (
                      <div>
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-bold text-xl">Correct! ⚡</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-bold text-xl">The answer is: {problem.answer}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetChallenge} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentChallenge === "realWorldMath") {
    const problem = realWorldProblems[currentProblem];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🌍 Real-World Math</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-green-600">Problem {currentProblem + 1} of {realWorldProblems.length} | Score: {score}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">{problem.scenario}</p>
                  <p className="font-bold text-lg">{problem.question}</p>
                </div>
                
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-3 border-2 border-green-300 rounded-lg text-center text-xl"
                  disabled={isCorrect !== null}
                />
                
                {isCorrect === null && (
                  <Button
                    onClick={() => handleAnswer(userAnswer, problem.answer, 15)}
                    className="w-full bg-green-500 hover:bg-green-600"
                    disabled={!userAnswer.trim()}
                  >
                    Submit Answer! (+15 points)
                  </Button>
                )}
                
                {isCorrect !== null && (
                  <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isCorrect ? (
                      <div>
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-bold text-xl">Excellent! 🎉</p>
                        <p className="text-gray-700 mt-2">{problem.explanation}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-bold text-xl">The answer is: ${problem.answer}</p>
                        <p className="text-gray-700 mt-2">{problem.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetChallenge} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentChallenge === "mathMystery") {
    const mystery = mathMysteries[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🕵️ Math Mystery</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-blue-600">Can you solve the mystery?</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{mystery.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h4 className="font-bold mb-3">🔍 Clues:</h4>
                  {mystery.clues.map((clue, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{clue}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="font-bold text-lg">{mystery.question}</p>
                </div>
                
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-3 border-2 border-blue-300 rounded-lg text-center text-xl"
                  disabled={isCorrect !== null}
                />
                
                {isCorrect === null && (
                  <Button
                    onClick={() => handleAnswer(userAnswer, mystery.answer, 25)}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    disabled={!userAnswer.trim()}
                  >
                    Solve the Mystery! (+25 points)
                  </Button>
                )}
                
                {isCorrect !== null && (
                  <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isCorrect ? (
                      <div>
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-bold text-xl">Mystery Solved! 🕵️‍♂️</p>
                        <p className="text-gray-700 mt-2">{mystery.explanation}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-bold text-xl">The answer is: ${mystery.answer}</p>
                        <p className="text-gray-700 mt-2">{mystery.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetChallenge} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentChallenge === "logicPuzzles") {
    const puzzle = logicPuzzles[currentProblem];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🧠 Logic Puzzle Challenge</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-purple-600">Problem {currentProblem + 1} of {logicPuzzles.length} | Score: {score}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{puzzle.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-xl"
                  disabled={isCorrect !== null}
                />
                
                {isCorrect === null && (
                  <Button
                    onClick={() => handleAnswer(userAnswer, puzzle.answer)}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    disabled={!userAnswer.trim()}
                  >
                    Submit Answer
                  </Button>
                )}
                
                {isCorrect !== null && (
                  <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isCorrect ? (
                      <div>
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-bold text-xl">Correct! 🎉</p>
                        <p className="text-gray-700 mt-2">{puzzle.explanation}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-bold text-xl">Try again! 🤔</p>
                        <p className="text-gray-700 mt-2">The correct answer is: {puzzle.answer}</p>
                        <p className="text-gray-700 mt-1">{puzzle.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetChallenge} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Advanced Math Challenges 🧮
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Push your math skills to the next level with challenging puzzles and problems!
          </p>
          {score > 0 && (
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-purple-600">Your Score: {score} points! 🌟</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className={`${challenge.color} border-2 hover:shadow-xl transition-all cursor-pointer`}>
              <CardHeader className="text-center">
                <div className="text-gray-700 mb-4">{challenge.icon}</div>
                <CardTitle className="text-xl text-gray-800">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">{challenge.description}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentChallenge(challenge.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Challenge! (+{challenge.points} points)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎯 Math Skills You'll Master! 🎯
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🧩 Pattern Recognition</h4>
              <p>Learn to spot patterns and predict what comes next!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">⚡ Mental Math</h4>
              <p>Solve problems quickly in your head without a calculator!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🔍 Problem Solving</h4>
              <p>Break down complex problems into smaller, manageable parts!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">💰 Real-World Applications</h4>
              <p>Use math to solve everyday problems and situations!</p>
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

export default AdvancedMath;
