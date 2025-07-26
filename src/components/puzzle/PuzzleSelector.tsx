
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PuzzleType {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  emoji: string;
}

interface PuzzleSelectorProps {
  puzzleTypes: PuzzleType[];
  onSelectPuzzle: (puzzleId: string) => void;
}

const PuzzleSelector = ({ puzzleTypes, onSelectPuzzle }: PuzzleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {puzzleTypes.map((puzzle) => (
        <Card
          key={puzzle.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${puzzle.color} text-white border-none shadow-xl`}
          onClick={() => onSelectPuzzle(puzzle.id)}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-6xl">{puzzle.emoji}</div>
            </div>
            <div className="flex justify-center mb-2">
              {puzzle.icon}
            </div>
            <CardTitle className="text-2xl">{puzzle.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/90">{puzzle.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PuzzleSelector;
