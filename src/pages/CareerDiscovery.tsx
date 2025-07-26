
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Star, Play, Users, Heart, Code, Stethoscope } from "lucide-react";

const CareerDiscovery = () => {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const careerQuiz = [
    {
      question: "What do you enjoy doing most?",
      options: [
        { text: "Helping people solve problems", career: "teacher" },
        { text: "Building and fixing things", career: "engineer" },
        { text: "Taking care of animals", career: "veterinarian" },
        { text: "Drawing and creating art", career: "artist" }
      ]
    },
    {
      question: "Where would you like to work?",
      options: [
        { text: "In a hospital helping sick people", career: "doctor" },
        { text: "In an office with computers", career: "programmer" },
        { text: "Outside in nature", career: "scientist" },
        { text: "In a classroom with students", career: "teacher" }
      ]
    },
    {
      question: "What's your favorite subject?",
      options: [
        { text: "Math and numbers", career: "engineer" },
        { text: "Science and experiments", career: "scientist" },
        { text: "Art and creativity", career: "artist" },
        { text: "Reading and writing", career: "writer" }
      ]
    }
  ];

  const careers = [
    {
      name: "Doctor",
      icon: <Stethoscope className="w-8 h-8" />,
      description: "Help people feel better and stay healthy",
      dayInLife: [
        "Check on patients in the morning",
        "Diagnose illnesses and injuries", 
        "Prescribe medicine to help people feel better",
        "Talk with families about health",
        "Keep learning about new treatments"
      ],
      skills: ["Caring", "Smart", "Good listener", "Problem solver"],
      color: "bg-red-100"
    },
    {
      name: "Teacher",
      icon: <Users className="w-8 h-8" />,
      description: "Help kids learn and grow",
      dayInLife: [
        "Plan fun lessons for students",
        "Teach reading, math, and science",
        "Help students with homework",
        "Grade tests and assignments",
        "Meet with parents about progress"
      ],
      skills: ["Patient", "Creative", "Good communicator", "Organized"],
      color: "bg-blue-100"
    },
    {
      name: "Engineer",
      icon: <Code className="w-8 h-8" />,
      description: "Build and design amazing things",
      dayInLife: [
        "Design new buildings or machines",
        "Solve complex problems with math",
        "Test ideas and prototypes",
        "Work with a team on projects",
        "Use computers and special tools"
      ],
      skills: ["Problem solver", "Creative", "Good with math", "Detail-oriented"],
      color: "bg-green-100"
    },
    {
      name: "Artist",
      icon: <Heart className="w-8 h-8" />,
      description: "Create beautiful art and express creativity",
      dayInLife: [
        "Paint pictures or create digital art",
        "Design graphics for websites",
        "Create sculptures or crafts",
        "Meet with clients about projects",
        "Display art in galleries or online"
      ],
      skills: ["Creative", "Imaginative", "Detail-oriented", "Patient"],
      color: "bg-purple-100"
    }
  ];

  const activities = [
    {
      id: "quiz",
      title: "Career Discovery Quiz",
      description: "Answer questions to find careers that match your interests!",
      icon: <Star className="w-8 h-8" />,
      points: 25
    },
    {
      id: "dayInLife",
      title: "Day in the Life",
      description: "Explore what different professionals do every day",
      icon: <Play className="w-8 h-8" />,
      points: 20
    },
    {
      id: "skillsMatch",
      title: "Skills Matching",
      description: "Match your skills and interests to different careers",
      icon: <Briefcase className="w-8 h-8" />,
      points: 20
    }
  ];

  const handleQuizAnswer = (career: string) => {
    const newAnswers = [...quizAnswers, career];
    setQuizAnswers(newAnswers);
    
    if (currentQuestion < careerQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(score + 25);
      // Quiz complete - find most common career
      const careerCounts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const topCareer = Object.keys(careerCounts).reduce((a, b) => 
        careerCounts[a] > careerCounts[b] ? a : b
      );
      setSelectedCareer(topCareer);
    }
  };

  const resetActivity = () => {
    setCurrentActivity(null);
    setQuizAnswers([]);
    setCurrentQuestion(0);
    setSelectedCareer(null);
  };

  if (currentActivity === "quiz") {
    if (selectedCareer) {
      const matchedCareer = careers.find(c => c.name.toLowerCase() === selectedCareer);
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">🎉 Quiz Complete!</h1>
              <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                <span className="text-2xl font-bold text-purple-600">You earned {score} points!</span>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className={`${matchedCareer?.color} border-2 mb-8`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Your Top Career Match: {matchedCareer?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">{matchedCareer?.icon}</div>
                  <p className="text-gray-700 text-center text-lg">{matchedCareer?.description}</p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Skills you'll need:</h4>
                    <div className="flex flex-wrap gap-2">
                      {matchedCareer?.skills.map((skill, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Button onClick={() => setCurrentActivity("dayInLife")} className="bg-blue-500 hover:bg-blue-600">
                  Learn More About This Career
                </Button>
                <Button onClick={resetActivity} variant="outline">
                  Back to Activities
                </Button>
              </div>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Career Discovery Quiz</h1>
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-purple-600">Question {currentQuestion + 1} of {careerQuiz.length}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{careerQuiz[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerQuiz[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuizAnswer(option.career)}
                    className="w-full p-4 text-left bg-purple-100 hover:bg-purple-200 text-gray-800"
                    variant="outline"
                  >
                    {option.text}
                  </Button>
                ))}
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

  if (currentActivity === "dayInLife") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">👨‍💼 A Day in the Life</h1>
            <p className="text-xl text-gray-700">Choose a career to explore what they do every day!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {careers.map((career, index) => (
              <Card key={index} className={`${career.color} border-2 hover:shadow-xl transition-all cursor-pointer`}>
                <CardHeader className="text-center">
                  <div className="mb-4">{career.icon}</div>
                  <CardTitle className="text-xl text-gray-800">{career.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-center">{career.description}</p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Daily Tasks:</h4>
                    <ul className="text-sm space-y-1">
                      {career.dayInLife.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => setScore(score + 20)}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    I want to learn about this! (+20 points)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button onClick={resetActivity} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activities
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (currentActivity === "skillsMatch") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">🎯 Skills Matching Game</h1>
            <p className="text-xl text-gray-700">Match these skills to the right careers!</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Skills & Interests</h3>
                <div className="space-y-2">
                  {["Good at math", "Love helping people", "Creative and artistic", "Enjoy solving problems", "Like working with hands", "Good communicator"].map((skill, index) => (
                    <div key={index} className="bg-yellow-100 p-3 rounded-lg border-2 border-dashed border-yellow-300">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Careers</h3>
                <div className="space-y-4">
                  {careers.map((career, index) => (
                    <Card key={index} className={`${career.color} p-4`}>
                      <div className="flex items-center gap-3">
                        {career.icon}
                        <div>
                          <h4 className="font-bold">{career.name}</h4>
                          <p className="text-sm text-gray-600">{career.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => setScore(score + 20)}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Complete Skills Matching! (+20 points)
              </Button>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={resetActivity} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activities
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Career Discovery 💼
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Explore amazing careers and discover what you want to be when you grow up!
          </p>
          {score > 0 && (
            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
              <span className="text-2xl font-bold text-purple-600">Your Score: {score} points! 🌟</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {activities.map((activity) => (
            <Card key={activity.id} className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 hover:shadow-xl transition-all cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-purple-600 mb-4">{activity.icon}</div>
                <CardTitle className="text-xl text-gray-800">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">{activity.description}</p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentActivity(activity.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start! (+{activity.points} points)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🌟 Explore Different Careers! 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careers.map((career, index) => (
              <div key={index} className={`${career.color} p-4 rounded-lg`}>
                <div className="text-center mb-2">{career.icon}</div>
                <h4 className="font-bold mb-2">{career.name}</h4>
                <p className="text-sm">{career.description}</p>
              </div>
            ))}
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

export default CareerDiscovery;
