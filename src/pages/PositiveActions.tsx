import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ThumbsUp, ThumbsDown, Star, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PositiveActions = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameMode, setGameMode] = useState("menu");
  const { toast } = useToast();

  const goodHabits = [
    { 
      title: "Brushing Teeth", 
      emoji: "🦷", 
      description: "Brush your teeth twice a day to keep them clean and healthy!",
      tips: ["Use a soft toothbrush", "Brush for 2 minutes", "Don't forget to rinse!"]
    },
    { 
      title: "Washing Hands", 
      emoji: "🧼", 
      description: "Clean hands help keep germs away!",
      tips: ["Use soap and water", "Wash for 20 seconds", "Dry with a clean towel"]
    },
    { 
      title: "Saying Please & Thank You", 
      emoji: "🙏", 
      description: "Good manners make everyone happy!",
      tips: ["Say please when asking", "Say thank you when receiving", "Smile when you speak"]
    },
    { 
      title: "Helping Others", 
      emoji: "🤝", 
      description: "Helping friends and family feels great!",
      tips: ["Help with small tasks", "Share your toys", "Be kind to others"]
    },
    { 
      title: "Eating Healthy Food", 
      emoji: "🥕", 
      description: "Good food helps you grow strong!",
      tips: ["Eat fruits and vegetables", "Drink lots of water", "Try new healthy foods"]
    },
    { 
      title: "Cleaning Up", 
      emoji: "🧹", 
      description: "Put toys away when you're done playing!",
      tips: ["Put toys in their place", "Keep your room tidy", "Help clean up after meals"]
    }
  ];

  const badHabits = [
    { 
      title: "Not Sharing", 
      emoji: "😤", 
      description: "Sharing makes playtime more fun for everyone!",
      alternative: "Share your toys and take turns"
    },
    { 
      title: "Being Mean", 
      emoji: "😠", 
      description: "Mean words hurt people's feelings.",
      alternative: "Use kind words and be friendly"
    },
    { 
      title: "Not Listening", 
      emoji: "🙉", 
      description: "Good listeners learn more and stay safe!",
      alternative: "Listen when others are talking"
    },
    { 
      title: "Making Messes", 
      emoji: "🌪️", 
      description: "Big messes are hard to clean up!",
      alternative: "Clean as you go and be careful"
    },
    { 
      title: "Forgetting to Say Sorry", 
      emoji: "😔", 
      description: "Everyone makes mistakes - saying sorry helps!",
      alternative: "Say sorry when you make a mistake"
    }
  ];

  const quizQuestions = [
    {
      question: "What should you do after using the bathroom?",
      options: ["Wash your hands", "Run away", "Hide"],
      correct: 0,
      emoji: "🚿"
    },
    {
      question: "When someone gives you something, what should you say?",
      options: ["Nothing", "Thank you", "Go away"],
      correct: 1,
      emoji: "🎁"
    },
    {
      question: "What's a good thing to do with your toys?",
      options: ["Break them", "Share them", "Hide them"],
      correct: 1,
      emoji: "🧸"
    },
    {
      question: "How should you talk to your friends?",
      options: ["Loudly", "Kindly", "Meanly"],
      correct: 1,
      emoji: "👫"
    }
  ];

  const handleQuizAnswer = (selectedAnswer: number) => {
    const question = quizQuestions[currentQuestion];
    if (selectedAnswer === question.correct) {
      setScore(score + 10);
      toast({
        title: "Great job! +10 points",
        description: "You know about good habits!"
      });
    } else {
      toast({
        title: "Try again!",
        description: "Think about what would be nice to do."
      });
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameMode("complete");
      }
    }, 2000);
  };

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setGameMode("good-habits")}>
        <CardHeader className="bg-gradient-to-r from-green-400 to-green-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <ThumbsUp className="w-8 h-8" />
            Good Habits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">Learn about wonderful habits that make you awesome!</p>
          <div className="text-4xl text-center mb-4">😊✨</div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setGameMode("bad-habits")}>
        <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <CardTitle className="flex items-center gap-3">
            <ThumbsDown className="w-8 h-8" />
            Things to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">Learn what habits we should try to change!</p>
          <div className="text-4xl text-center mb-4">🤔💭</div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setGameMode("quiz")}>
        <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <Star className="w-8 h-8" />
            Habits Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">Test what you've learned about good habits!</p>
          <div className="text-4xl text-center mb-4">🎯🏆</div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGoodHabits = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🌟 Good Habits 🌟</h2>
        <p className="text-lg text-gray-700">These are wonderful things to do every day!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goodHabits.map((habit, index) => (
          <Card key={index} className="border-2 border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{habit.emoji}</div>
                <h3 className="text-xl font-bold text-green-700">{habit.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-center">{habit.description}</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Tips:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  {habit.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center gap-2">
                      <span className="text-green-500">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBadHabits = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">🤔 Things to Change 🤔</h2>
        <p className="text-lg text-gray-700">Let's learn better ways to do things!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {badHabits.map((habit, index) => (
          <Card key={index} className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{habit.emoji}</div>
                <h3 className="text-xl font-bold text-orange-700">{habit.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-center">{habit.description}</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Better Way:</h4>
                <p className="text-blue-700 flex items-center gap-2">
                  <span className="text-blue-500">✨</span>
                  {habit.alternative}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (currentQuestion >= quizQuestions.length) {
      return (
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Great Job!</h2>
          <p className="text-xl text-gray-700 mb-6">You scored {score} points!</p>
          <Button onClick={() => {
            setGameMode("menu");
            setCurrentQuestion(0);
            setScore(0);
          }} className="bg-purple-600 hover:bg-purple-700">
            Play Again
          </Button>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="text-6xl mb-4">{question.emoji}</div>
            <CardTitle className="text-2xl text-purple-600">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  variant="outline"
                  className="w-full text-lg py-6 hover:bg-purple-100"
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    switch (gameMode) {
      case "good-habits":
        return renderGoodHabits();
      case "bad-habits":
        return renderBadHabits();
      case "quiz":
        return renderQuiz();
      default:
        return renderMenu();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
            🌟 Positive Actions 🌟
          </h1>
          <p className="text-xl text-gray-700">
            Learn about good habits and positive actions!
          </p>
          
          {gameMode !== "menu" && (
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white rounded-full px-4 py-2 shadow-md">
                <span className="text-purple-600 font-bold">Score: {score}</span>
              </div>
              <Button 
                onClick={() => {
                  setGameMode("menu");
                  setCurrentQuestion(0);
                }}
                variant="outline"
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </div>
          )}
        </div>

        {renderContent()}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto text-lg px-6 py-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PositiveActions;
