
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Book, Search, Volume2, Star, Shuffle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWord, setCurrentWord] = useState<any>(null);
  const [points, setPoints] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null);
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [showPuzzles, setShowPuzzles] = useState(false);
  const { toast } = useToast();

  const dictionary = {
    "adventure": {
      definition: "An exciting or unusual experience or activity",
      pronunciation: "ad-ven-cher",
      example: "Going on a camping trip is a great adventure!",
      difficulty: "easy"
    },
    "brilliant": {
      definition: "Very bright, clever, or outstanding",
      pronunciation: "bril-yant",
      example: "You did a brilliant job on your homework!",
      difficulty: "medium"
    },
    "curious": {
      definition: "Eager to know or learn something",
      pronunciation: "kyoor-ee-us",
      example: "I'm curious about how airplanes fly.",
      difficulty: "easy"
    },
    "fantastic": {
      definition: "Extraordinarily good or attractive",
      pronunciation: "fan-tas-tik",
      example: "The movie was absolutely fantastic!",
      difficulty: "easy"
    },
    "magnificent": {
      definition: "Extremely beautiful, elaborate, or impressive",
      pronunciation: "mag-nif-i-sent",
      example: "The castle looked magnificent in the sunset.",
      difficulty: "hard"
    }
  };

  const puzzleTypes = [
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Unscramble the letters to form the correct word",
      icon: <Shuffle className="w-6 h-6" />,
      points: 15
    },
    {
      id: "definition-match",
      title: "Definition Match",
      description: "Match the word with its correct definition",
      icon: <Book className="w-6 h-6" />,
      points: 10
    },
    {
      id: "fill-blank",
      title: "Fill the Blank",
      description: "Complete the sentence with the right word",
      icon: <Zap className="w-6 h-6" />,
      points: 20
    }
  ];

  const generatePuzzle = (type: string) => {
    const words = Object.keys(dictionary);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const wordData = dictionary[randomWord as keyof typeof dictionary];

    switch (type) {
      case "word-scramble":
        const scrambled = randomWord.split('').sort(() => Math.random() - 0.5).join('');
        return {
          type,
          question: `Unscramble these letters: ${scrambled.toUpperCase()}`,
          answer: randomWord,
          hint: `Definition: ${wordData.definition}`,
          points: 15
        };
      
      case "definition-match":
        const wrongWords = words.filter(w => w !== randomWord).slice(0, 2);
        const options = [randomWord, ...wrongWords].sort(() => Math.random() - 0.5);
        return {
          type,
          question: `Which word means: "${wordData.definition}"?`,
          options,
          answer: randomWord,
          points: 10
        };
      
      case "fill-blank":
        const sentence = wordData.example.replace(new RegExp(randomWord, 'gi'), '____');
        return {
          type,
          question: `Fill in the blank: ${sentence}`,
          answer: randomWord,
          hint: `Definition: ${wordData.definition}`,
          points: 20
        };
      
      default:
        return null;
    }
  };

  const startPuzzle = (puzzleType: string) => {
    const puzzle = generatePuzzle(puzzleType);
    setCurrentPuzzle(puzzle);
    setPuzzleAnswer("");
  };

  const checkPuzzleAnswer = () => {
    if (!currentPuzzle) return;

    const isCorrect = puzzleAnswer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase();
    
    if (isCorrect) {
      setPoints(points + currentPuzzle.points);
      toast({
        title: `Correct! +${currentPuzzle.points} points`,
        description: "Great job solving the puzzle!"
      });
      setCurrentPuzzle(null);
      setPuzzleAnswer("");
    } else {
      toast({
        title: "Try again!",
        description: "That's not quite right. Check the hint!"
      });
    }
  };

  const handleOptionSelect = (option: string) => {
    const isCorrect = option === currentPuzzle.answer;
    
    if (isCorrect) {
      setPoints(points + currentPuzzle.points);
      toast({
        title: `Correct! +${currentPuzzle.points} points`,
        description: "Perfect match!"
      });
      setCurrentPuzzle(null);
    } else {
      toast({
        title: "Try again!",
        description: "That's not the right match."
      });
    }
  };

  const handleSearch = () => {
    const word = searchTerm.toLowerCase().trim();
    if (dictionary[word as keyof typeof dictionary]) {
      setCurrentWord({ word, ...dictionary[word as keyof typeof dictionary] });
      setPoints(points + 5);
      toast({
        title: "Word Found! +5 points",
        description: `Great job looking up "${word}"!`
      });
    } else {
      toast({
        title: "Word not found",
        description: "Try searching for: adventure, brilliant, curious, fantastic, or magnificent"
      });
    }
  };

  const playPronunciation = () => {
    if (currentWord) {
      // In a real app, this would use text-to-speech
      toast({
        title: "🔊 Pronunciation",
        description: `"${currentWord.word}" is pronounced: ${currentWord.pronunciation}`
      });
    }
  };

  const getRandomWord = () => {
    const words = Object.keys(dictionary);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord({ word: randomWord, ...dictionary[randomWord as keyof typeof dictionary] });
    setSearchTerm(randomWord);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            📚 Word Dictionary
          </h1>
          <p className="text-xl text-gray-700">
            Discover new words and expand your vocabulary!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-4">
            <span className="text-lg font-semibold text-blue-600">
              Points Earned: {points} ⭐
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <Button
                onClick={() => setShowPuzzles(false)}
                className={`rounded-full px-6 py-2 ${!showPuzzles ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                Dictionary
              </Button>
              <Button
                onClick={() => setShowPuzzles(true)}
                className={`rounded-full px-6 py-2 ${showPuzzles ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                Word Puzzles
              </Button>
            </div>
          </div>

          {showPuzzles ? (
            /* Puzzle Section */
            <div className="space-y-8">
              {currentPuzzle ? (
                /* Active Puzzle */
                <Card className="shadow-xl border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardTitle className="text-2xl text-center">
                      {puzzleTypes.find(p => p.id === currentPuzzle.type)?.title} - {currentPuzzle.points} points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-4">{currentPuzzle.question}</h3>
                      
                      {currentPuzzle.type === "definition-match" ? (
                        <div className="space-y-3">
                          {currentPuzzle.options.map((option: string, index: number) => (
                            <Button
                              key={index}
                              onClick={() => handleOptionSelect(option)}
                              variant="outline"
                              className="w-full text-lg py-3 hover:bg-purple-50"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Input
                            placeholder="Type your answer..."
                            value={puzzleAnswer}
                            onChange={(e) => setPuzzleAnswer(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && checkPuzzleAnswer()}
                            className="text-lg text-center"
                          />
                          <Button onClick={checkPuzzleAnswer} className="bg-purple-600 hover:bg-purple-700">
                            Submit Answer
                          </Button>
                        </div>
                      )}
                      
                      {currentPuzzle.hint && (
                        <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                          <p className="text-sm font-medium">💡 Hint: {currentPuzzle.hint}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <Button
                        onClick={() => setCurrentPuzzle(null)}
                        variant="outline"
                      >
                        Back to Puzzles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Puzzle Selection */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {puzzleTypes.map((puzzle) => (
                    <Card
                      key={puzzle.id}
                      className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl border-2 hover:border-purple-300"
                      onClick={() => startPuzzle(puzzle.id)}
                    >
                      <CardHeader className="text-center">
                        <div className="flex justify-center mb-4 text-purple-600">
                          {puzzle.icon}
                        </div>
                        <CardTitle className="text-xl">{puzzle.title}</CardTitle>
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          +{puzzle.points} points
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-gray-600">
                          {puzzle.description}
                        </p>
                        <div className="mt-4 text-center">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Start Puzzle
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Dictionary Section */
            <>
              <Card className="mb-8 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Search className="w-6 h-6 text-blue-600" />
                    Word Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Input
                      placeholder="Type a word to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="text-lg"
                    />
                    <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  <Button onClick={getRandomWord} variant="outline" className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Get Random Word
                  </Button>
                </CardContent>
              </Card>

              {/* Word Display */}
              {currentWord && (
                <Card className="mb-8 shadow-xl border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <CardTitle className="text-3xl capitalize flex items-center justify-between">
                      {currentWord.word}
                      <Button
                        onClick={playPronunciation}
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                    <p className="text-blue-100 text-lg">/{currentWord.pronunciation}/</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Definition:</h3>
                        <p className="text-gray-700 text-lg">{currentWord.definition}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Example:</h3>
                        <p className="text-gray-700 text-lg italic">"{currentWord.example}"</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">Difficulty:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          currentWord.difficulty === 'hard' ? 'bg-red-100 text-red-800' : ''
                        }`}>
                          {currentWord.difficulty}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Available Words */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Book className="w-6 h-6 text-blue-600" />
                    Available Words
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(dictionary).map((word) => (
                      <Button
                        key={word}
                        variant="outline"
                        onClick={() => {
                          setSearchTerm(word);
                          setCurrentWord({ word, ...dictionary[word as keyof typeof dictionary] });
                        }}
                        className="capitalize h-12 text-lg hover:bg-blue-50"
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

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

export default Dictionary;
