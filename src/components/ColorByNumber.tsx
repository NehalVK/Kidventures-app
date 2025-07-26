
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ColorByNumberProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const ColorByNumber: React.FC<ColorByNumberProps> = ({ difficulty }) => {
  const { toast } = useToast();
  
  const colorMap = {
    1: "#ff6b6b", // Red
    2: "#4ecdc4", // Teal
    3: "#45b7d1", // Blue
    4: "#96ceb4", // Green
    5: "#feca57", // Yellow
    6: "#ff9ff3", // Pink
    7: "#54a0ff", // Light Blue
    8: "#5f27cd"  // Purple
  };

  // Simple pattern based on difficulty
  const patterns = {
    easy: [
      [1,1,2,2,2,1,1],
      [1,2,3,3,3,2,1],
      [2,3,4,4,4,3,2],
      [2,3,4,4,4,3,2],
      [1,2,3,3,3,2,1],
      [1,1,2,2,2,1,1]
    ],
    medium: [
      [1,1,2,3,3,2,1,1],
      [1,2,3,4,4,3,2,1],
      [2,3,4,5,5,4,3,2],
      [3,4,5,6,6,5,4,3],
      [2,3,4,5,5,4,3,2],
      [1,2,3,4,4,3,2,1],
      [1,1,2,3,3,2,1,1]
    ],
    hard: [
      [1,1,2,3,4,4,3,2,1,1],
      [1,2,3,4,5,5,4,3,2,1],
      [2,3,4,5,6,6,5,4,3,2],
      [3,4,5,6,7,7,6,5,4,3],
      [4,5,6,7,8,8,7,6,5,4],
      [3,4,5,6,7,7,6,5,4,3],
      [2,3,4,5,6,6,5,4,3,2],
      [1,2,3,4,5,5,4,3,2,1],
      [1,1,2,3,4,4,3,2,1,1]
    ]
  };

  const currentPattern = patterns[difficulty];
  const [coloredCells, setColoredCells] = useState<{[key: string]: string}>({});
  const [selectedColor, setSelectedColor] = useState<number>(1);

  const handleCellClick = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const targetNumber = currentPattern[row][col];
    
    if (selectedColor === targetNumber) {
      setColoredCells(prev => ({
        ...prev,
        [key]: colorMap[targetNumber as keyof typeof colorMap]
      }));
      
      // Check if puzzle is complete
      const totalCells = currentPattern.reduce((acc, row) => acc + row.length, 0);
      if (Object.keys(coloredCells).length + 1 >= totalCells) {
        toast({
          title: "Puzzle Complete! 🎉",
          description: "Amazing work! You've completed the color by number puzzle!"
        });
      }
    } else {
      toast({
        title: "Oops! 🤔",
        description: `That cell should be color ${targetNumber}, not ${selectedColor}!`,
        variant: "destructive"
      });
    }
  };

  const resetPuzzle = () => {
    setColoredCells({});
    toast({
      title: "Puzzle Reset! 🔄",
      description: "Starting fresh with a clean canvas!"
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-3">Color by Number - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h3>
        
        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Color Number:</label>
          <div className="flex gap-2">
            {Object.entries(colorMap).map(([number, color]) => (
              <button
                key={number}
                className={`w-12 h-12 rounded border-2 flex items-center justify-center font-bold text-white transition-all ${
                  selectedColor === Number(number) ? 'border-gray-800 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(Number(number))}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="border-2 border-gray-300 rounded-lg mb-4 p-2 bg-gray-50">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${currentPattern[0]?.length || 1}, 1fr)` }}>
          {currentPattern.map((row, rowIndex) =>
            row.map((cellNumber, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const isColored = coloredCells[key];
              
              return (
                <button
                  key={key}
                  className={`aspect-square border border-gray-400 flex items-center justify-center text-xs font-bold transition-all hover:scale-105 ${
                    isColored ? 'text-white' : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                  style={{ 
                    backgroundColor: isColored || 'white',
                    minWidth: '24px',
                    minHeight: '24px'
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {!isColored && cellNumber}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button onClick={resetPuzzle} variant="outline">
          Reset Puzzle
        </Button>
        <div className="text-sm text-gray-600 flex items-center">
          Progress: {Object.keys(coloredCells).length} / {currentPattern.reduce((acc, row) => acc + row.length, 0)} cells
        </div>
      </div>
    </div>
  );
};

export default ColorByNumber;
