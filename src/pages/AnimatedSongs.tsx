
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Music, Play, Pause, Volume2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnimatedSongs = () => {
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  const songs = [
    {
      id: 1,
      title: "Twinkle Twinkle Little Star",
      emoji: "⭐",
      category: "Classic",
      videoId: "yCjJyiqpAuU",
      lyrics: [
        "Twinkle, twinkle, little star",
        "How I wonder what you are",
        "Up above the world so high",
        "Like a diamond in the sky",
        "Twinkle, twinkle, little star",
        "How I wonder what you are"
      ],
      description: "A beloved nursery rhyme about a curious little star!"
    },
    {
      id: 2,
      title: "Old MacDonald Had a Farm",
      emoji: "🚜",
      category: "Animal Songs",
      videoId: "6JhMpTqM3YE",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O",
        "And on his farm he had a cow, E-I-E-I-O",
        "With a moo moo here and a moo moo there",
        "Here a moo, there a moo, everywhere a moo moo",
        "Old MacDonald had a farm, E-I-E-I-O"
      ],
      description: "Meet the animals on Old MacDonald's farm!"
    },
    {
      id: 3,
      title: "The Wheels on the Bus",
      emoji: "🚌",
      category: "Action Songs",
      videoId: "e_04ZrNroTo",
      lyrics: [
        "The wheels on the bus go round and round",
        "Round and round, round and round",
        "The wheels on the bus go round and round",
        "All through the town"
      ],
      description: "Join the fun bus ride with movements and actions!"
    },
    {
      id: 4,
      title: "If You're Happy and You Know It",
      emoji: "😊",
      category: "Action Songs",
      videoId: "71hqRT9U0wg",
      lyrics: [
        "If you're happy and you know it, clap your hands",
        "If you're happy and you know it, clap your hands",
        "If you're happy and you know it, then your face will surely show it",
        "If you're happy and you know it, clap your hands"
      ],
      description: "Express your happiness with clapping and movements!"
    },
    {
      id: 5,
      title: "ABC Song",
      emoji: "🔤",
      category: "Learning",
      videoId: "h7W1LEJyeXY",
      lyrics: [
        "A B C D E F G",
        "H I J K L M N O P",
        "Q R S T U V",
        "W X Y and Z",
        "Now I know my ABCs",
        "Next time won't you sing with me?"
      ],
      description: "Learn the alphabet with this catchy tune!"
    },
    {
      id: 6,
      title: "Five Little Ducks",
      emoji: "🦆",
      category: "Counting",
      videoId: "1x8IhFLiJNU",
      lyrics: [
        "Five little ducks went swimming one day",
        "Over the hill and far away",
        "Mother duck said, 'Quack, quack, quack, quack'",
        "But only four little ducks came back"
      ],
      description: "Count down from five with these adorable ducks!"
    }
  ];

  const categories = ["All", "Classic", "Animal Songs", "Action Songs", "Learning", "Counting"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSongs = selectedCategory === "All" 
    ? songs 
    : songs.filter(song => song.category === selectedCategory);

  const playSong = (song: any) => {
    setSelectedSong(song);
    setIsPlaying(true);
    setPoints(points + 10);
    toast({
      title: "Song Started! +10 points",
      description: `Enjoy "${song.title}"!`
    });
  };

  const completeSong = () => {
    setPoints(points + 15);
    toast({
      title: "Song Complete! +15 points",
      description: "Great job singing along!"
    });
  };

  const renderSongList = () => (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map((song) => (
          <Card
            key={song.id}
            className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl border-2 hover:border-purple-300"
            onClick={() => playSong(song)}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{song.emoji}</div>
              <CardTitle className="text-lg mb-2">{song.title}</CardTitle>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {song.category}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 text-sm mb-4">
                {song.description}
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Play Song
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSongPlayer = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setSelectedSong(null)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Songs
        </Button>
        <div className="text-6xl">{selectedSong.emoji}</div>
      </div>

      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="text-2xl text-center">{selectedSong.title}</CardTitle>
          <p className="text-center text-purple-100">{selectedSong.category}</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe 
              src={`https://www.youtube.com/embed/${selectedSong.videoId}?autoplay=1`}
              className="w-full h-64 lg:h-96 rounded-lg"
              allowFullScreen
              title={selectedSong.title}
            ></iframe>
          </div>

          {/* Song Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={completeSong} className="bg-green-600 hover:bg-green-700">
              <Star className="w-4 h-4 mr-2" />
              Complete Song
            </Button>
          </div>

          {/* Lyrics */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-4 text-purple-800 flex items-center justify-center gap-2">
              <Volume2 className="w-6 h-6" />
              Sing Along Lyrics
            </h3>
            <div className="space-y-3">
              {selectedSong.lyrics.map((line, index) => (
                <p key={index} className="text-lg text-center text-gray-700 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-lg">{selectedSong.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Movement Instructions */}
      <Card className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-center mb-4 text-orange-800">
            🕺 Movement Ideas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👏 Clap Your Hands</h4>
              <p>Clap along to the beat of the music</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">💃 Dance Around</h4>
              <p>Move your body to the rhythm</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🙌 Wave Your Arms</h4>
              <p>Raise your arms up high and wave</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎭 Act It Out</h4>
              <p>Pretend to be the characters in the song</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎵 Animated Song Videos
          </h1>
          <p className="text-xl text-gray-700">
            Sing along with fun animated songs and learn while you play!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-4">
            <span className="text-lg font-semibold text-purple-600">
              Points Earned: {points} ⭐
            </span>
          </div>
        </div>

        {selectedSong ? renderSongPlayer() : renderSongList()}

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

export default AnimatedSongs;
