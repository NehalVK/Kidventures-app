
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SequenceGame = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const actions = [
    { id: 'wake', text: 'Wake Up', emoji: '😴' },
    { id: 'brush', text: 'Brush Teeth', emoji: '🦷' },
    { id: 'breakfast', text: 'Eat Breakfast', emoji: '🥞' },
    { id: 'dress', text: 'Get Dressed', emoji: '👕' },
    { id: 'school', text: 'Go to School', emoji: '🎒' }
  ];

  const generateSequence = () => {
    const shuffled = [...actions].sort(() => Math.random() - 0.5);
    const levelSequence = shuffled.slice(0, Math.min(currentLevel + 2, actions.length));
    setSequence(levelSequence.map(action => action.id));
    setUserSequence([]);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateSequence();
  }, [currentLevel]);

  const addToUserSequence = (actionId: string) => {
    if (userSequence.includes(actionId)) return;
    
    const newSequence = [...userSequence, actionId];
    setUserSequence(newSequence);

    if (newSequence.length === sequence.length) {
      const correct = newSequence.every((action, index) => action === sequence[index]);
      setIsCorrect(correct);
      
      if (correct) {
        setScore(score + 10);
        toast({
          title: "Perfect! 🎉",
          description: "You got the sequence right!"
        });
        
        setTimeout(() => {
          if (currentLevel < 3) {
            setCurrentLevel(currentLevel + 1);
          } else {
            toast({
              title: "All levels completed! 🏆",
              description: "You're a sequence master!"
            });
          }
        }, 2000);
      } else {
        toast({
          title: "Not quite right! 🤔",
          description: "Try again to get the correct order.",
          variant: "destructive"
        });
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    generateSequence();
  };

  const getActionById = (id: string) => actions.find(action => action.id === id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="px-3 py-1">
          Level {currentLevel}
        </Badge>
        <Badge variant="outline" className="px-3 py-1">
          Score: {score}
        </Badge>
      </div>

      <Card className="p-4">
        <h4 className="font-semibold mb-3">Correct Morning Routine:</h4>
        <div className="flex flex-wrap gap-2">
          {sequence.map((actionId, index) => {
            const action = getActionById(actionId);
            return (
              <div key={index} className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                <span className="text-2xl">{action?.emoji}</span>
                <span className="text-sm font-medium">{index + 1}. {action?.text}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div>
        <h4 className="font-semibold mb-3">Put them in the right order:</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={() => addToUserSequence(action.id)}
              disabled={userSequence.includes(action.id) || isCorrect === true}
              variant={userSequence.includes(action.id) ? "default" : "outline"}
              className="flex items-center gap-2 p-3 h-auto"
            >
              <span className="text-xl">{action.emoji}</span>
              <span className="text-sm">{action.text}</span>
              {userSequence.includes(action.id) && (
                <CheckCircle className="w-4 h-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>

        {userSequence.length > 0 && (
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Your sequence:</h4>
            <div className="flex flex-wrap gap-2">
              {userSequence.map((actionId, index) => {
                const action = getActionById(actionId);
                return (
                  <div key={index} className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
                    <span className="text-xl">{action?.emoji}</span>
                    <span className="text-sm">{index + 1}. {action?.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={generateSequence} variant="outline" className="flex items-center gap-2">
          <Shuffle className="w-4 h-4" />
          New Sequence
        </Button>
        <Button onClick={resetGame} variant="outline">
          Reset Game
        </Button>
      </div>

      {isCorrect !== null && (
        <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? '✅ Correct! Great job!' : '❌ Try again! Check the order.'}
        </div>
      )}
    </div>
  );
};

export default SequenceGame;
