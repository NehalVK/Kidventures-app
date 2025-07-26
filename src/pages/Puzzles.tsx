
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Puzzles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [puzzleType, setPuzzleType] = useState<"math" | "words" | "riddles" | "trivia">("math");
  const [ageGroup, setAgeGroup] = useState<"5-7" | "8-10" | "11-15">("5-7");

  const puzzlesByType = {
    math: {
      easy: {
        "5-7": [
          {
            id: 1,
            title: "Math Magic",
            question: "What is 2 + 3?",
            options: ["4", "5", "6", "7"],
            answer: "5",
            points: 5
          },
          {
            id: 2,
            title: "Math Challenge",
            question: "What is 4 - 1?",
            options: ["1", "2", "3", "5"],
            answer: "3",
            points: 5
          },
        ],
        "8-10": [
          {
            id: 3,
            title: "Math Magic",
            question: "What is 5 + 7?",
            options: ["10", "12", "15", "11"],
            answer: "12",
            points: 5
          },
          {
            id: 4,
            title: "Math Challenge",
            question: "What is 8 - 3?",
            options: ["3", "4", "5", "6"],
            answer: "5",
            points: 5
          },
        ],
        "11-15": [
          {
            id: 5,
            title: "Math Magic",
            question: "What is 9 + 8?",
            options: ["15", "16", "17", "18"],
            answer: "17",
            points: 5
          },
          {
            id: 6,
            title: "Math Challenge",
            question: "What is 14 - 6?",
            options: ["6", "7", "8", "9"],
            answer: "8",
            points: 5
          },
        ],
      },
      medium: {
        "5-7": [
          {
            id: 7,
            title: "Math Whiz",
            question: "What is 2 × 3?",
            options: ["4", "5", "6", "7"],
            answer: "6",
            points: 10
          },
          {
            id: 8,
            title: "Number Fun",
            question: "What is 10 ÷ 2?",
            options: ["3", "4", "5", "6"],
            answer: "5",
            points: 10
          },
        ],
        "8-10": [
          {
            id: 9,
            title: "Math Whiz",
            question: "What is 6 × 7?",
            options: ["36", "42", "48", "54"],
            answer: "42",
            points: 10
          },
          {
            id: 10,
            title: "Number Fun",
            question: "What is 25 ÷ 5?",
            options: ["4", "5", "6", "7"],
            answer: "5",
            points: 10
          },
        ],
        "11-15": [
          {
            id: 11,
            title: "Math Whiz",
            question: "What is 8 × 9?",
            options: ["63", "72", "81", "90"],
            answer: "72",
            points: 10
          },
          {
            id: 12,
            title: "Number Fun",
            question: "What is 49 ÷ 7?",
            options: ["5", "6", "7", "8"],
            answer: "7",
            points: 10
          },
        ],
      },
      hard: {
        "5-7": [
          {
            id: 13,
            title: "Math Expert",
            question: "If you have 3 toys and get 5 more, how many do you have?",
            options: ["7", "8", "9", "10"],
            answer: "8",
            points: 15
          },
          {
            id: 14,
            title: "Math Master",
            question: "If you share 12 candies with 3 friends equally, how many does each get?",
            options: ["3", "4", "5", "6"],
            answer: "4",
            points: 15
          },
        ],
        "8-10": [
          {
            id: 15,
            title: "Math Expert",
            question: "If 3x - 7 = 14, what is x?",
            options: ["5", "7", "9", "11"],
            answer: "7",
            points: 15
          },
          {
            id: 16,
            title: "Math Master",
            question: "What is 15% of 80?",
            options: ["8", "12", "15", "18"],
            answer: "12",
            points: 15
          },
        ],
        "11-15": [
          {
            id: 17,
            title: "Math Expert",
            question: "Solve for x: 2x² - 5x - 3 = 0",
            options: ["x = 3, x = -0.5", "x = 3, x = 0.5", "x = -3, x = 0.5", "x = -3, x = -0.5"],
            answer: "x = 3, x = -0.5",
            points: 15
          },
          {
            id: 18,
            title: "Math Master",
            question: "What is the value of log₁₀(100)?",
            options: ["1", "2", "10", "100"],
            answer: "2",
            points: 15
          },
        ],
      },
    },
    words: {
      easy: {
        "5-7": [
          {
            id: 19,
            title: "Letter Fun",
            question: "Which word starts with the letter 'C'?",
            options: ["Apple", "Ball", "Cat", "Dog"],
            answer: "Cat",
            points: 5
          },
          {
            id: 20,
            title: "Word Play",
            question: "Which word means the opposite of 'big'?",
            options: ["Small", "Tall", "Wide", "Short"],
            answer: "Small",
            points: 5
          },
        ],
        "8-10": [
          {
            id: 21,
            title: "Letter Fun",
            question: "Which word starts with the letter 'B'?",
            options: ["Apple", "Ball", "Cat", "Dog"],
            answer: "Ball",
            points: 5
          },
          {
            id: 22,
            title: "Word Play",
            question: "Which word means the opposite of 'hot'?",
            options: ["Warm", "Cold", "Boiling", "Burning"],
            answer: "Cold",
            points: 5
          },
        ],
        "11-15": [
          {
            id: 23,
            title: "Letter Fun",
            question: "Which word starts with the letter 'A' and means 'without sound'?",
            options: ["Active", "Audible", "Acrobat", "Acoustic"],
            answer: "Acoustic",
            points: 5
          },
          {
            id: 24,
            title: "Word Play",
            question: "Which word means the opposite of 'visible'?",
            options: ["Invisible", "Transparent", "Clear", "Hidden"],
            answer: "Invisible",
            points: 5
          },
        ],
      },
      medium: {
        "5-7": [
          {
            id: 25,
            title: "Spelling Bee",
            question: "Which word is spelled correctly?",
            options: ["Helo", "Hello", "Hallo", "Hullo"],
            answer: "Hello",
            points: 10
          },
          {
            id: 26,
            title: "Vocabulary",
            question: "What does 'happy' mean?",
            options: ["Sad", "Angry", "Joyful", "Tired"],
            answer: "Joyful",
            points: 10
          },
        ],
        "8-10": [
          {
            id: 27,
            title: "Spelling Bee",
            question: "Which word is spelled correctly?",
            options: ["Recieve", "Receive", "Receve", "Reciave"],
            answer: "Receive",
            points: 10
          },
          {
            id: 28,
            title: "Vocabulary",
            question: "What does 'enormous' mean?",
            options: ["Very small", "Very old", "Very large", "Very young"],
            answer: "Very large",
            points: 10
          },
        ],
        "11-15": [
          {
            id: 29,
            title: "Spelling Bee",
            question: "Which word is spelled correctly?",
            options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
            answer: "Accommodate",
            points: 10
          },
          {
            id: 30,
            title: "Vocabulary",
            question: "What does 'benevolent' mean?",
            options: ["Generous", "Malicious", "Bewildered", "Cautious"],
            answer: "Generous",
            points: 10
          },
        ],
      },
      hard: {
        "5-7": [
          {
            id: 31,
            title: "Word Expert",
            question: "What does 'tiny' mean?",
            options: ["Very big", "Very small", "Very loud", "Very quiet"],
            answer: "Very small",
            points: 15
          },
          {
            id: 32,
            title: "Word Master",
            question: "Which is a synonym for 'Happy'?",
            options: ["Sad", "Angry", "Joyful", "Tired"],
            answer: "Joyful",
            points: 15
          },
        ],
        "8-10": [
          {
            id: 33,
            title: "Word Expert",
            question: "What does 'Ubiquitous' mean?",
            options: ["Rare", "Found everywhere", "Ancient", "Funny"],
            answer: "Found everywhere",
            points: 15
          },
          {
            id: 34,
            title: "Word Master",
            question: "Which is a synonym for 'Happy'?",
            options: ["Sad", "Angry", "Joyful", "Tired"],
            answer: "Joyful",
            points: 15
          },
        ],
        "11-15": [
          {
            id: 35,
            title: "Word Expert",
            question: "What does 'Ephemeral' mean?",
            options: ["Eternal", "Lasting for a very short time", "Important", "Colorful"],
            answer: "Lasting for a very short time",
            points: 15
          },
          {
            id: 36,
            title: "Word Master",
            question: "Which is NOT a synonym for 'Loquacious'?",
            options: ["Talkative", "Garrulous", "Reticent", "Verbose"],
            answer: "Reticent",
            points: 15
          },
        ],
      },
    },
    riddles: {
      easy: {
        "5-7": [
          {
            id: 37,
            title: "Easy Riddle",
            question: "What has a face and hands but no arms or legs?",
            options: ["A clock", "A book", "A table", "A chair"],
            answer: "A clock",
            points: 5
          },
          {
            id: 38,
            title: "Simple Riddle",
            question: "What has many teeth but cannot bite?",
            options: ["A comb", "A fork", "A zipper", "A saw"],
            answer: "A comb",
            points: 5
          },
        ],
        "8-10": [
          {
            id: 39,
            title: "Easy Riddle",
            question: "What has a face and two hands but no arms or legs?",
            options: ["A clock", "A book", "A table", "A chair"],
            answer: "A clock",
            points: 5
          },
          {
            id: 40,
            title: "Simple Riddle",
            question: "What gets wetter as it dries?",
            options: ["Paper", "A towel", "Clothes", "Hair"],
            answer: "A towel",
            points: 5
          },
        ],
        "11-15": [
          {
            id: 41,
            title: "Easy Riddle",
            question: "What has keys but no locks, space but no room, and you can enter but not go in?",
            options: ["A keyboard", "A house", "A car", "A phone"],
            answer: "A keyboard",
            points: 5
          },
          {
            id: 42,
            title: "Simple Riddle",
            question: "What belongs to you but others use it more than you do?",
            options: ["Your name", "Your car", "Your phone", "Your house"],
            answer: "Your name",
            points: 5
          },
        ],
      },
      medium: {
        "5-7": [
          {
            id: 43,
            title: "Tricky Riddle",
            question: "What goes up but never comes down?",
            options: ["A balloon", "Your age", "A ball", "A kite"],
            answer: "Your age",
            points: 10
          },
          {
            id: 44,
            title: "Brain Teaser",
            question: "What has a head and a tail but no body?",
            options: ["A snake", "A coin", "A cat", "A dog"],
            answer: "A coin",
            points: 10
          },
        ],
        "8-10": [
          {
            id: 45,
            title: "Tricky Riddle",
            question: "What has a thumb and four fingers but is not alive?",
            options: ["A glove", "A mitten", "A shoe", "A sock"],
            answer: "A glove",
            points: 10
          },
          {
            id: 46,
            title: "Brain Teaser",
            question: "What can travel around the world while staying in a corner?",
            options: ["A map", "A stamp", "A suitcase", "A book"],
            answer: "A stamp",
            points: 10
          },
        ],
        "11-15": [
          {
            id: 47,
            title: "Tricky Riddle",
            question: "What can you catch but not throw?",
            options: ["A ball", "A cold", "A fish", "A frisbee"],
            answer: "A cold",
            points: 10
          },
          {
            id: 48,
            title: "Brain Teaser",
            question: "What has cities but no houses, forests but no trees, and rivers but no water?",
            options: ["A painting", "A photograph", "A map", "A globe"],
            answer: "A map",
            points: 10
          },
        ],
      },
      hard: {
        "5-7": [
          {
            id: 49,
            title: "Hard Riddle",
            question: "What has one eye but cannot see?",
            options: ["A needle", "A button", "A storm", "A camera"],
            answer: "A needle",
            points: 15
          },
          {
            id: 50,
            title: "Challenging Riddle",
            question: "What has hands but cannot clap?",
            options: ["A clock", "A glove", "A mitten", "A watch"],
            answer: "A clock",
            points: 15
          },
        ],
        "8-10": [
          {
            id: 51,
            title: "Hard Riddle",
            question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
            options: ["An echo", "A thought", "A shadow", "A dream"],
            answer: "An echo",
            points: 15
          },
          {
            id: 52,
            title: "Challenging Riddle",
            question: "The more you take, the more you leave behind. What am I?",
            options: ["Money", "Time", "Footsteps", "Memories"],
            answer: "Footsteps",
            points: 15
          },
        ],
        "11-15": [
          {
            id: 53,
            title: "Hard Riddle",
            question: "I'm light as a feather, but the strongest person can't hold me for more than a minute. What am I?",
            options: ["Breath", "Thought", "Time", "Shadow"],
            answer: "Breath",
            points: 15
          },
          {
            id: 54,
            title: "Challenging Riddle",
            question: "I have cities without houses, forests without trees, and oceans without water. What am I?",
            options: ["A dream", "A book", "A map", "A painting"],
            answer: "A map",
            points: 15
          },
        ],
      },
    },
    trivia: {
      easy: {
        "5-7": [
          {
            id: 55,
            title: "Animal Facts",
            question: "Which animal says 'Moo'?",
            options: ["Dog", "Cat", "Cow", "Sheep"],
            answer: "Cow",
            points: 5
          },
          {
            id: 56,
            title: "Color Trivia",
            question: "What color is a banana?",
            options: ["Green", "Red", "Yellow", "Blue"],
            answer: "Yellow",
            points: 5
          },
        ],
        "8-10": [
          {
            id: 57,
            title: "Animal Facts",
            question: "Which animal says 'Meow'?",
            options: ["Dog", "Cat", "Bird", "Fish"],
            answer: "Cat",
            points: 5
          },
          {
            id: 58,
            title: "Color Trivia",
            question: "What color is the sky on a clear day?",
            options: ["Green", "Red", "Blue", "Yellow"],
            answer: "Blue",
            points: 5
          },
        ],
        "11-15": [
          {
            id: 59,
            title: "Animal Facts",
            question: "Which animal is known as the 'King of the Jungle'?",
            options: ["Tiger", "Lion", "Elephant", "Giraffe"],
            answer: "Lion",
            points: 5
          },
          {
            id: 60,
            title: "Color Trivia",
            question: "What are the primary colors?",
            options: ["Red, yellow, blue", "Green, orange, purple", "Black, white, gray", "Pink, brown, teal"],
            answer: "Red, yellow, blue",
            points: 5
          },
        ],
      },
      medium: {
        "5-7": [
          {
            id: 61,
            title: "Science Fun",
            question: "How many planets are in our solar system?",
            options: ["7", "8", "9", "10"],
            answer: "8",
            points: 10
          },
          {
            id: 62,
            title: "Geography Quiz",
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
            points: 10
          },
        ],
        "8-10": [
          {
            id: 63,
            title: "Science Fun",
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Jupiter",
            points: 10
          },
          {
            id: 64,
            title: "Geography Quiz",
            question: "Which is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
            points: 10
          },
        ],
        "11-15": [
          {
            id: 65,
            title: "Science Fun",
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gl", "Gd", "Au"],
            answer: "Au",
            points: 10
          },
          {
            id: 66,
            title: "Geography Quiz",
            question: "Which continent is the driest on Earth?",
            options: ["Africa", "Asia", "Australia", "Antarctica"],
            answer: "Antarctica",
            points: 10
          },
        ],
      },
      hard: {
        "5-7": [
          {
            id: 67,
            title: "History Whiz",
            question: "Who was the first president of the United States?",
            options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
            answer: "George Washington",
            points: 15
          },
          {
            id: 68,
            title: "Science Expert",
            question: "Which animal sleeps standing up?",
            options: ["Giraffe", "Elephant", "Horse", "Penguin"],
            answer: "Horse",
            points: 15
          },
        ],
        "8-10": [
          {
            id: 69,
            title: "History Whiz",
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            answer: "Leonardo da Vinci",
            points: 15
          },
          {
            id: 70,
            title: "Science Expert",
            question: "Which animal sleeps standing up?",
            options: ["Giraffe", "Elephant", "Horse", "Penguin"],
            answer: "Horse",
            points: 15
          },
        ],
        "11-15": [
          {
            id: 71,
            title: "History Whiz",
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            answer: "1945",
            points: 15
          },
          {
            id: 72,
            title: "Science Expert",
            question: "What is the atomic number of oxygen?",
            options: ["6", "7", "8", "9"],
            answer: "8",
            points: 15
          },
        ],
      },
    },
  };

  const puzzles = puzzlesByType[puzzleType][level][ageGroup];

  const handleAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: answer
    });
    
    // Move to next puzzle after a short delay
    setTimeout(() => {
      if (currentIndex < puzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);
  };

  const handleLevelChange = (newLevel: "easy" | "medium" | "hard") => {
    setLevel(newLevel);
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const handleTypeChange = (newType: string) => {
    setPuzzleType(newType as "math" | "words" | "riddles" | "trivia");
    setCurrentIndex(0);
    setSelectedAnswers({});
  };
  
  const handleAgeGroupChange = (newAgeGroup: string) => {
    setAgeGroup(newAgeGroup as "5-7" | "8-10" | "11-15");
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const currentPuzzle = puzzles[currentIndex];
  
  const isCorrect = (option: string) => {
    return selectedAnswers[currentIndex] === option && option === currentPuzzle.answer;
  };
  
  const isIncorrect = (option: string) => {
    return selectedAnswers[currentIndex] === option && option !== currentPuzzle.answer;
  };

  const getLevelColor = (levelName: "easy" | "medium" | "hard") => {
    switch (levelName) {
      case "easy": return "bg-gradient-to-r from-green-400 to-green-600";
      case "medium": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "hard": return "bg-gradient-to-r from-red-400 to-red-600";
      default: return "";
    }
  };

  const getTypeColor = (typeName: string) => {
    switch (typeName) {
      case "math": return "text-blue-500";
      case "words": return "text-purple-500";
      case "riddles": return "text-orange-500";
      case "trivia": return "text-green-500";
      default: return "";
    }
  };

  const getAgeGroupColor = (ageGroupName: string) => {
    switch (ageGroupName) {
      case "5-7": return "bg-green-100 text-green-700 border-green-300";
      case "8-10": return "bg-blue-100 text-blue-700 border-blue-300";
      case "11-15": return "bg-purple-100 text-purple-700 border-purple-300";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-kidblue">Puzzles</h1>
        </div>

        <div className="mb-6">
          <Card className="p-4 bg-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Puzzle Type</h2>
                <Select value={puzzleType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select puzzle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math" className={getTypeColor("math")}>Math Puzzles</SelectItem>
                    <SelectItem value="words" className={getTypeColor("words")}>Word Puzzles</SelectItem>
                    <SelectItem value="riddles" className={getTypeColor("riddles")}>Riddles</SelectItem>
                    <SelectItem value="trivia" className={getTypeColor("trivia")}>Trivia Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Difficulty Level</h2>
                <RadioGroup 
                  value={level} 
                  onValueChange={(value) => handleLevelChange(value as "easy" | "medium" | "hard")}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy" className="font-semibold text-green-600 cursor-pointer">
                      Easy (5 points each)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="font-semibold text-yellow-600 cursor-pointer">
                      Medium (10 points each)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard" className="font-semibold text-red-600 cursor-pointer">
                      Hard (15 points each)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Age Group</h2>
              <Tabs value={ageGroup} onValueChange={handleAgeGroupChange} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger 
                    value="5-7" 
                    className={`${ageGroup === "5-7" ? getAgeGroupColor("5-7") : ""}`}
                  >
                    5-7 years
                  </TabsTrigger>
                  <TabsTrigger 
                    value="8-10" 
                    className={`${ageGroup === "8-10" ? getAgeGroupColor("8-10") : ""}`}
                  >
                    8-10 years
                  </TabsTrigger>
                  <TabsTrigger 
                    value="11-15" 
                    className={`${ageGroup === "11-15" ? getAgeGroupColor("11-15") : ""}`}
                  >
                    11-15 years
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="bg-kidblue text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          
          <div className="flex gap-3 items-center">
            <span className={`${getTypeColor(puzzleType)} font-bold capitalize`}>{puzzleType}</span>
            <span className="text-gray-500">|</span>
            <div className={`${getLevelColor(level)} px-4 py-2 rounded-full`}>
              <span className="text-white font-bold capitalize">{level}</span>
            </div>
            <span className="text-gray-500">|</span>
            <div className={`px-4 py-2 rounded-full ${getAgeGroupColor(ageGroup)}`}>
              <span className="font-bold">{ageGroup} years</span>
            </div>
          </div>
          
          <button 
            onClick={() => currentIndex < puzzles.length - 1 && setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === puzzles.length - 1}
            className="bg-kidblue text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
        <ContentCard
          title={currentPuzzle.title}
          type="puzzle"
          points={currentPuzzle.points}
          content={
            <div>
              <p className="text-lg mb-4">{currentPuzzle.question}</p>
              <div className="space-y-2">
                {currentPuzzle.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => !selectedAnswers[currentIndex] && handleAnswer(option)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      isCorrect(option) 
                        ? "bg-green-100 border-green-500" 
                        : isIncorrect(option)
                        ? "bg-red-100 border-red-500"
                        : "border-gray-200 hover:border-kidblue"
                    }`}
                    disabled={!!selectedAnswers[currentIndex]}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswers[currentIndex] && currentPuzzle.answer === selectedAnswers[currentIndex] && (
                <p className="text-green-600 mt-4 font-bold">Correct! Great job!</p>
              )}
              {selectedAnswers[currentIndex] && currentPuzzle.answer !== selectedAnswers[currentIndex] && (
                <p className="text-red-600 mt-4 font-bold">Oops! The correct answer is {currentPuzzle.answer}</p>
              )}
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Puzzles;
