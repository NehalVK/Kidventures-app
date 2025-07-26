import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, Star, Trophy, PlayCircle, RefreshCw, VolumeX } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { audioManager } from "../utils/audioUtils";

const AnimalSoundQuiz = () => {
  const [currentActivity, setCurrentActivity] = useState("menu");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize audio when component mounts
  useEffect(() => {
    const initAudio = async () => {
      if (soundEnabled) {
        // Initialize audio context with user interaction
        try {
          await audioManager.playBackgroundMusic(0.1);
        } catch (error) {
          console.log('Audio initialization failed:', error);
        }
      }
    };
    
    initAudio();
    
    return () => {
      audioManager.stopAllAudio();
    };
  }, [soundEnabled]);

  const animals = [
    { name: "Dog", sound: "Woof! Woof!", emoji: "🐕", color: "bg-yellow-200" },
    { name: "Cat", sound: "Meow! Meow!", emoji: "🐱", color: "bg-pink-200" },
    { name: "Cow", sound: "Moo! Moo!", emoji: "🐄", color: "bg-green-200" },
    { name: "Pig", sound: "Oink! Oink!", emoji: "🐷", color: "bg-red-200" },
    { name: "Duck", sound: "Quack! Quack!", emoji: "🦆", color: "bg-blue-200" },
    { name: "Horse", sound: "Neigh! Neigh!", emoji: "🐴", color: "bg-purple-200" },
    { name: "Sheep", sound: "Baa! Baa!", emoji: "🐑", color: "bg-gray-200" },
    { name: "Rooster", sound: "Cock-a-doodle-doo!", emoji: "🐓", color: "bg-orange-200" }
  ];

  const activities = [
    {
      id: "sound-match",
      title: "Sound Matching Game",
      description: "Match the animal sounds to the correct animals!",
      icon: <Volume2 className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
      id: "memory-game",
      title: "Animal Memory Game",
      description: "Remember the sequence of animal sounds!",
      icon: <Star className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-400 to-purple-600"
    },
    {
      id: "quiz-challenge",
      title: "Animal Quiz Challenge",
      description: "Test your knowledge of animal sounds!",
      icon: <Trophy className="w-8 h-8" />,
      color: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
      id: "sound-story",
      title: "Animal Sound Story",
      description: "Create stories with animal sounds!",
      icon: <PlayCircle className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-400 to-orange-600"
    }
  ];

  const SoundMatchingGame = () => {
    const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      setCurrentAnimal(randomAnimal);
      
      const wrongOptions = animals.filter(a => a.name !== randomAnimal.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      setOptions([randomAnimal, ...wrongOptions].sort(() => Math.random() - 0.5));
    }, [currentQuestion]);

    const playAnimalSound = async (animal: typeof animals[0]) => {
      if (soundEnabled) {
        try {
          await audioManager.playAnimalSound(animal.name);
          console.log(`Playing sound for ${animal.name}`);
        } catch (error) {
          console.error('Error playing animal sound:', error);
        }
      }
    };

    const handleAnswer = async (selectedAnimal) => {
      if (soundEnabled) {
        try {
          await audioManager.playClickSound();
        } catch (error) {
          console.error('Error playing click sound:', error);
        }
      }

      if (selectedAnimal.name === currentAnimal.name) {
        setScore(score + 1);
        setFeedback("Correct! 🎉");
        if (soundEnabled) {
          try {
            await audioManager.playSuccessSound();
          } catch (error) {
            console.error('Error playing success sound:', error);
          }
        }
      } else {
        setFeedback(`Not quite! The ${currentAnimal.name} says "${currentAnimal.sound}"`);
        if (soundEnabled) {
          try {
            await audioManager.playErrorSound();
          } catch (error) {
            console.error('Error playing error sound:', error);
          }
        }
      }
      
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback("");
      }, 2000);
    };

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-600">
              What animal makes this sound?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-6xl mb-4">{currentAnimal.emoji}</div>
            <div className="text-3xl font-bold text-blue-600 mb-6">
              "{currentAnimal.sound}"
            </div>
            
            <Button
              onClick={() => playAnimalSound(currentAnimal)}
              className="mb-6 bg-blue-500 hover:bg-blue-600"
              disabled={!soundEnabled}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Play Animal Sound
            </Button>
            
            {feedback && (
              <div className={`text-xl font-bold mb-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-orange-600'}`}>
                {feedback}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((animal, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(animal)}
                  className={`${animal.color} text-gray-800 hover:scale-105 transition-transform p-6 h-auto`}
                  disabled={feedback !== ""}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{animal.emoji}</div>
                    <div className="text-lg font-bold">{animal.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const MemoryGame = () => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [showingSequence, setShowingSequence] = useState(false);
    const [gamePhase, setGamePhase] = useState("start");

    const startMemoryGame = () => {
      const newSequence = [animals[Math.floor(Math.random() * animals.length)]];
      setSequence(newSequence);
      setPlayerSequence([]);
      setGamePhase("showing");
      playSequence(newSequence);
    };

    const playSequence = (seq) => {
      setShowingSequence(true);
      seq.forEach((animal, index) => {
        setTimeout(() => {
          // Visual indication of sequence
          if (index === seq.length - 1) {
            setTimeout(() => {
              setShowingSequence(false);
              setGamePhase("playing");
            }, 1000);
          }
        }, (index + 1) * 1000);
      });
    };

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-600">
              Animal Memory Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            {gamePhase === "start" && (
              <div>
                <p className="text-lg mb-4">Remember the sequence of animals!</p>
                <Button onClick={startMemoryGame} className="bg-purple-500 hover:bg-purple-600">
                  Start Game
                </Button>
              </div>
            )}
            
            {gamePhase === "showing" && (
              <div>
                <p className="text-lg mb-4">Watch carefully...</p>
                <div className="grid grid-cols-4 gap-4">
                  {sequence.map((animal, index) => (
                    <div key={index} className={`${animal.color} p-4 rounded-lg animate-pulse`}>
                      <div className="text-4xl">{animal.emoji}</div>
                      <div className="text-sm font-bold">{animal.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {gamePhase === "playing" && (
              <div>
                <p className="text-lg mb-4">Now repeat the sequence!</p>
                <div className="grid grid-cols-4 gap-4">
                  {animals.slice(0, 4).map((animal, index) => (
                    <Button
                      key={index}
                      className={`${animal.color} text-gray-800 hover:scale-105 transition-transform p-4 h-auto`}
                      onClick={() => {
                        const newPlayerSequence = [...playerSequence, animal];
                        setPlayerSequence(newPlayerSequence);
                        
                        if (newPlayerSequence.length === sequence.length) {
                          // Check if correct
                          const correct = newPlayerSequence.every((a, i) => a.name === sequence[i].name);
                          if (correct) {
                            setScore(score + sequence.length);
                            setGamePhase("correct");
                          } else {
                            setGamePhase("wrong");
                          }
                        }
                      }}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-1">{animal.emoji}</div>
                        <div className="text-sm font-bold">{animal.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderActivity = () => {
    switch (currentActivity) {
      case "sound-match":
        return <SoundMatchingGame />;
      case "memory-game":
        return <MemoryGame />;
      case "quiz-challenge":
        return <SoundMatchingGame />;
      case "sound-story":
        return <SoundMatchingGame />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className={`${activity.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3">
                    {activity.icon}
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <Button 
                    onClick={async () => {
                      setCurrentActivity(activity.id);
                      if (soundEnabled) {
                        try {
                          await audioManager.playClickSound();
                        } catch (error) {
                          console.error('Error playing click sound:', error);
                        }
                      }
                    }}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Start Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🐾 Animal Sound Quiz 🐾
          </h1>
          <p className="text-xl text-gray-700">
            Learn about animals and their sounds through fun activities!
          </p>
          
          {currentActivity !== "menu" && (
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white rounded-full px-4 py-2 shadow-md">
                <span className="text-purple-600 font-bold">Score: {score}</span>
              </div>
              <Button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                className="rounded-full"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {soundEnabled ? "Sound On" : "Sound Off"}
              </Button>
              <Button 
                onClick={async () => {
                  setCurrentActivity("menu");
                  if (soundEnabled) {
                    try {
                      await audioManager.playClickSound();
                    } catch (error) {
                      console.error('Error playing click sound:', error);
                    }
                  }
                }}
                variant="outline"
                className="rounded-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </div>
          )}
        </div>

        {renderActivity()}
      </main>
      
      <Footer />
    </div>
  );
};

export default AnimalSoundQuiz;
