
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAge } from "../context/AgeContext";

const MysteryImage = () => {
  const { ageGroup } = useAge();
  const { toast } = useToast();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentClue, setCurrentClue] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [score, setScore] = useState(0);

  const stories = [
    {
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      title: "The Missing Cookie",
      clues: [
        "Someone took all the cookies from the kitchen jar",
        "There are crumbs leading to the living room",
        "The family dog is sleeping peacefully",
        "A small chair is moved near the counter"
      ],
      options: ["The Dog", "Little Sister", "The Cat", "Dad"],
      correct: 1,
      solution: "It was the little sister! She moved the chair to reach the cookie jar."
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      title: "The Vanished Homework",
      clues: [
        "Tommy's homework disappeared from his desk",
        "The window was left open all night",
        "His papers are scattered around the yard",
        "It was very windy yesterday evening"
      ],
      options: ["His Brother", "The Wind", "His Teacher", "The Neighbor"],
      correct: 1,
      solution: "The wind blew through the open window and scattered the homework papers!"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      title: "The Empty Bird Feeder",
      clues: [
        "The bird feeder was full yesterday morning",
        "Now it's completely empty with seeds on the ground",
        "There are small paw prints in the dirt below",
        "The neighborhood squirrels look very happy"
      ],
      options: ["Big Birds", "Squirrels", "The Rain", "Mice"],
      correct: 1,
      solution: "The clever squirrels found a way to get all the bird seeds!"
    }
  ];

  const handleGuess = (selectedIndex: number) => {
    const isCorrect = selectedIndex === stories[currentStory].correct;
    
    if (isCorrect) {
      setScore(score + 20);
      setGuessed(true);
      toast({
        title: "Mystery Solved! 🕵️",
        description: `+20 points! Total: ${score + 20}`,
      });
    } else {
      toast({
        title: "Not quite right! 🤔",
        description: "Try thinking about all the clues together!",
        variant: "destructive"
      });
    }
  };

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setCurrentClue(0);
      setGuessed(false);
    } else {
      toast({
        title: "All Mysteries Solved! 🎉",
        description: `Final Score: ${score} points`,
      });
    }
  };

  const showNextClue = () => {
    if (currentClue < stories[currentStory].clues.length - 1) {
      setCurrentClue(currentClue + 1);
    }
  };

  const restartGame = () => {
    setCurrentStory(0);
    setCurrentClue(0);
    setGuessed(false);
    setScore(0);
  };

  const currentStoryData = stories[currentStory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            📚 Mystery Story
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Read the clues and solve the mystery story!
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <p className="font-bold text-lg">Score: {score} points</p>
            <p className="text-sm text-gray-600">Story {currentStory + 1} of {stories.length}</p>
          </div>
        </div>

        {currentStory < stories.length ? (
          <div className="max-w-3xl mx-auto">
            <ContentCard
              title={currentStoryData.title}
              type="story"
              content={
                <div className="space-y-6">
                  <img 
                    src={currentStoryData.image} 
                    alt={currentStoryData.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                    <h4 className="font-bold text-amber-800 mb-3">🔍 Clues:</h4>
                    <div className="space-y-2">
                      {currentStoryData.clues.slice(0, currentClue + 1).map((clue, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="bg-amber-200 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <p className="text-amber-900">{clue}</p>
                        </div>
                      ))}
                    </div>
                    
                    {currentClue < currentStoryData.clues.length - 1 && !guessed && (
                      <Button 
                        onClick={showNextClue}
                        className="mt-3 bg-amber-500 hover:bg-amber-600"
                      >
                        Show Next Clue
                      </Button>
                    )}
                  </div>

                  {guessed ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2">✅ Solution:</h4>
                      <p className="text-green-700">{currentStoryData.solution}</p>
                      <Button 
                        onClick={nextStory}
                        className="mt-3 bg-green-500 hover:bg-green-600"
                      >
                        {currentStory < stories.length - 1 ? "Next Mystery" : "Finish Game"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="font-bold text-center text-lg">Who do you think is responsible?</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {currentStoryData.options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleGuess(index)}
                            variant="outline"
                            className="p-4 text-lg h-auto"
                          >
                            {option}
                          </Button>
                        ))}
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
              title="All Stories Complete!"
              type="story"
              content={
                <div className="space-y-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-bold">Mystery Master!</h3>
                  <p className="text-lg">Final Score: {score} points</p>
                  <Button onClick={restartGame} className="w-full">
                    Read New Stories
                  </Button>
                </div>
              }
            />
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-3">📖 How to Play</h3>
            <ul className="text-left space-y-2 text-sm">
              <li>• Read each clue carefully</li>
              <li>• Think about what all the clues mean together</li>
              <li>• Make your guess about who or what solved the mystery</li>
              <li>• Earn 20 points for each correct answer!</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MysteryImage;
