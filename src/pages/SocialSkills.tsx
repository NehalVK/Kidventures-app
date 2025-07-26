
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Heart, MessageCircle, HandHeart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SocialSkills = () => {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  const scenarios = [
    {
      id: 1,
      title: "Making New Friends",
      emoji: "👋",
      description: "Learn how to approach and make new friends",
      difficulty: "easy",
      steps: [
        {
          situation: "You see a kid playing alone at the playground",
          question: "What's the best way to approach them?",
          options: [
            { text: "Say 'Hi! Can I play with you?'", correct: true, explanation: "This is friendly and direct!" },
            { text: "Take their toy without asking", correct: false, explanation: "This might make them upset" },
            { text: "Just stare at them", correct: false, explanation: "This might make them uncomfortable" }
          ]
        },
        {
          situation: "The new kid says yes and you start playing together",
          question: "How do you keep the conversation going?",
          options: [
            { text: "Ask about their favorite games", correct: true, explanation: "Great way to find common interests!" },
            { text: "Only talk about yourself", correct: false, explanation: "Good friends listen to each other" },
            { text: "Stay quiet the whole time", correct: false, explanation: "Conversation helps build friendships" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Sharing and Taking Turns",
      emoji: "🤝",
      description: "Practice sharing toys and taking turns",
      difficulty: "easy",
      steps: [
        {
          situation: "Your friend wants to play with your favorite toy",
          question: "What should you do?",
          options: [
            { text: "Share it and take turns", correct: true, explanation: "Sharing makes friendships stronger!" },
            { text: "Hide the toy", correct: false, explanation: "This might hurt your friend's feelings" },
            { text: "Never let them play with it", correct: false, explanation: "Good friends share with each other" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Handling Disagreements",
      emoji: "🤔",
      description: "Learn to solve problems peacefully",
      difficulty: "medium",
      steps: [
        {
          situation: "You and your friend disagree about which game to play",
          question: "How can you solve this problem?",
          options: [
            { text: "Take turns choosing games", correct: true, explanation: "Compromise is a great solution!" },
            { text: "Get angry and walk away", correct: false, explanation: "This doesn't solve the problem" },
            { text: "Insist on only your choice", correct: false, explanation: "Being flexible helps friendships" }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Showing Empathy",
      emoji: "💝",
      description: "Learn to understand others' feelings",
      difficulty: "medium",
      steps: [
        {
          situation: "Your classmate looks sad because they lost their lunch money",
          question: "How can you show empathy?",
          options: [
            { text: "Ask if they're okay and offer to share your lunch", correct: true, explanation: "Showing care helps others feel better!" },
            { text: "Ignore them completely", correct: false, explanation: "Friends care about each other's feelings" },
            { text: "Laugh at their problem", correct: false, explanation: "This would hurt their feelings more" }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Being a Good Listener",
      emoji: "👂",
      description: "Practice active listening skills",
      difficulty: "hard",
      steps: [
        {
          situation: "Your friend is telling you about their exciting weekend",
          question: "How do you show you're listening?",
          options: [
            { text: "Look at them, nod, and ask questions", correct: true, explanation: "Active listening shows you care!" },
            { text: "Play with your phone while they talk", correct: false, explanation: "This shows you're not interested" },
            { text: "Interrupt to talk about yourself", correct: false, explanation: "Good listeners let others finish" }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (option: any) => {
    if (option.correct) {
      setPoints(points + 15);
      toast({
        title: "Great job! +15 points",
        description: option.explanation
      });
    } else {
      toast({
        title: "Try again!",
        description: option.explanation,
        variant: "destructive"
      });
    }

    // Move to next step or complete scenario
    setTimeout(() => {
      if (currentStep < selectedScenario.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        toast({
          title: "Scenario Complete!",
          description: "You've learned important social skills!"
        });
        setSelectedScenario(null);
        setCurrentStep(0);
      }
    }, 2000);
  };

  const renderScenarioList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenarios.map((scenario) => (
        <Card
          key={scenario.id}
          className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl border-2 hover:border-blue-300"
          onClick={() => setSelectedScenario(scenario)}
        >
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{scenario.emoji}</div>
            <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {scenario.difficulty}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">{scenario.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderScenario = () => {
    const currentScenarioStep = selectedScenario.steps[currentStep];
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => {
              setSelectedScenario(null);
              setCurrentStep(0);
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scenarios
          </Button>
          <div className="text-6xl">{selectedScenario.emoji}</div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="text-2xl text-center">{selectedScenario.title}</CardTitle>
            <p className="text-center text-blue-100">
              Step {currentStep + 1} of {selectedScenario.steps.length}
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-blue-800">Situation:</h3>
                <p className="text-lg text-gray-700">{currentScenarioStep.situation}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-purple-800">{currentScenarioStep.question}</h3>
                <div className="space-y-3">
                  {currentScenarioStep.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className="w-full text-left p-4 h-auto hover:bg-purple-50 border-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Social Skills Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👀 Make Eye Contact</h4>
              <p>Looking at people shows you're interested in them</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">😊 Smile Often</h4>
              <p>Smiling makes you approachable and friendly</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🗣️ Use Kind Words</h4>
              <p>Say please, thank you, and excuse me</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🤝 Be Helpful</h4>
              <p>Offer to help when someone needs it</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🤝 Social Skills Practice
          </h1>
          <p className="text-xl text-gray-700">
            Learn how to be a great friend and communicate well with others!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-4">
            <span className="text-lg font-semibold text-pink-600">
              Points Earned: {points} ⭐
            </span>
          </div>
        </div>

        {selectedScenario ? renderScenario() : renderScenarioList()}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto text-lg px-6 py-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SocialSkills;
