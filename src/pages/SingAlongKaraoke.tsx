import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic, Star, PlayCircle, Volume2, Heart, VolumeX, Pause } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { audioManager } from "../utils/audioUtils";

const SingAlongKaraoke = () => {
  const [currentActivity, setCurrentActivity] = useState("menu");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false); // Changed to false by default
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize audio on first user interaction
  const initializeAudio = async () => {
    if (!audioInitialized && soundEnabled) {
      try {
        // Try to play a silent tone to initialize audio context
        await audioManager.playTone(0, 0.01, 'sine');
        setAudioInitialized(true);
        console.log('Audio initialized successfully');
      } catch (error) {
        console.log('Audio initialization failed:', error);
      }
    }
  };

  // Stop all audio when returning to menu
  const stopAllAudio = () => {
    setIsPlaying(false);
    if (audioInitialized) {
      audioManager.stopBackgroundMusic();
      audioManager.stopAllAudio();
    }
    console.log('All audio stopped');
  };

  const songs = [
    {
      id: 1,
      title: "Twinkle, Twinkle, Little Star",
      emoji: "⭐",
      lyrics: [
        "Twinkle, twinkle, little star",
        "How I wonder what you are",
        "Up above the world so high",
        "Like a diamond in the sky",
        "Twinkle, twinkle, little star",
        "How I wonder what you are"
      ],
      color: "bg-yellow-200"
    },
    {
      id: 2,
      title: "Old MacDonald Had a Farm",
      emoji: "🚜",
      lyrics: [
        "Old MacDonald had a farm, E-I-E-I-O",
        "And on his farm he had a cow, E-I-E-I-O",
        "With a moo-moo here and a moo-moo there",
        "Here a moo, there a moo, everywhere a moo-moo",
        "Old MacDonald had a farm, E-I-E-I-O"
      ],
      color: "bg-green-200"
    },
    {
      id: 3,
      title: "If You're Happy and You Know It",
      emoji: "😊",
      lyrics: [
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it, clap your hands! 👏",
        "If you're happy and you know it, then your face will surely show it",
        "If you're happy and you know it, clap your hands! 👏"
      ],
      color: "bg-pink-200"
    },
    {
      id: 4,
      title: "The Wheels on the Bus",
      emoji: "🚌",
      lyrics: [
        "The wheels on the bus go round and round",
        "Round and round, round and round",
        "The wheels on the bus go round and round",
        "All through the town!"
      ],
      color: "bg-blue-200"
    }
  ];

  const activities = [
    {
      id: "karaoke",
      title: "Karaoke Time",
      description: "Sing along with your favorite songs!",
      icon: <Mic className="w-8 h-8" />,
      color: "bg-gradient-to-r from-pink-400 to-pink-600"
    },
    {
      id: "rhythm-game",
      title: "Rhythm Challenge",
      description: "Clap and tap to the beat!",
      icon: <Music className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-400 to-purple-600"
    },
    {
      id: "create-song",
      title: "Create Your Song",
      description: "Make up your own silly songs!",
      icon: <Star className="w-8 h-8" />,
      color: "bg-gradient-to-r from-yellow-400 to-orange-600"
    },
    {
      id: "duet-mode",
      title: "Duet Mode",
      description: "Sing together with friends!",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-to-r from-red-400 to-pink-600"
    }
  ];

  const KaraokeMode = () => {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [score, setScore] = useState(0);

    const startSinging = async (song) => {
      setSelectedSong(song);
      setCurrentLyricIndex(0);
      setIsPlaying(true);
      
      // Only initialize and play audio if sound is enabled
      if (soundEnabled) {
        await initializeAudio();
        if (audioInitialized) {
          try {
            await audioManager.playBackgroundMusic(0.3);
            await audioManager.playClickSound();
          } catch (error) {
            console.log('Failed to play background music:', error);
          }
        }
      }
      
      // Simulate progressing through lyrics with musical timing
      const interval = setInterval(async () => {
        setCurrentLyricIndex((prev) => {
          if (prev >= song.lyrics.length - 1) {
            clearInterval(interval);
            setIsPlaying(false);
            setScore(score + 10);
            if (soundEnabled && audioInitialized) {
              audioManager.playSuccessSound();
              audioManager.stopBackgroundMusic();
            }
            return prev;
          }
          
          // Play a note for each lyric line only if sound is enabled
          if (soundEnabled && audioInitialized) {
            const notes = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Ti'];
            try {
              audioManager.playNote(notes[prev % notes.length]);
            } catch (error) {
              console.log('Failed to play note:', error);
            }
          }
          
          return prev + 1;
        });
      }, 3000);
    };

    const stopSinging = () => {
      setIsPlaying(false);
      if (soundEnabled && audioInitialized) {
        audioManager.stopBackgroundMusic();
      }
    };

    return (
      <div className="space-y-6">
        {!selectedSong ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {songs.map((song) => (
              <Card key={song.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className={`${song.color} rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{song.emoji}</span>
                    {song.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Button 
                    onClick={() => startSinging(song)}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Singing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center">
            <CardHeader className={`${selectedSong.color} rounded-t-lg`}>
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <span className="text-4xl">{selectedSong.emoji}</span>
                {selectedSong.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="text-6xl mb-4">🎤</div>
                <div className="text-2xl font-bold text-purple-600 mb-4">
                  {isPlaying ? "Sing along!" : "Get ready to sing!"}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
                {selectedSong.lyrics.map((lyric, index) => (
                  <div 
                    key={index} 
                    className={`text-lg py-2 transition-all duration-500 ${
                      index === currentLyricIndex ? 'text-pink-600 font-bold text-2xl animate-pulse' : 
                      index < currentLyricIndex ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {lyric}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  onClick={() => setSelectedSong(null)}
                  variant="outline"
                >
                  Choose Another Song
                </Button>
                <Button 
                  onClick={() => startSinging(selectedSong)}
                  className="bg-pink-500 hover:bg-pink-600"
                  disabled={isPlaying}
                >
                  {isPlaying ? "Singing..." : "Sing Again"}
                </Button>
                {isPlaying && (
                  <Button 
                    onClick={stopSinging}
                    variant="outline"
                    className="bg-red-100 hover:bg-red-200"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
              
              <div className="flex justify-center gap-2">
                <Button 
                  onClick={async () => {
                    await initializeAudio();
                    setSoundEnabled(!soundEnabled);
                  }}
                  variant="outline"
                  size="sm"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const RhythmGame = () => {
    const [beats, setBeats] = useState([]);
    const [playerBeats, setPlayerBeats] = useState([]);
    const [gameActive, setGameActive] = useState(false);

    const startRhythmGame = async () => {
      const pattern = [1, 0, 1, 1, 0, 1, 0, 0];
      setBeats(pattern);
      setPlayerBeats([]);
      setGameActive(true);
      
      // Only play rhythm if sound is enabled
      if (soundEnabled) {
        await initializeAudio();
        if (audioInitialized) {
          try {
            await audioManager.playRhythm(pattern, 600);
          } catch (error) {
            console.log('Failed to play rhythm:', error);
          }
        }
      }
    };

    const handleBeatTap = async (beatIndex) => {
      // Only play beat sound if sound is enabled
      if (soundEnabled) {
        await initializeAudio();
        if (audioInitialized) {
          try {
            audioManager.playTone(400 + (beatIndex * 100), 0.2, 'square');
          } catch (error) {
            console.log('Failed to play beat tone:', error);
          }
        }
      }
      
      // Add visual feedback
      const button = document.querySelector(`[data-beat="${beatIndex}"]`);
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => {
          button.classList.remove('animate-pulse');
        }, 200);
      }
    };

    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-600">
            🥁 Rhythm Challenge 🥁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg">Listen to the pattern and tap along!</p>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  data-beat={num}
                  className="h-20 w-20 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-2xl"
                  onClick={() => handleBeatTap(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={startRhythmGame}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Music className="w-4 h-4 mr-2" />
              Start Rhythm Game
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderActivity = () => {
    switch (currentActivity) {
      case "karaoke":
        return <KaraokeMode />;
      case "rhythm-game":
        return <RhythmGame />;
      case "create-song":
        return <KaraokeMode />;
      case "duet-mode":
        return <KaraokeMode />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className={`${activity.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3">
                    {activity.icon}
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <Button 
                    onClick={async () => {
                      await initializeAudio();
                      setCurrentActivity(activity.id);
                    }}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                  >
                    Start Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🎤 Sing-Along Karaoke 🎤
          </h1>
          <p className="text-xl text-gray-700">
            Sing your favorite songs and create musical memories!
          </p>
          
          {currentActivity !== "menu" && (
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) {
                    initializeAudio();
                  } else {
                    stopAllAudio();
                  }
                }}
                variant="outline"
                className="rounded-full"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {soundEnabled ? "Music On" : "Music Off"}
              </Button>
              <Button 
                onClick={() => {
                  stopAllAudio();
                  setCurrentActivity("menu");
                  setSelectedSong(null);
                }}
                variant="outline"
                className="rounded-full"
              >
                Back to Menu
              </Button>
            </div>
          )}
        </div>

        {renderActivity()}
      </main>
      
      <Footer />
    </div>
  );
};

export default SingAlongKaraoke;
