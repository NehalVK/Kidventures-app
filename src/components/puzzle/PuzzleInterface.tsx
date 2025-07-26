
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface PuzzleType {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  emoji: string;
}

interface DifficultyLevel {
  name: string;
  gridSize?: number;
  wordCount?: number;
  timeLimit?: number;
  complexity: "Easy" | "Medium" | "Hard";
}

interface PuzzleGameState {
  isStarted: boolean;
  isCompleted: boolean;
  startTime: number | null;
  endTime: number | null;
  score: number;
  hintsUsed: number;
  moves: number;
}

interface PuzzleInterfaceProps {
  currentPuzzle: PuzzleType;
  difficultyLevels: DifficultyLevel[];
  gameState: PuzzleGameState;
  ageGroup: string;
  onBack: () => void;
}

const PuzzleInterface = ({ 
  currentPuzzle, 
  difficultyLevels, 
  gameState, 
  ageGroup, 
  onBack 
}: PuzzleInterfaceProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Puzzles
        </Button>
        <div className="text-2xl">{currentPuzzle.emoji}</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
            {currentPuzzle.icon}
            {currentPuzzle.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-gray-600">
            {currentPuzzle.description}
          </p>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Choose Difficulty Level:</h3>
            <div className="flex justify-center gap-4">
              {difficultyLevels.map((level) => (
                <Button
                  key={level.name}
                  className={`${currentPuzzle.color} text-white hover:opacity-90`}
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="text-6xl mb-4">{currentPuzzle.emoji}</div>
            <p className="text-gray-600">
              Puzzle interface will be implemented here
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Age group: {ageGroup} | Difficulty levels available: {difficultyLevels.map(d => d.name).join(", ")}
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Game State: {gameState.isStarted ? "Started" : "Not Started"} | 
              Score: {gameState.score} | 
              Hints Used: {gameState.hintsUsed}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PuzzleInterface;
