
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodingLesson = () => {
  const { lessonId } = useParams();
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const lessons = {
    "1": {
      title: "What is Coding?",
      description: "Learn the basics of computer programming",
      difficulty: "Beginner",
      duration: "5 mins",
      slides: [
        {
          title: "Welcome to Coding!",
          content: "Coding is like giving instructions to a computer. Just like how you follow a recipe to bake cookies, computers need step-by-step instructions to do tasks!",
          example: "Example: To make a sandwich, you need steps like:\n1. Get bread\n2. Add peanut butter\n3. Add jelly\n4. Put bread slices together"
        },
        {
          title: "Computers Are Everywhere!",
          content: "Computers are in phones, games, cars, and even smart TVs! They all need instructions (code) to work properly.",
          example: "When you play a game on your phone, code tells the game:\n- How to move characters\n- When to play sounds\n- How to keep score"
        },
        {
          title: "Why Learn Coding?",
          content: "Coding helps you think logically, solve problems, and create amazing things! You can make games, websites, apps, and even control robots!",
          example: "With coding, you could create:\n🎮 Your own video game\n🌐 A website about your hobbies\n🤖 A robot that follows commands"
        }
      ]
    },
    "2": {
      title: "Sequences & Steps",
      description: "Understanding order and sequences",
      difficulty: "Beginner",
      duration: "8 mins",
      slides: [
        {
          title: "What is a Sequence?",
          content: "A sequence is doing things in the right order. In coding, the order of instructions is very important!",
          example: "Getting ready for school:\n1. Wake up\n2. Brush teeth\n3. Eat breakfast\n4. Get dressed\n5. Go to school"
        },
        {
          title: "Why Order Matters",
          content: "If you do things in the wrong order, you might not get the result you want. Computers follow instructions exactly as you give them!",
          example: "Wrong order:\n1. Get dressed\n2. Take a shower ❌\n\nRight order:\n1. Take a shower\n2. Get dressed ✅"
        },
        {
          title: "Sequences in Code",
          content: "In programming, we write instructions line by line. The computer reads from top to bottom, following each step carefully.",
          example: "Code sequence:\nLine 1: Turn on the light\nLine 2: Open the door\nLine 3: Walk forward\nLine 4: Say 'Hello!'"
        }
      ]
    },
    "3": {
      title: "Loops & Repetition",
      description: "Making computers repeat actions",
      difficulty: "Intermediate",
      duration: "10 mins",
      slides: [
        {
          title: "What is a Loop?",
          content: "A loop is when we want to do the same thing over and over again. Instead of writing the same instruction many times, we use loops!",
          example: "Instead of writing:\n- Clap hands\n- Clap hands\n- Clap hands\n- Clap hands\n- Clap hands\n\nWe write:\nRepeat 5 times: Clap hands"
        },
        {
          title: "Loops Save Time",
          content: "Loops make our code shorter and easier to understand. They're perfect for repetitive tasks!",
          example: "Drawing 10 circles:\nWithout loop: Draw circle (written 10 times)\nWith loop: Repeat 10 times: Draw circle"
        },
        {
          title: "Different Types of Loops",
          content: "There are different ways to repeat things. Sometimes we know exactly how many times, sometimes we repeat until something happens.",
          example: "Count loop: Repeat 3 times\nCondition loop: Repeat until you reach the end\nForever loop: Keep repeating forever"
        }
      ]
    },
    "4": {
      title: "If-Then Logic",
      description: "Making decisions in code",
      difficulty: "Intermediate",
      duration: "12 mins",
      slides: [
        {
          title: "What is If-Then Logic?",
          content: "If-Then logic helps computers make decisions. It's like saying 'IF something is true, THEN do this action.'",
          example: "IF it's raining, THEN take an umbrella\nIF you're hungry, THEN eat food\nIF it's bedtime, THEN go to sleep"
        },
        {
          title: "Conditions and Actions",
          content: "Every If-Then statement has two parts: a condition (the IF part) and an action (the THEN part).",
          example: "IF the light is green, THEN cross the street\nIF your score is 100, THEN you win the game\nIF the door is closed, THEN open it"
        },
        {
          title: "Multiple Choices",
          content: "Sometimes we have more than two choices. We can use IF-THEN-ELSE to handle different situations.",
          example: "IF it's sunny, THEN wear shorts\nELSE IF it's raining, THEN wear a raincoat\nELSE wear regular clothes"
        }
      ]
    }
  };

  const currentLesson = lessons[lessonId as keyof typeof lessons];

  useEffect(() => {
    if (!currentLesson) {
      toast({
        title: "Lesson not found",
        description: "This lesson doesn't exist.",
        variant: "destructive"
      });
    }
  }, [lessonId, currentLesson, toast]);

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Lesson Not Found</h1>
          <Link to="/coding">
            <Button>Back to Coding</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nextSlide = () => {
    if (currentSlide < currentLesson.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const completeLesson = () => {
    setIsCompleted(true);
    toast({
      title: "Lesson Complete! 🎉",
      description: "Great job! You've earned 10 coding points!",
    });
  };

  const currentSlideData = currentLesson.slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/coding">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Coding
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {currentLesson.title}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{currentLesson.description}</p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline">{currentLesson.difficulty}</Badge>
            <Badge variant="outline">{currentLesson.duration}</Badge>
            <Badge variant="outline">
              Slide {currentSlide + 1} of {currentLesson.slides.length}
            </Badge>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              {currentSlideData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentSlideData.content}
              </p>
              
              {currentSlideData.example && (
                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-gray-800 mb-2">Example:</h4>
                  <pre className="text-sm text-gray-700 whitespace-pre-line font-mono">
                    {currentSlideData.example}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {currentLesson.slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-purple-500 scale-125'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentSlide < currentLesson.slides.length - 1 ? (
                <Button
                  onClick={nextSlide}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={completeLesson}
                  disabled={isCompleted}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isCompleted ? 'Completed!' : 'Complete Lesson'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isCompleted && (
          <div className="text-center mt-8">
            <Card className="max-w-md mx-auto bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Lesson Complete!</h3>
                <p className="text-green-700 mb-4">You've earned 10 coding points!</p>
                <Link to="/coding">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Back to Lessons
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CodingLesson;
