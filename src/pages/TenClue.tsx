
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAge } from "../context/AgeContext";

const TenClue = () => {
  const { ageGroup } = useAge();
  const { toast } = useToast();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [currentClue, setCurrentClue] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [score, setScore] = useState(0);

  const puzzles = [
    {
      answer: "ELEPHANT",
      image: "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=400&h=300&fit=crop",
      clues: [
        "I am a very large animal",
        "I live in Africa and Asia",
        "I have thick, gray skin",
        "I use my nose to pick up things",
        "My nose is called a trunk",
        "I have big ears that flap",
        "I never forget anything",
        "I love to eat peanuts",
        "I can weigh as much as 4 cars",
        "I spray water on myself to stay cool"
      ]
    },
    {
      answer: "RAINBOW",
      image: "https://images.unsplash.com/photo-1447433607821-61cb8f82a6ee?w=400&h=300&fit=crop",
      clues: [
        "You can see me in the sky",
        "I appear after it rains",
        "I have many beautiful colors",
        "I am shaped like an arc",
        "Red is my first color",
        "Violet is my last color",
        "You need sunlight to see me",
        "I have 7 different colors",
        "People say there's gold at my end",
        "Children love to draw me with crayons"
      ]
    },
    {
      answer: "PIZZA",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      clues: [
        "I am a popular food",
        "I am round and flat",
        "I come from Italy",
        "I have cheese on top",
        "I am baked in an oven",
        "You can add pepperoni to me",
        "I am cut into triangle slices",
        "People eat me with their hands",
        "I have a crust around the edges",
        "Many kids ask for me at parties"
      ]
    }
  ];

  const handleGuess = (guess: string) => {
    const isCorrect = guess.toUpperCase() === puzzles[currentPuzzle].answer;
    
    if (isCorrect) {
      const points = Math.max(10, 20 - currentClue * 2);
      setScore(score + points);
      setGuessed(true);
      toast({
        title: "Correct! 🎉",
        description: `+${points} points! Total: ${score + points}`,
      });
    } else {
      toast({
        title: "Not quite right! 🤔",
        description: "Try using more clues!",
        variant: "destructive"
      });
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setCurrentClue(0);
      setGuessed(false);
    } else {
      toast({
        title: "All Puzzles Complete! 🏆",
        description: `Final Score: ${score} points`,
      });
    }
  };

  const showNextClue = () => {
    if (currentClue < puzzles[currentPuzzle].clues.length - 1) {
      setCurrentClue(currentClue + 1);
    }
  };

  const restartGame = () => {
    setCurrentPuzzle(0);
    setCurrentClue(0);
    setGuessed(false);
    setScore(0);
  };

  const currentPuzzleData = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            🎯 10 Clue Game
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Use the clues to guess what I am! Fewer clues = more points!
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <p className="font-bold text-lg">Score: {score} points</p>
            <p className="text-sm text-gray-600">Puzzle {currentPuzzle + 1} of {puzzles.length}</p>
          </div>
        </div>

        {currentPuzzle < puzzles.length ? (
          <div className="max-w-3xl mx-auto">
            <ContentCard
              title={`Puzzle ${currentPuzzle + 1}`}
              type="puzzle"
              content={
                <div className="space-y-6">
                  {guessed && (
                    <img 
                      src={currentPuzzleData.image} 
                      alt="Answer reveal"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  )}
                  
                  <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
                    <h4 className="font-bold text-teal-800 mb-3">🔍 Clues:</h4>
                    <div className="space-y-2">
                      {currentPuzzleData.clues.slice(0, currentClue + 1).map((clue, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="bg-teal-200 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <p className="text-teal-900">{clue}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      {currentClue < currentPuzzleData.clues.length - 1 && !guessed && (
                        <Button 
                          onClick={showNextClue}
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          Show Next Clue ({currentClue + 1}/10)
                        </Button>
                      )}
                      
                      <div className="text-sm text-teal-700 flex items-center">
                        Points for solving now: {Math.max(10, 20 - currentClue * 2)}
                      </div>
                    </div>
                  </div>

                  {guessed ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2 text-2xl">✅ {currentPuzzleData.answer}!</h4>
                      <p className="text-green-700">Great job! You solved it with {currentClue + 1} clue(s).</p>
                      <Button 
                        onClick={nextPuzzle}
                        className="mt-3 bg-green-500 hover:bg-green-600"
                      >
                        {currentPuzzle < puzzles.length - 1 ? "Next Puzzle" : "Finish Game"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="font-bold text-center text-lg">What am I?</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your guess..."
                          className="flex-1 p-3 border border-gray-300 rounded-lg"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleGuess((e.target as HTMLInputElement).value);
                            }
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            const input = (e.target as HTMLElement).parentElement?.querySelector('input');
                            if (input) handleGuess(input.value);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          Guess!
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <ContentCard
              title="All Puzzles Complete!"
              type="puzzle"
              content={
                <div className="space-y-4">
                  <div className="text-6xl">🏆</div>
                  <h3 className="text-2xl font-bold">Puzzle Master!</h3>
                  <p className="text-lg">Final Score: {score} points</p>
                  <Button onClick={restartGame} className="w-full">
                    Play Again
                  </Button>
                </div>
              }
            />
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-3">🎮 How to Play</h3>
            <ul className="text-left space-y-2 text-sm">
              <li>• Read each clue carefully</li>
              <li>• Try to guess with fewer clues for more points</li>
              <li>• Type your answer and press Enter or click Guess</li>
              <li>• Use 1 clue = 20 points, 10 clues = 10 points</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenClue;
