
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Riddles = () => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const { toast } = useToast();

  const riddles = [
    {
      id: 1,
      question: "What has keys but no locks, and can't open any doors?",
      answer: "piano",
      hint: "It makes beautiful music!",
      points: 10,
      emoji: "🎹"
    },
    {
      id: 2,
      question: "What gets wet while drying?",
      answer: "towel",
      hint: "You use it after a shower!",
      points: 10,
      emoji: "🏖️"
    },
    {
      id: 3,
      question: "What has a face and two hands but no arms or legs?",
      answer: "clock",
      hint: "It tells you the time!",
      points: 10,
      emoji: "⏰"
    },
    {
      id: 4,
      question: "What goes up but never comes down?",
      answer: "age",
      hint: "It happens every year on your birthday!",
      points: 10,
      emoji: "🎂"
    }
  ];

  const currentRiddleData = riddles[currentRiddle];

  const checkAnswer = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === currentRiddleData.answer.toLowerCase();
    setAnsweredCorrectly(isCorrect);
    
    if (isCorrect) {
      setScore(score + currentRiddleData.points);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${currentRiddleData.points} points!`,
      });
    } else {
      toast({
        title: "Not quite right! 🤔",
        description: "Try again or check the hint!",
        variant: "destructive"
      });
    }
    
    setShowAnswer(true);
  };

  const nextRiddle = () => {
    if (currentRiddle < riddles.length - 1) {
      setCurrentRiddle(currentRiddle + 1);
      setShowAnswer(false);
      setUserAnswer("");
      setAnsweredCorrectly(null);
    }
  };

  const previousRiddle = () => {
    if (currentRiddle > 0) {
      setCurrentRiddle(currentRiddle - 1);
      setShowAnswer(false);
      setUserAnswer("");
      setAnsweredCorrectly(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Lightbulb className="text-yellow-500 text-3xl" />
          <h1 className="text-4xl font-bold text-yellow-600">Riddles</h1>
        </div>

        <div className="text-center mb-6">
          <div className="bg-yellow-100 px-6 py-3 rounded-full inline-block shadow-md">
            <span className="font-bold text-yellow-800 text-lg">🏆 Score: {score} points</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={previousRiddle}
            disabled={currentRiddle === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-500">
            {currentRiddle + 1} of {riddles.length}
          </span>
          
          <Button
            onClick={nextRiddle}
            disabled={currentRiddle === riddles.length - 1}
            variant="outline"
          >
            Next
          </Button>
        </div>
        
        <ContentCard
          title={`Riddle ${currentRiddle + 1}`}
          type="riddle"
          points={currentRiddleData.points}
          showPoints={true}
          content={
            <div className="text-center">
              <div className="text-6xl mb-4">{currentRiddleData.emoji}</div>
              <p className="text-lg font-medium mb-6 text-gray-700">
                {currentRiddleData.question}
              </p>
              
              {!showAnswer ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border rounded-lg text-center"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  />
                  
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Submit Answer
                    </Button>
                  </div>
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                      Need a hint? 💡
                    </summary>
                    <p className="mt-2 text-gray-600 italic">{currentRiddleData.hint}</p>
                  </details>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    {answeredCorrectly ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <p className="text-lg font-bold">
                      Answer: {currentRiddleData.answer}
                    </p>
                  </div>
                  
                  {answeredCorrectly && (
                    <div className="bg-green-100 p-3 rounded-lg">
                      <span className="text-green-700 font-bold">
                        🎉 +{currentRiddleData.points} points earned!
                      </span>
                    </div>
                  )}
                  
                  {currentRiddle < riddles.length - 1 ? (
                    <Button
                      onClick={nextRiddle}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Next Riddle
                    </Button>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-bold mb-4">
                        🎉 You completed all riddles!
                      </p>
                      <p className="text-gray-600">
                        Final Score: {score} points
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Riddles;
