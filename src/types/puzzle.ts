
// Puzzle Type Interfaces
export interface PuzzleType {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  emoji: string;
}

export interface DifficultyLevel {
  name: string;
  gridSize?: number;
  wordCount?: number;
  timeLimit?: number;
  complexity: "Easy" | "Medium" | "Hard";
}

// Maze Interfaces
export interface MazeCell {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
}

export interface MazeConfig {
  width: number;
  height: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  difficulty: "Easy" | "Medium" | "Hard";
}

// Word Search Interfaces
export interface WordSearchCell {
  letter: string;
  isPartOfWord: boolean;
  isFound: boolean;
  wordId?: string;
}

export interface WordSearchWord {
  id: string;
  word: string;
  startPosition: { row: number; col: number };
  direction: "horizontal" | "vertical" | "diagonal";
  found: boolean;
}

export interface WordSearchGrid {
  cells: WordSearchCell[][];
  words: WordSearchWord[];
  size: number;
}

// Crossword Interfaces
export interface CrosswordClue {
  id: string;
  number: number;
  clue: string;
  answer: string;
  direction: "across" | "down";
  startPosition: { row: number; col: number };
  length: number;
}

export interface CrosswordCell {
  letter: string;
  userInput: string;
  isBlack: boolean;
  number?: number;
  clueIds: string[];
}

export interface CrosswordPuzzle {
  grid: CrosswordCell[][];
  clues: CrosswordClue[];
  size: number;
  title: string;
}

// Sudoku Interfaces
export interface SudokuCell {
  value: number;
  userInput: number;
  isGiven: boolean;
  isValid: boolean;
  possibleValues: number[];
}

export interface SudokuPuzzle {
  grid: SudokuCell[][];
  difficulty: "Easy" | "Medium" | "Hard";
  solution: number[][];
  isComplete: boolean;
}

// Game State Interfaces
export interface PuzzleGameState {
  isStarted: boolean;
  isCompleted: boolean;
  startTime: number | null;
  endTime: number | null;
  score: number;
  hintsUsed: number;
  moves: number;
}

export interface PuzzleProgress {
  currentLevel: number;
  completedLevels: string[];
  bestTimes: Record<string, number>;
  totalScore: number;
}
