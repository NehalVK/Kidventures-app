
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Lightbulb, 
  Star, 
  Trophy, 
  X, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Lock,
  Unlock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EscapeRoomGameProps {
  isOpen: boolean;
  onClose: () => void;
  roomData: any;
}

interface Puzzle {
  id: number;
  type: "riddle" | "code" | "pattern" | "sequence";
  question: string;
  answer: string;
  hints: string[];
  completed: boolean;
  difficulty: number;
}

const EscapeRoomGame = ({ isOpen, onClose, roomData }: EscapeRoomGameProps) => {
  const [gameState, setGameState] = useState({
    currentPuzzle: 0,
    score: 0,
    hintsUsed: 0,
    timeLeft: 1800, // 30 minutes in seconds
    gameStarted: false,
    gameCompleted: false,
    puzzlesCompleted: 0
  });
  
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const { toast } = useToast();

  // Generate puzzles based on room theme
  const generatePuzzles = (roomData: any): Puzzle[] => {
    if (!roomData) return [];

    const basePuzzles: Puzzle[] = [
      {
        id: 1,
        type: "riddle",
        question: "I have keys but no locks. I have space but no room. You can enter but not go outside. What am I?",
        answer: "keyboard",
        hints: ["It's something you use with a computer", "It has letters and numbers", "You type on it"],
        completed: false,
        difficulty: 1
      },
      {
        id: 2,
        type: "code",
        question: "Decode this message: 8-5-12-16 (A=1, B=2, C=3...)",
        answer: "help",
        hints: ["Each number represents a letter", "A=1, B=2, C=3, D=4, E=5...", "H=8, E=5, L=12, P=16"],
        completed: false,
        difficulty: 2
      },
      {
        id: 3,
        type: "pattern",
        question: "What comes next in this sequence: 2, 4, 8, 16, ?",
        answer: "32",
        hints: ["Look at how each number relates to the previous one", "Each number is doubled", "2×2=4, 4×2=8, 8×2=16..."],
        completed: false,
        difficulty: 2
      }
    ];

    // Customize puzzles based on room theme
    if (roomData.theme === "Pirate") {
      basePuzzles.push({
        id: 4,
        type: "riddle",
        question: "A pirate's treasure is buried where X marks the spot. If you start at the palm tree and walk 10 steps north, then 5 steps east, where do you dig?",
        answer: "northeast",
        hints: ["Think about directions", "You end up in which direction from the tree?", "North + East = ?"],
        completed: false,
        difficulty: 2
      });
    }

    return basePuzzles.slice(0, Math.min(roomData.clues || 3, basePuzzles.length));
  };

  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    if (roomData && puzzles.length === 0) {
      setPuzzles(generatePuzzles(roomData));
    }
  }, [roomData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.gameStarted && !gameState.gameCompleted && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.timeLeft]);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      timeLeft: (roomData?.timeLimit ? parseInt(roomData.timeLimit) * 60 : 1800)
    }));
    toast({
      title: "Game Started! 🎮",
      description: "Good luck solving the puzzles!"
    });
  };

  const submitAnswer = () => {
    const currentPuzzle = puzzles[gameState.currentPuzzle];
    if (!currentPuzzle) return;

    const isCorrect = userAnswer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase();
    
    if (isCorrect) {
      // Update puzzle as completed
      const updatedPuzzles = [...puzzles];
      updatedPuzzles[gameState.currentPuzzle].completed = true;
      setPuzzles(updatedPuzzles);

      // Calculate score
      const baseScore = 100;
      const timeBonus = Math.max(0, gameState.timeLeft / 10);
      const hintPenalty = gameState.hintsUsed * 10;
      const puzzleScore = Math.round(baseScore + timeBonus - hintPenalty);

      setGameState(prev => ({
        ...prev,
        score: prev.score + puzzleScore,
        puzzlesCompleted: prev.puzzlesCompleted + 1,
        currentPuzzle: prev.currentPuzzle + 1
      }));

      toast({
        title: "Correct! 🎉",
        description: `You earned ${puzzleScore} points!`
      });

      // Check if game is completed
      if (gameState.currentPuzzle + 1 >= puzzles.length) {
        setGameState(prev => ({ ...prev, gameCompleted: true }));
        toast({
          title: "Congratulations! 🏆",
          description: "You've escaped the room successfully!"
        });
      }
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Try again or use a hint!",
        variant: "destructive"
      });
    }

    setUserAnswer("");
    setShowHint(false);
    setCurrentHintIndex(0);
  };

  const useHint = () => {
    const currentPuzzle = puzzles[gameState.currentPuzzle];
    if (!currentPuzzle || currentHintIndex >= currentPuzzle.hints.length) return;

    setShowHint(true);
    setGameState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    
    setTimeout(() => {
      setCurrentHintIndex(prev => prev + 1);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetGame = () => {
    setGameState({
      currentPuzzle: 0,
      score: 0,
      hintsUsed: 0,
      timeLeft: 1800,
      gameStarted: false,
      gameCompleted: false,
      puzzlesCompleted: 0
    });
    setPuzzles(generatePuzzles(roomData));
    setUserAnswer("");
    setShowHint(false);
    setCurrentHintIndex(0);
  };

  if (!roomData) return null;

  const currentPuzzle = puzzles[gameState.currentPuzzle];
  const progress = (gameState.puzzlesCompleted / puzzles.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-2xl">{roomData.image}</span>
              {roomData.title}
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center gap-2 p-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-600">Time Left</div>
                  <div className="font-bold">{formatTime(gameState.timeLeft)}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-4">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="font-bold">{gameState.score}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-4">
                <Trophy className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="font-bold">{gameState.puzzlesCompleted}/{puzzles.length}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-4">
                <Lightbulb className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="text-sm text-gray-600">Hints Used</div>
                  <div className="font-bold">{gameState.hintsUsed}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Escape Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {!gameState.gameStarted ? (
            // Start Screen
            <Card className="text-center p-8">
              <div className="text-6xl mb-4">{roomData.image}</div>
              <h3 className="text-2xl font-bold mb-2">{roomData.title}</h3>
              <p className="text-gray-600 mb-6">{roomData.story}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Badge variant="outline" className="flex items-center gap-2 p-3">
                  <Clock className="w-4 h-4" />
                  {roomData.timeLimit}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 p-3">
                  <Eye className="w-4 h-4" />
                  {roomData.clues} Puzzles
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 p-3">
                  <Star className="w-4 h-4" />
                  {roomData.difficulty}
                </Badge>
              </div>
              <Button onClick={startGame} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Unlock className="w-4 h-4 mr-2" />
                Start Escape Room
              </Button>
            </Card>
          ) : gameState.gameCompleted ? (
            // Completion Screen
            <Card className="text-center p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-gray-600 mb-4">You successfully escaped the room!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gameState.score}</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatTime(gameState.timeLeft)}</div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{gameState.hintsUsed}</div>
                  <div className="text-sm text-gray-600">Hints Used</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  Play Again
                </Button>
                <Button onClick={onClose}>
                  Back to Rooms
                </Button>
              </div>
            </Card>
          ) : currentPuzzle ? (
            // Game Screen
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    Puzzle {gameState.currentPuzzle + 1} of {puzzles.length}
                  </h3>
                  <Badge variant={currentPuzzle.completed ? "default" : "secondary"}>
                    {currentPuzzle.completed ? <CheckCircle className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
                    {currentPuzzle.type.toUpperCase()}
                  </Badge>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg font-medium">{currentPuzzle.question}</p>
                </div>

                {showHint && currentHintIndex > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Hint:</span>
                    </div>
                    <p className="text-yellow-700">{currentPuzzle.hints[currentHintIndex - 1]}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Input
                    placeholder="Enter your answer..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                    className="flex-1"
                  />
                  <Button onClick={submitAnswer} disabled={!userAnswer.trim()}>
                    Submit
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={useHint}
                    disabled={currentHintIndex >= currentPuzzle.hints.length}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Use Hint ({currentPuzzle.hints.length - currentHintIndex} left)
                  </Button>
                  
                  {gameState.timeLeft < 300 && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Time running out!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Puzzle Overview */}
          {gameState.gameStarted && !gameState.gameCompleted && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Puzzle Progress</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {puzzles.map((puzzle, index) => (
                    <div
                      key={puzzle.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        puzzle.completed ? 'bg-green-100 text-green-800' :
                        index === gameState.currentPuzzle ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {puzzle.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : index === gameState.currentPuzzle ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span className="text-sm">Puzzle {index + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscapeRoomGame;
