import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Code, 
  Lightbulb, 
  Target, 
  Puzzle, 
  Gamepad2,
  Brain,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CodeBlockBuilder from "../components/coding/CodeBlockBuilder";
import SequenceGame from "../components/coding/SequenceGame";
import AlgorithmVisualizer from "../components/coding/AlgorithmVisualizer";

const IntroCoding = () => {
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "What is Coding?",
      description: "Learn the basics of computer programming",
      difficulty: "Beginner",
      duration: "5 mins",
      content: "Coding is like giving instructions to a computer. Just like how you follow a recipe to bake cookies, computers need step-by-step instructions to do tasks!"
    },
    {
      id: 2,
      title: "Sequences & Steps",
      description: "Understanding order and sequences",
      difficulty: "Beginner", 
      duration: "8 mins",
      content: "In coding, the order of instructions matters! Let's learn how to put steps in the right sequence."
    },
    {
      id: 3,
      title: "Loops & Repetition",
      description: "Making computers repeat actions",
      difficulty: "Intermediate",
      duration: "10 mins", 
      content: "Sometimes we want computers to do the same thing over and over. That's called a loop!"
    },
    {
      id: 4,
      title: "If-Then Logic",
      description: "Making decisions in code",
      difficulty: "Intermediate",
      duration: "12 mins",
      content: "Computers can make decisions! We use 'if-then' statements to tell computers what to do in different situations."
    }
  ];

  const codingConcepts = [
    {
      title: "Algorithm",
      definition: "A set of step-by-step instructions to solve a problem",
      example: "Recipe for making a sandwich",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Sequence",
      definition: "The order in which instructions are executed",
      example: "First brush teeth, then put on pajamas, then go to bed",
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      title: "Loop",
      definition: "Instructions that repeat multiple times",
      example: "Clap your hands 10 times",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Conditional",
      definition: "Instructions that only happen IF something is true",
      example: "IF it's raining, THEN take an umbrella",
      icon: <Puzzle className="w-6 h-6" />
    }
  ];

  const startCodingChallenge = (challengeType: string) => {
    const challengeRoutes = {
      "Maze Runner": "maze-runner",
      "Pattern Maker": "pattern-maker", 
      "Logic Puzzles": "logic-puzzles"
    };
    
    const challengeId = challengeRoutes[challengeType as keyof typeof challengeRoutes];
    
    if (challengeId) {
      toast({
        title: `Starting ${challengeType} Challenge! 🚀`,
        description: "Let's put your coding skills to the test!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Intro to Coding 💻
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Learn programming basics through fun, interactive activities!
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge variant="outline" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Ages 11-15
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Code className="w-4 h-4 mr-2" />
              No Experience Needed
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {lessons.map((lesson, index) => (
                <Card key={lesson.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle className="w-5 h-5 text-green-300" />
                          )}
                          Lesson {lesson.id}
                        </CardTitle>
                        <h3 className="text-xl font-bold">{lesson.title}</h3>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{lesson.description}</p>
                    <p className="text-sm text-gray-700 mb-4">{lesson.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">⏱️ {lesson.duration}</span>
                      <Link to={`/coding/lesson/${lesson.id}`}>
                        <Button className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Start Lesson
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concepts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codingConcepts.map((concept, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                      {concept.icon}
                      {concept.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4 font-medium">{concept.definition}</p>
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> {concept.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle>Block Code Builder</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <CodeBlockBuilder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle>Sequence Game</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SequenceGame />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-t-lg">
                <CardTitle>Algorithm Visualizer</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AlgorithmVisualizer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5" />
                    Maze Runner
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Program a character to navigate through a maze using basic commands.</p>
                  <Link to="/coding/challenge/maze-runner">
                    <Button 
                      onClick={() => startCodingChallenge("Maze Runner")}
                      className="w-full"
                    >
                      Start Challenge
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Puzzle className="w-5 h-5" />
                    Pattern Maker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Use loops to create colorful patterns and designs.</p>
                  <Link to="/coding/challenge/pattern-maker">
                    <Button 
                      onClick={() => startCodingChallenge("Pattern Maker")}
                      className="w-full"
                    >
                      Start Challenge
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Logic Puzzles
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">Solve problems using if-then logic and conditions.</p>
                  <Link to="/coding/challenge/logic-puzzles">
                    <Button 
                      onClick={() => startCodingChallenge("Logic Puzzles")}
                      className="w-full"
                    >
                      Start Challenge
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IntroCoding;
