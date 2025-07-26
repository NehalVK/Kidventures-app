import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages, ArrowRight, Volume2, Puzzle, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("english");
  const [toLanguage, setToLanguage] = useState("spanish");
  const [points, setPoints] = useState(0);
  const [showPuzzles, setShowPuzzles] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null);
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const { toast } = useToast();

  const translations = {
    english: {
      spanish: {
        "hello": "hola",
        "goodbye": "adiós",
        "please": "por favor",
        "thank you": "gracias",
        "yes": "sí",
        "no": "no",
        "cat": "gato",
        "dog": "perro",
        "house": "casa",
        "water": "agua",
        "food": "comida",
        "friend": "amigo",
        "family": "familia",
        "school": "escuela",
        "book": "libro"
      },
      french: {
        "hello": "bonjour",
        "goodbye": "au revoir",
        "please": "s'il vous plaît",
        "thank you": "merci",
        "yes": "oui",
        "no": "non",
        "cat": "chat",
        "dog": "chien",
        "house": "maison",
        "water": "eau",
        "food": "nourriture",
        "friend": "ami",
        "family": "famille",
        "school": "école",
        "book": "livre"
      }
    }
  };

  const languages = {
    english: { name: "English", flag: "🇺🇸" },
    spanish: { name: "Spanish", flag: "🇪🇸" },
    french: { name: "French", flag: "🇫🇷" }
  };

  const puzzleTypes = [
    {
      id: "quick-translate",
      title: "Quick Translate",
      description: "Translate words as fast as you can!",
      icon: <ArrowRight className="w-6 h-6" />,
      points: 15
    },
    {
      id: "multiple-choice",
      title: "Translation Quiz",
      description: "Choose the correct translation",
      icon: <Target className="w-6 h-6" />,
      points: 20
    },
    {
      id: "reverse-translate",
      title: "Reverse Challenge",
      description: "Translate back to English",
      icon: <Puzzle className="w-6 h-6" />,
      points: 25
    }
  ];

  const generatePuzzle = (type: string) => {
    const translationMap = translations[fromLanguage]?.[toLanguage];
    if (!translationMap) return null;

    const words = Object.keys(translationMap);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const correctTranslation = translationMap[randomWord];

    switch (type) {
      case "quick-translate":
        return {
          type,
          question: `Translate "${randomWord}" to ${languages[toLanguage]?.name}`,
          answer: correctTranslation,
          word: randomWord,
          points: 15
        };
      
      case "multiple-choice":
        const wrongTranslations = Object.values(translationMap)
          .filter(t => t !== correctTranslation)
          .slice(0, 3);
        const options = [correctTranslation, ...wrongTranslations]
          .sort(() => Math.random() - 0.5);
        return {
          type,
          question: `What is "${randomWord}" in ${languages[toLanguage]?.name}?`,
          options,
          answer: correctTranslation,
          word: randomWord,
          points: 20
        };
      
      case "reverse-translate":
        return {
          type,
          question: `What does "${correctTranslation}" mean in English?`,
          answer: randomWord,
          word: correctTranslation,
          points: 25
        };
      
      default:
        return null;
    }
  };

  const startPuzzle = (puzzleType: string) => {
    const puzzle = generatePuzzle(puzzleType);
    if (puzzle) {
      setCurrentPuzzle(puzzle);
      setPuzzleAnswer("");
    } else {
      toast({
        title: "No puzzles available",
        description: "Please select different languages first"
      });
    }
  };

  const checkPuzzleAnswer = () => {
    if (!currentPuzzle) return;

    const isCorrect = puzzleAnswer.toLowerCase().trim() === currentPuzzle.answer.toLowerCase();
    
    if (isCorrect) {
      setPoints(points + currentPuzzle.points);
      toast({
        title: `Excellent! +${currentPuzzle.points} points`,
        description: "Perfect translation!"
      });
      setCurrentPuzzle(null);
      setPuzzleAnswer("");
    } else {
      toast({
        title: "Try again!",
        description: `The correct answer is: ${currentPuzzle.answer}`
      });
    }
  };

  const handleOptionSelect = (option: string) => {
    const isCorrect = option === currentPuzzle.answer;
    
    if (isCorrect) {
      setPoints(points + currentPuzzle.points);
      toast({
        title: `Correct! +${currentPuzzle.points} points`,
        description: "Great translation skills!"
      });
      setCurrentPuzzle(null);
    } else {
      toast({
        title: "Not quite right!",
        description: `The correct answer is: ${currentPuzzle.answer}`
      });
    }
  };

  const handleTranslate = () => {
    const text = inputText.toLowerCase().trim();
    if (!text) return;

    const translationMap = translations[fromLanguage]?.[toLanguage];
    if (translationMap && translationMap[text]) {
      setTranslatedText(translationMap[text]);
      setPoints(points + 10);
      toast({
        title: "Translation Success! +10 points",
        description: `Translated "${text}" successfully!`
      });
    } else {
      setTranslatedText("Translation not available");
      toast({
        title: "Translation not found",
        description: "Try common words like hello, thank you, cat, dog, etc."
      });
    }
  };

  const getRandomWord = () => {
    const translationMap = translations[fromLanguage]?.[toLanguage];
    if (translationMap) {
      const words = Object.keys(translationMap);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setInputText(randomWord);
      setTranslatedText(translationMap[randomWord]);
    }
  };

  const playPronunciation = (text: string, language: string) => {
    toast({
      title: "🔊 Pronunciation",
      description: `"${text}" in ${languages[language]?.name || language}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🌍 Language Translator
          </h1>
          <p className="text-xl text-gray-700">
            Learn new languages by translating words and phrases!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-4">
            <span className="text-lg font-semibold text-green-600">
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
                className={`rounded-full px-6 py-2 ${!showPuzzles ? 'bg-green-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                Translator
              </Button>
              <Button
                onClick={() => setShowPuzzles(true)}
                className={`rounded-full px-6 py-2 ${showPuzzles ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                Translation Puzzles
              </Button>
            </div>
          </div>

          {showPuzzles ? (
            /* Puzzle Section */
            <div className="space-y-8">
              {currentPuzzle ? (
                /* Active Puzzle */
                <Card className="shadow-xl border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <CardTitle className="text-2xl text-center">
                      {puzzleTypes.find(p => p.id === currentPuzzle.type)?.title} - {currentPuzzle.points} points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-4">{currentPuzzle.question}</h3>
                      
                      {currentPuzzle.type === "multiple-choice" ? (
                        <div className="space-y-3">
                          {currentPuzzle.options.map((option, index) => (
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
                            placeholder="Type your translation..."
                            value={puzzleAnswer}
                            onChange={(e) => setPuzzleAnswer(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && checkPuzzleAnswer()}
                            className="text-lg text-center"
                          />
                          <Button onClick={checkPuzzleAnswer} className="bg-purple-600 hover:bg-purple-700">
                            Submit Translation
                          </Button>
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
                            Start Challenge
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <Card className="mb-8 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Select Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium mb-2">From:</label>
                      <Select value={fromLanguage} onValueChange={setFromLanguage}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(languages).map(([code, lang]) => (
                            <SelectItem key={code} value={code}>
                              {lang.flag} {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <ArrowRight className="w-8 h-8 text-blue-600 mt-6" />
                    
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium mb-2">To:</label>
                      <Select value={toLanguage} onValueChange={setToLanguage}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(languages).map(([code, lang]) => (
                            <SelectItem key={code} value={code}>
                              {lang.flag} {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Translation Interface */}
              <Card className="mb-8 shadow-xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Side */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {languages[fromLanguage]?.flag} {languages[fromLanguage]?.name}
                        </h3>
                        <Button
                          onClick={() => playPronunciation(inputText, fromLanguage)}
                          variant="outline"
                          size="sm"
                          disabled={!inputText}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Type a word to translate..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
                        className="text-lg h-20 text-center"
                      />
                    </div>

                    {/* Output Side */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {languages[toLanguage]?.flag} {languages[toLanguage]?.name}
                        </h3>
                        <Button
                          onClick={() => playPronunciation(translatedText, toLanguage)}
                          variant="outline"
                          size="sm"
                          disabled={!translatedText || translatedText === "Translation not available"}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 h-20 flex items-center justify-center text-lg font-medium">
                        {translatedText || "Translation will appear here..."}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button onClick={handleTranslate} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Languages className="w-4 h-4 mr-2" />
                      Translate
                    </Button>
                    <Button onClick={getRandomWord} variant="outline" className="flex-1">
                      Try Random Word
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Common Words */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Common Words to Try</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Object.keys(translations.english?.[toLanguage] || {}).map((word) => (
                      <Button
                        key={word}
                        variant="outline"
                        onClick={() => {
                          setInputText(word);
                          setTranslatedText(translations.english[toLanguage][word]);
                        }}
                        className="h-12 text-sm hover:bg-green-50"
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

export default Translator;
