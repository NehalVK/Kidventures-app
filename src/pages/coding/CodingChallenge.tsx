
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, RotateCcw, CheckCircle, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodingChallenge = () => {
  const { challengeId } = useParams();
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const challenges = {
    "maze-runner": {
      title: "Maze Runner",
      description: "Program a character to navigate through a maze using basic commands",
      difficulty: "Beginner",
      maxLevels: 3,
      instructions: [
        "Use the movement commands to guide your character through the maze",
        "Plan your route before starting",
        "Collect all stars to complete each level"
      ]
    },
    "pattern-maker": {
      title: "Pattern Maker",
      description: "Use loops to create colorful patterns and designs",
      difficulty: "Intermediate", 
      maxLevels: 4,
      instructions: [
        "Use repeat commands to create patterns",
        "Choose colors and shapes",
        "Make your pattern as creative as possible!"
      ]
    },
    "logic-puzzles": {
      title: "Logic Puzzles",
      description: "Solve problems using if-then logic and conditions",
      difficulty: "Intermediate",
      maxLevels: 5,
      instructions: [
        "Use IF-THEN statements to solve puzzles",
        "Think about different conditions",
        "Test your logic step by step"
      ]
    }
  };

  const currentChallenge = challenges[challengeId as keyof typeof challenges];

  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
          <Link to="/coding">
            <Button>Back to Coding</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const startChallenge = () => {
    setIsStarted(true);
    setCurrentLevel(1);
    setScore(0);
    setIsCompleted(false);
    toast({
      title: `${currentChallenge.title} Started! 🚀`,
      description: "Good luck with your coding challenge!",
    });
  };

  const completeLevel = () => {
    const levelScore = currentLevel * 10;
    setScore(score + levelScore);
    
    if (currentLevel < currentChallenge.maxLevels) {
      setCurrentLevel(currentLevel + 1);
      toast({
        title: `Level ${currentLevel} Complete! ⭐`,
        description: `You earned ${levelScore} points! Moving to level ${currentLevel + 1}`,
      });
    } else {
      setIsCompleted(true);
      toast({
        title: "Challenge Complete! 🏆",
        description: `Amazing work! Final score: ${score + levelScore} points!`,
      });
    }
  };

  const resetChallenge = () => {
    setIsStarted(false);
    setCurrentLevel(1);
    setScore(0);
    setIsCompleted(false);
    toast({
      title: "Challenge Reset",
      description: "Ready to start fresh!",
    });
  };

  const renderMazeRunner = () => (
    <div className="space-y-4">
      <div className="bg-gray-100 p-8 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏃‍♂️</div>
          <p className="text-lg font-semibold">Level {currentLevel} Maze</p>
          <p className="text-sm text-gray-600 mt-2">Guide the character to the exit!</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => toast({ title: "Moving Up! ⬆️" })}>⬆️ Move Up</Button>
        <Button onClick={() => toast({ title: "Moving Right! ➡️" })}>➡️ Move Right</Button>
        <Button onClick={() => toast({ title: "Moving Down! ⬇️" })}>⬇️ Move Down</Button>
        <Button onClick={() => toast({ title: "Moving Left! ⬅️" })}>⬅️ Move Left</Button>
      </div>
      <Button onClick={completeLevel} className="w-full bg-green-600 hover:bg-green-700">
        Complete Level {currentLevel}
      </Button>
    </div>
  );

  const renderPatternMaker = () => (
    <div className="space-y-4">
      <div className="bg-white p-8 rounded-lg min-h-[300px] border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-lg font-semibold">Pattern Canvas - Level {currentLevel}</p>
          <p className="text-sm text-gray-600 mt-2">Create beautiful patterns with loops!</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button onClick={() => toast({ title: "Added Circle! ⭕" })}>⭕ Circle</Button>
        <Button onClick={() => toast({ title: "Added Square! ⬜" })}>⬜ Square</Button>
        <Button onClick={() => toast({ title: "Added Triangle! 🔺" })}>🔺 Triangle</Button>
        <Button onClick={() => toast({ title: "Red Color Selected! 🔴" })}>🔴 Red</Button>
        <Button onClick={() => toast({ title: "Blue Color Selected! 🔵" })}>🔵 Blue</Button>
        <Button onClick={() => toast({ title: "Green Color Selected! 🟢" })}>🟢 Green</Button>
      </div>
      <Button onClick={completeLevel} className="w-full bg-purple-600 hover:bg-purple-700">
        Complete Pattern {currentLevel}
      </Button>
    </div>
  );

  const renderLogicPuzzles = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-8 rounded-lg min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <p className="text-lg font-semibold">Logic Puzzle {currentLevel}</p>
          <p className="text-sm text-gray-600 mt-2">Use IF-THEN logic to solve!</p>
        </div>
      </div>
      <div className="space-y-2">
        <Button onClick={() => toast({ title: "IF condition added! 🤔" })} className="w-full">
          IF (condition is true)
        </Button>
        <Button onClick={() => toast({ title: "THEN action added! ✅" })} className="w-full">
          THEN (do this action)
        </Button>
        <Button onClick={() => toast({ title: "ELSE action added! ❌" })} className="w-full">
          ELSE (do this instead)
        </Button>
      </div>
      <Button onClick={completeLevel} className="w-full bg-blue-600 hover:bg-blue-700">
        Solve Puzzle {currentLevel}
      </Button>
    </div>
  );

  const renderChallengeContent = () => {
    switch (challengeId) {
      case "maze-runner":
        return renderMazeRunner();
      case "pattern-maker":
        return renderPatternMaker();
      case "logic-puzzles":
        return renderLogicPuzzles();
      default:
        return <div>Challenge content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/coding">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Coding
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {currentChallenge.title}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{currentChallenge.description}</p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline">{currentChallenge.difficulty}</Badge>
            {isStarted && <Badge variant="outline">Level {currentLevel}</Badge>}
            {isStarted && <Badge variant="outline">Score: {score}</Badge>}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              {isStarted ? `Level ${currentLevel}` : 'Challenge Instructions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {!isStarted ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">How to Play:</h3>
                  <ul className="space-y-2">
                    {currentChallenge.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={startChallenge}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                  >
                    <Play className="w-5 h-5" />
                    Start Challenge
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {renderChallengeContent()}
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={resetChallenge} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isCompleted && (
          <div className="text-center mt-8">
            <Card className="max-w-md mx-auto bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Challenge Complete!</h3>
                <p className="text-yellow-700 mb-2">Final Score: {score} points</p>
                <p className="text-sm text-yellow-600 mb-4">You're a coding champion!</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={resetChallenge} variant="outline">
                    Play Again
                  </Button>
                  <Link to="/coding">
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      Back to Challenges
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CodingChallenge;
