
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Music, Star, Volume2, CheckCircle } from "lucide-react";

const RhymingGames = () => {
  const [currentGame, setCurrentGame] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const rhymingGames = [
    {
      id: 1,
      title: "What Rhymes with CAT?",
      word: "CAT",
      emoji: "🐱",
      options: [
        { word: "HAT", emoji: "🎩", rhymes: true },
        { word: "DOG", emoji: "🐶", rhymes: false },
        { word: "BAT", emoji: "🦇", rhymes: true },
        { word: "FISH", emoji: "🐟", rhymes: false }
      ]
    },
    {
      id: 2,
      title: "What Rhymes with SUN?",
      word: "SUN",
      emoji: "☀️",
      options: [
        { word: "MOON", emoji: "🌙", rhymes: false },
        { word: "RUN", emoji: "🏃", rhymes: true },
        { word: "FUN", emoji: "🎉", rhymes: true },
        { word: "STAR", emoji: "⭐", rhymes: false }
      ]
    },
    {
      id: 3,
      title: "What Rhymes with TREE?",
      word: "TREE",
      emoji: "🌳",
      options: [
        { word: "BEE", emoji: "🐝", rhymes: true },
        { word: "BIRD", emoji: "🐦", rhymes: false },
        { word: "SEE", emoji: "👀", rhymes: true },
        { word: "ROCK", emoji: "🪨", rhymes: false }
      ]
    }
  ];

  const handleAnswerClick = (option: any) => {
    setSelectedAnswer(option.word);
    
    if (option.rhymes) {
      setScore(prev => prev + 20);
      setTimeout(() => {
        setGameComplete(true);
      }, 1000);
    }
  };

  const nextGame = () => {
    const nextGameId = (currentGame || 0) + 1;
    if (nextGameId <= rhymingGames.length) {
      setCurrentGame(nextGameId);
      setSelectedAnswer(null);
      setGameComplete(false);
    } else {
      setCurrentGame(null);
    }
  };

  const resetGame = () => {
    setSelectedAnswer(null);
    setGameComplete(false);
    setScore(0);
  };

  if (currentGame) {
    const game = rhymingGames[currentGame - 1];
    if (!game) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{game.title}</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg inline-block mb-6">
              <div className="text-8xl mb-4">{game.emoji}</div>
              <div className="text-4xl font-bold text-purple-600">{game.word}</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-4 rounded-lg inline-block">
              <span className="text-2xl font-bold text-gray-800">Score: {score} points 🌟</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {game.options.map((option, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:scale-105 border-4 ${
                  selectedAnswer === option.word
                    ? option.rhymes 
                      ? 'border-green-400 bg-green-100' 
                      : 'border-red-400 bg-red-100'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => !selectedAnswer && handleAnswerClick(option)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{option.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{option.word}</h3>
                  {selectedAnswer === option.word && (
                    <div className="mt-4">
                      {option.rhymes ? (
                        <div className="text-green-600">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-xl font-bold">Great! They rhyme!</span>
                        </div>
                      ) : (
                        <div className="text-red-600">
                          <span className="text-xl font-bold">Try again!</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {gameComplete && (
            <div className="bg-gradient-to-r from-green-200 to-blue-200 p-6 rounded-2xl text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Fantastic! 🎉</h2>
              <p className="text-xl text-gray-700 mb-4">You found the rhyming words!</p>
              <Button onClick={nextGame} className="bg-purple-500 hover:bg-purple-600">
                {currentGame < rhymingGames.length ? "Next Rhyme" : "All Done!"}
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={() => setCurrentGame(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600">
              Start Over
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Rhyming Games 🎵
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Let's have fun with words that sound the same!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {rhymingGames.map((game) => (
            <Card key={game.id} className="bg-gradient-to-br from-yellow-100 to-pink-100 border-2 hover:shadow-xl transition-all cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{game.emoji}</div>
                <CardTitle className="text-xl text-gray-800">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Button
                    onClick={() => setCurrentGame(game.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Play Game!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🎶 What Are Rhyming Words? 🎶
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎵 Same Sound</h4>
              <p>Rhyming words end with the same sound, like CAT and HAT!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">📚 In Stories</h4>
              <p>Many poems and songs use rhyming words to sound nice!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎯 Listen Carefully</h4>
              <p>Pay attention to how words end to find rhymes!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🌟 Practice</h4>
              <p>The more you practice, the better you get at rhyming!</p>
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

export default RhymingGames;
