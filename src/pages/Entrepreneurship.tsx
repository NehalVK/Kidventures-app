import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, DollarSign, TrendingUp, Users, Star, Play } from "lucide-react";

const Entrepreneurship = () => {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [lemonadeStats, setLemonadeStats] = useState({
    money: 20,
    cups: 0,
    day: 1,
    weather: "sunny"
  });
  const [businessIdeas, setBusinessIdeas] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [budgetChallenge, setBudgetChallenge] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    currentStep: 0
  });
  const [score, setScore] = useState(0);

  const activities = [
    {
      id: "ideaGenerator",
      title: "Business Idea Generator",
      description: "Brainstorm creative business ideas to solve problems!",
      icon: <Lightbulb className="w-8 h-8" />,
      points: 30,
      color: "bg-yellow-100"
    },
    {
      id: "lemonadeStand",
      title: "Lemonade Stand Simulator",
      description: "Run your own virtual lemonade business!",
      icon: <DollarSign className="w-8 h-8" />,
      points: 40,
      color: "bg-green-100"
    },
    {
      id: "budgetPlanning",
      title: "Budget Planning Game",
      description: "Learn to manage money and calculate profits!",
      icon: <TrendingUp className="w-8 h-8" />,
      points: 35,
      color: "bg-blue-100"
    },
    {
      id: "pitchPractice",
      title: "Pitch Your Idea",
      description: "Practice presenting your business ideas!",
      icon: <Users className="w-8 h-8" />,
      points: 25,
      color: "bg-purple-100"
    }
  ];

  const businessPrompts = [
    "What problem do you see at school that needs solving?",
    "How could you help your neighbors or community?",
    "What would make pets happier and healthier?",
    "How could you help kids learn better?",
    "What would make the environment cleaner?",
    "How could you help elderly people in your community?"
  ];

  const budgetScenarios = [
    {
      title: "Dog Walking Service",
      description: "You want to start walking dogs in your neighborhood",
      revenue: 15,
      expenses: 5,
      items: ["Dog treats: $3", "Leashes: $2"]
    },
    {
      title: "Tutoring Younger Kids",
      description: "Help younger students with homework",
      revenue: 20,
      expenses: 3,
      items: ["School supplies: $3"]
    },
    {
      title: "Handmade Jewelry Business",
      description: "Make and sell friendship bracelets",
      revenue: 25,
      expenses: 10,
      items: ["Beads and string: $8", "Display materials: $2"]
    }
  ];

  const handleLemonadeDay = (cupsToMake: number, pricePerCup: number) => {
    const cost = cupsToMake * 0.5;
    const revenue = cupsToMake * pricePerCup;
    const profit = revenue - cost;
    
    setLemonadeStats(prev => ({
      ...prev,
      money: prev.money + profit,
      cups: prev.cups + cupsToMake,
      day: prev.day + 1
    }));
    
    setScore(score + 10);
  };

  const addBusinessIdea = (idea: string) => {
    if (idea.trim()) {
      setBusinessIdeas([...businessIdeas, idea]);
      setScore(score + 5);
      if (currentPromptIndex < businessPrompts.length - 1) {
        setCurrentPromptIndex(currentPromptIndex + 1);
      }
    }
  };

  const resetActivity = () => {
    setCurrentActivity(null);
    setCurrentPromptIndex(0);
    setBudgetChallenge({ revenue: 0, expenses: 0, profit: 0, currentStep: 0 });
  };

  if (currentActivity === "ideaGenerator") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">💡 Business Idea Generator</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-yellow-600">Ideas Generated: {businessIdeas.length}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-yellow-100 mb-6">
              <CardHeader>
                <CardTitle className="text-center">💭 Think About This:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-center text-gray-700 mb-4">
                  {businessPrompts[currentPromptIndex]}
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Type your business idea here..."
                    className="w-full p-3 border-2 border-yellow-300 rounded-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addBusinessIdea(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                      if (input) {
                        addBusinessIdea(input.value);
                        input.value = '';
                      }
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Add My Idea! (+5 points)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {businessIdeas.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>🌟 Your Amazing Ideas:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {businessIdeas.map((idea, index) => (
                      <div key={index} className="bg-green-100 p-3 rounded-lg border-l-4 border-green-500">
                        <span className="font-bold">Idea #{index + 1}:</span> {idea}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setCurrentPromptIndex(Math.floor(Math.random() * businessPrompts.length))}
                className="bg-blue-500 hover:bg-blue-600"
              >
                New Prompt
              </Button>
              <Button onClick={resetActivity} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentActivity === "budgetPlanning") {
    const scenario = budgetScenarios[budgetChallenge.currentStep];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">📊 Budget Planning Game</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-blue-600">Scenario {budgetChallenge.currentStep + 1} of {budgetScenarios.length}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-blue-100 mb-6">
              <CardHeader>
                <CardTitle className="text-center">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-700">{scenario.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">💰 Revenue (Money In)</h4>
                    <p className="text-2xl font-bold text-green-600">${scenario.revenue}</p>
                  </div>
                  
                  <div className="bg-red-100 p-4 rounded-lg">
                    <h4 className="font-bold text-red-700 mb-2">💸 Expenses (Money Out)</h4>
                    <div className="space-y-1">
                      {scenario.items.map((item, index) => (
                        <p key={index} className="text-sm">{item}</p>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-red-600">${scenario.expenses}</p>
                  </div>
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <h4 className="font-bold text-yellow-700 mb-2">🎯 Your Profit</h4>
                  <p className="text-3xl font-bold text-yellow-600">
                    ${scenario.revenue - scenario.expenses}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Revenue (${scenario.revenue}) - Expenses (${scenario.expenses}) = Profit
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setScore(score + 15);
                    if (budgetChallenge.currentStep < budgetScenarios.length - 1) {
                      setBudgetChallenge(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
                    } else {
                      setScore(score + 20); // Bonus for completing all scenarios
                    }
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {budgetChallenge.currentStep < budgetScenarios.length - 1 ? 
                    "Next Scenario! (+15 points)" : 
                    "Complete Challenge! (+35 points total)"
                  }
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetActivity} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentActivity === "pitchPractice") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🎤 Pitch Practice</h1>
            <p className="text-xl text-gray-700">Practice presenting your business ideas!</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-purple-100 mb-6">
              <CardHeader>
                <CardTitle className="text-center">🌟 How to Give a Great Pitch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-bold text-purple-700">1. What's the Problem?</h4>
                    <p className="text-sm">Explain what problem your business solves</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-bold text-purple-700">2. What's Your Solution?</h4>
                    <p className="text-sm">Describe your product or service</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-bold text-purple-700">3. Who Will Buy It?</h4>
                    <p className="text-sm">Talk about your customers</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-bold text-purple-700">4. How Will You Make Money?</h4>
                    <p className="text-sm">Explain your business model</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center">🎯 Practice Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "What problem does your business solve?",
                  "Who are your customers?",
                  "How is your idea different from others?",
                  "How much money do you think you can make?"
                ].map((question, index) => (
                  <div key={index} className="bg-pink-100 p-4 rounded-lg">
                    <p className="font-bold text-pink-700 mb-2">Question {index + 1}:</p>
                    <p className="mb-3">{question}</p>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      placeholder="Write your answer here..."
                    />
                  </div>
                ))}
                
                <Button
                  onClick={() => setScore(score + 25)}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  Complete Pitch Practice! (+25 points)
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={resetActivity} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentActivity === "lemonadeStand") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🍋 Lemonade Stand Business</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-green-600">Day {lemonadeStats.day} | Money: ${lemonadeStats.money.toFixed(2)}</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-yellow-100">
                <CardHeader>
                  <CardTitle className="text-center">☀️ Today's Weather: {lemonadeStats.weather}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-700">
                    {lemonadeStats.weather === "sunny" ? "Perfect weather for lemonade! 🌞" : "Might be slow today ☁️"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-100">
                <CardHeader>
                  <CardTitle className="text-center">📊 Your Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>💰 Total Money: ${lemonadeStats.money.toFixed(2)}</p>
                    <p>🥤 Cups Sold: {lemonadeStats.cups}</p>
                    <p>📅 Days in Business: {lemonadeStats.day - 1}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center">Make Your Business Decisions!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleLemonadeDay(10, 1.0)}
                    className="bg-yellow-500 hover:bg-yellow-600 p-6 h-auto flex-col"
                  >
                    <span className="text-lg font-bold">Make 10 cups</span>
                    <span className="text-sm">Sell at $1.00 each</span>
                    <span className="text-xs">Cost: $5.00, Potential: $10.00</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleLemonadeDay(20, 0.75)}
                    className="bg-orange-500 hover:bg-orange-600 p-6 h-auto flex-col"
                  >
                    <span className="text-lg font-bold">Make 20 cups</span>
                    <span className="text-sm">Sell at $0.75 each</span>
                    <span className="text-xs">Cost: $10.00, Potential: $15.00</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => setCurrentActivity(null)} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            Entrepreneurship for Kids 🚀
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Learn to be a young entrepreneur and start your own business adventures!
          </p>
          {score > 0 && (
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-green-600">Your Score: {score} points! 🌟</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {activities.map((activity) => (
            <Card key={activity.id} className={`${activity.color} border-2 hover:shadow-xl transition-all cursor-pointer`}>
              <CardHeader className="text-center">
                <div className="text-gray-700 mb-4">{activity.icon}</div>
                <CardTitle className="text-xl text-gray-800">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">{activity.description}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentActivity(activity.id)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start! (+{activity.points} points)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            💡 What Makes a Great Entrepreneur? 💡
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🔍 Problem Solver</h4>
              <p>Great entrepreneurs find problems and create solutions!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">💪 Never Give Up</h4>
              <p>They keep trying even when things get difficult!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎯 Creative Thinking</h4>
              <p>They think of new and exciting ways to do things!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🤝 Help Others</h4>
              <p>The best businesses help make people's lives better!</p>
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

export default Entrepreneurship;
