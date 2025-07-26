
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Star } from "lucide-react";

const SafetyAwareness = () => {
  const [currentScenario, setCurrentScenario] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const safetyScenarios = [
    {
      id: 1,
      title: "Crossing the Street",
      situation: "You want to cross the street to get to the playground. What should you do?",
      image: "🚦",
      options: [
        { id: 1, text: "Run across quickly when no cars are coming", safe: false, feedback: "Always use crosswalks and look both ways, even when no cars are visible!" },
        { id: 2, text: "Look both ways, use the crosswalk, and wait for the walk signal", safe: true, feedback: "Perfect! Always use crosswalks and follow traffic signals to stay safe!" },
        { id: 3, text: "Cross anywhere as long as you can see the other side", safe: false, feedback: "Only cross at designated crosswalks where drivers expect to see pedestrians!" }
      ]
    },
    {
      id: 2,
      title: "Stranger Danger",
      situation: "A person you don't know offers you candy and asks you to come to their car. What do you do?",
      image: "🍭",
      options: [
        { id: 1, text: "Say 'No thank you' loudly and run to find a trusted adult", safe: true, feedback: "Excellent! Never go with strangers and always find a trusted adult when you feel unsafe!" },
        { id: 2, text: "Take the candy but don't go to the car", safe: false, feedback: "Never take anything from strangers, even if it seems harmless!" },
        { id: 3, text: "Go with them if they seem nice", safe: false, feedback: "Never go anywhere with someone you don't know, no matter how nice they seem!" }
      ]
    },
    {
      id: 3,
      title: "Fire Safety",
      situation: "You smell smoke in your house. What should you do first?",
      image: "🔥",
      options: [
        { id: 1, text: "Look for the fire to see how big it is", safe: false, feedback: "Don't waste time looking for the fire - get out immediately and call for help!" },
        { id: 2, text: "Get out of the house immediately and call 911", safe: true, feedback: "Great job! In a fire emergency, get out first and call for help from a safe place!" },
        { id: 3, text: "Hide under your bed until someone finds you", safe: false, feedback: "Never hide during a fire - always get out and go to your family meeting place!" }
      ]
    },
    {
      id: 4,
      title: "Internet Safety",
      situation: "Someone online asks for your real name and address. What do you do?",
      image: "💻",
      options: [
        { id: 1, text: "Give them the information if they seem friendly", safe: false, feedback: "Never share personal information online, even with people who seem nice!" },
        { id: 2, text: "Don't share personal information and tell a trusted adult", safe: true, feedback: "Perfect! Keep personal information private and always tell an adult about strange requests!" },
        { id: 3, text: "Only give your first name", safe: false, feedback: "Don't share any personal information online - even your first name should stay private!" }
      ]
    }
  ];

  const handleAnswerClick = (optionId: number) => {
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    
    const currentScenarioData = safetyScenarios[currentScenario! - 1];
    const selectedOption = currentScenarioData.options.find(opt => opt.id === optionId);
    
    if (selectedOption?.safe) {
      setScore(prev => prev + 25);
    }
  };

  const nextScenario = () => {
    const nextId = (currentScenario || 0) + 1;
    if (nextId <= safetyScenarios.length) {
      setCurrentScenario(nextId);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCurrentScenario(null);
    }
  };

  const resetScenario = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (currentScenario) {
    const scenario = safetyScenarios[currentScenario - 1];
    if (!scenario) return null;

    const selectedOption = scenario.options.find(opt => opt.id === selectedAnswer);

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{scenario.title}</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg inline-block mb-6">
              <div className="text-8xl mb-4">{scenario.image}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-200 to-green-200 p-4 rounded-lg inline-block">
              <span className="text-2xl font-bold text-gray-800">Safety Score: {score} points 🛡️</span>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 mb-8 border-2">
            <CardContent className="p-8">
              <p className="text-xl text-gray-800 leading-relaxed font-medium text-center">
                {scenario.situation}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            {scenario.options.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedAnswer === option.id
                    ? option.safe 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => !showFeedback && handleAnswerClick(option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {selectedAnswer === option.id ? (
                        option.safe ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-red-500" />
                      ) : (
                        <Shield className="text-blue-500" />
                      )}
                    </div>
                    <p className="text-lg text-gray-800 flex-1">{option.text}</p>
                  </div>
                  {selectedAnswer === option.id && showFeedback && (
                    <div className={`mt-4 p-4 rounded-lg ${option.safe ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className={`font-medium ${option.safe ? 'text-green-800' : 'text-red-800'}`}>
                        {option.feedback}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {showFeedback && selectedOption?.safe && (
            <div className="bg-gradient-to-r from-green-200 to-blue-200 p-6 rounded-2xl text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Great Safety Choice! 🎉</h2>
              <p className="text-xl text-gray-700 mb-4">You know how to stay safe!</p>
              <Button onClick={nextScenario} className="bg-green-500 hover:bg-green-600">
                <Star className="w-4 h-4 mr-2" />
                {currentScenario < safetyScenarios.length ? "Next Scenario" : "Safety Expert!"}
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={() => setCurrentScenario(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Scenarios
            </Button>
            <Button onClick={resetScenario} className="bg-blue-500 hover:bg-blue-600">
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Safety Awareness 🛡️
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Learn how to stay safe in different situations!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {safetyScenarios.map((scenario) => (
            <Card key={scenario.id} className="bg-gradient-to-br from-red-100 to-orange-100 border-2 hover:shadow-xl transition-all cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{scenario.image}</div>
                <CardTitle className="text-xl text-gray-800">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm text-center">
                  Learn what to do in this safety situation
                </p>
                <div className="text-center">
                  <Button
                    onClick={() => setCurrentScenario(scenario.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Learn Safety!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🚨 Important Safety Rules 🚨
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👥 Trust Your Feelings</h4>
              <p>If something doesn't feel right, tell a trusted adult immediately!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">📞 Know Important Numbers</h4>
              <p>Remember 911 for emergencies and your parents' phone numbers!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🏃 Get Help Fast</h4>
              <p>In danger, get to safety first, then get help from adults!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🤫 Keep Personal Info Private</h4>
              <p>Never share your name, address, or school with strangers!</p>
            </div>
          </div>
        </div>

        <div className="text-center">
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

export default SafetyAwareness;
