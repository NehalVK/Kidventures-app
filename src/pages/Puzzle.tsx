
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Puzzle as PuzzleIcon, RotateCcw, CheckCircle, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Puzzle = () => {
  const { toast } = useToast();
  const [selectedPuzzle, setSelectedPuzzle] = useState<string>("");
  const [jigsawPieces, setJigsawPieces] = useState<number[]>([]);
  const [slidingPuzzle, setSlidingPuzzle] = useState<number[]>([]);
  const [colorPuzzle, setColorPuzzle] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>([]);

  const puzzleTypes = [
    {
      id: 'sliding',
      title: 'Number Slide',
      description: 'Arrange numbers 1-8 in order',
      emoji: '🔢',
      difficulty: 'Medium',
      points: 100,
      color: 'bg-blue-500'
    },
    {
      id: 'jigsaw',
      title: 'Block Puzzle',
      description: 'Fit puzzle pieces together',
      emoji: '🧩',
      difficulty: 'Easy',
      points: 75,
      color: 'bg-purple-500'
    },
    {
      id: 'color-match',
      title: 'Color Match',
      description: 'Match colors in sequence',
      emoji: '🎨',
      difficulty: 'Easy',
      points: 50,
      color: 'bg-green-500'
    },
    {
      id: 'number-chain',
      title: 'Number Chain',
      description: 'Connect numbers in order',
      emoji: '🔗',
      difficulty: 'Hard',
      points: 150,
      color: 'bg-red-500'
    },
    {
      id: 'pattern-match',
      title: 'Pattern Match',
      description: 'Complete the pattern sequence',
      emoji: '🔄',
      difficulty: 'Medium',
      points: 125,
      color: 'bg-yellow-500'
    },
    {
      id: 'shape-sort',
      title: 'Shape Sort',
      description: 'Sort shapes by properties',
      emoji: '⭐',
      difficulty: 'Easy',
      points: 75,
      color: 'bg-pink-500'
    }
  ];

  const addPoints = (points: number, puzzleId: string) => {
    setTotalPoints(prev => prev + points);
    if (!completedPuzzles.includes(puzzleId)) {
      setCompletedPuzzles(prev => [...prev, puzzleId]);
    }
    toast({
      title: "Puzzle Completed! 🎉",
      description: `You earned ${points} points! Total: ${totalPoints + points}`,
    });
  };

  // Initialize sliding puzzle
  const initializeSlidingPuzzle = () => {
    const puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const shuffled = [...puzzle].sort(() => Math.random() - 0.5);
    setSlidingPuzzle(shuffled);
  };

  // Initialize jigsaw puzzle
  const initializeJigsaw = () => {
    const pieces = Array.from({ length: 9 }, (_, i) => i + 1);
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    setJigsawPieces(shuffled);
  };

  // Initialize color puzzle
  const initializeColorPuzzle = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    setColorPuzzle(shuffled);
  };

  const SlidingPuzzle = () => {
    const moveTile = (index: number) => {
      const emptyIndex = slidingPuzzle.indexOf(0);
      const canMove = (
        (index === emptyIndex - 1 && emptyIndex % 3 !== 0) ||
        (index === emptyIndex + 1 && index % 3 !== 0) ||
        index === emptyIndex - 3 ||
        index === emptyIndex + 3
      );

      if (canMove) {
        const newPuzzle = [...slidingPuzzle];
        [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
        setSlidingPuzzle(newPuzzle);

        const isSolved = newPuzzle.slice(0, 8).every((num, idx) => num === idx + 1) && newPuzzle[8] === 0;
        if (isSolved) {
          addPoints(100, 'sliding');
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Number Slide Puzzle</h2>
          <p className="text-gray-600 mb-4">Arrange numbers 1-8 in order. Click tiles to move them!</p>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto bg-gray-100 p-4 rounded-lg">
          {slidingPuzzle.map((num, index) => (
            <div
              key={index}
              className={`aspect-square rounded flex items-center justify-center text-2xl font-bold cursor-pointer transition-all ${
                num === 0 
                  ? 'bg-gray-200' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
              }`}
              onClick={() => num !== 0 && moveTile(index)}
            >
              {num !== 0 ? num : ''}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={initializeSlidingPuzzle} variant="outline">
            <RotateCcw size={16} className="mr-2" />
            Shuffle Puzzle
          </Button>
        </div>
      </div>
    );
  };

  const ColorMatchPuzzle = () => {
    const [targetPattern] = useState(['red', 'blue', 'green', 'yellow']);
    const [currentPattern, setCurrentPattern] = useState<string[]>([]);

    const addColor = (color: string) => {
      if (currentPattern.length < 4) {
        const newPattern = [...currentPattern, color];
        setCurrentPattern(newPattern);
        
        if (newPattern.length === 4) {
          if (JSON.stringify(newPattern) === JSON.stringify(targetPattern)) {
            addPoints(50, 'color-match');
          } else {
            toast({
              title: "Try again! 🎨",
              description: "The color sequence doesn't match. Try again!",
              variant: "destructive"
            });
            setTimeout(() => setCurrentPattern([]), 1000);
          }
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Color Match</h2>
          <p className="text-gray-600 mb-4">Match the color sequence: Red → Blue → Green → Yellow</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Target Pattern:</h3>
            <div className="flex gap-2 justify-center">
              {targetPattern.map((color, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full border-2 border-gray-300`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Your Pattern:</h3>
            <div className="flex gap-2 justify-center">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full border-2 border-gray-300 ${
                    currentPattern[index] ? '' : 'bg-gray-100'
                  }`}
                  style={{ backgroundColor: currentPattern[index] || 'transparent' }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['red', 'blue', 'green', 'yellow', 'purple', 'orange'].map((color) => (
              <button
                key={color}
                onClick={() => addColor(color)}
                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <Button onClick={() => setCurrentPattern([])} variant="outline">
              Reset Pattern
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentPuzzle = () => {
    switch (selectedPuzzle) {
      case 'sliding':
        return <SlidingPuzzle />;
      case 'color-match':
        return <ColorMatchPuzzle />;
      default:
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🧩</div>
            <p className="text-gray-600">This puzzle is coming soon!</p>
            <Button onClick={() => setSelectedPuzzle("")} className="mt-4">
              Back to Puzzle Selection
            </Button>
          </div>
        );
    }
  };

  if (!selectedPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PuzzleIcon className="text-purple-500" size={40} />
              <h1 className="text-4xl font-bold text-gray-800">Interactive Puzzles</h1>
            </div>
            <p className="text-lg text-gray-600 mb-4">Challenge your mind with fun puzzles!</p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-600" size={20} />
                  <span className="font-bold text-yellow-700">{totalPoints} Points</span>
                </div>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="text-green-600" size={20} />
                  <span className="font-bold text-green-700">{completedPuzzles.length} Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {puzzleTypes.map((puzzle) => (
              <Card 
                key={puzzle.id}
                className="hover:shadow-lg transition-all cursor-pointer hover:scale-105" 
                onClick={() => {
                  setSelectedPuzzle(puzzle.id);
                  if (puzzle.id === 'sliding') initializeSlidingPuzzle();
                  if (puzzle.id === 'jigsaw') initializeJigsaw();
                  if (puzzle.id === 'color-match') initializeColorPuzzle();
                }}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-2">{puzzle.emoji}</div>
                  <CardTitle className="text-xl">{puzzle.title}</CardTitle>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                      puzzle.difficulty === 'Easy' ? 'bg-green-500' :
                      puzzle.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {puzzle.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{puzzle.points} pts</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{puzzle.description}</p>
                  {completedPuzzles.includes(puzzle.id) && (
                    <div className="flex items-center justify-center gap-1 text-green-600 mb-4">
                      <CheckCircle size={16} />
                      <span className="text-sm font-semibold">Completed!</span>
                    </div>
                  )}
                  <Button className={`w-full ${puzzle.color} hover:opacity-90`}>
                    Start Puzzle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => setSelectedPuzzle("")} variant="outline">
            <ArrowLeft size={20} className="mr-2" />
            Back to Puzzles
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-600" size={20} />
                <span className="font-bold text-yellow-700">{totalPoints} Points</span>
              </div>
            </div>
          </div>
        </div>

        {renderCurrentPuzzle()}
      </div>
    </div>
  );
};

export default Puzzle;
