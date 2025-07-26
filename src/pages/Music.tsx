
import { Music as MusicIcon, Play, Pause, Volume2 } from "lucide-react";
import Header from "../components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Music = () => {
  const [points, setPoints] = useState(0);
  const [currentActivity, setCurrentActivity] = useState("instruments");
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const { toast } = useToast();

  const completeActivity = (activityId: string, earnedPoints: number) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      setPoints(points + earnedPoints);
      toast({
        title: "Great job! 🎵",
        description: `You earned ${earnedPoints} points!`,
      });
    }
  };

  const instruments = [
    { name: "Piano", emoji: "🎹", sound: "Beautiful melodies", points: 5 },
    { name: "Guitar", emoji: "🎸", sound: "Strumming chords", points: 5 },
    { name: "Drums", emoji: "🥁", sound: "Beating rhythms", points: 5 },
    { name: "Violin", emoji: "🎻", sound: "Elegant strings", points: 5 },
    { name: "Trumpet", emoji: "🎺", sound: "Bright brass", points: 5 },
    { name: "Flute", emoji: "🪈", sound: "Sweet whispers", points: 5 }
  ];

  const rhythmPatterns = [
    { name: "Clap", pattern: "👏 👏 👏", difficulty: "Easy", points: 8 },
    { name: "Stomp", pattern: "🦶 _ 🦶 _", difficulty: "Medium", points: 10 },
    { name: "Mixed", pattern: "👏 🦶 👏 🦶", difficulty: "Hard", points: 12 }
  ];

  const musicNotes = [
    { note: "Do", emoji: "🎵", color: "bg-red-200", points: 3 },
    { note: "Re", emoji: "🎶", color: "bg-orange-200", points: 3 },
    { note: "Mi", emoji: "🎵", color: "bg-yellow-200", points: 3 },
    { note: "Fa", emoji: "🎶", color: "bg-green-200", points: 3 },
    { note: "So", emoji: "🎵", color: "bg-blue-200", points: 3 },
    { note: "La", emoji: "🎶", color: "bg-indigo-200", points: 3 },
    { note: "Ti", emoji: "🎵", color: "bg-purple-200", points: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <MusicIcon className="text-rose-500 text-3xl" />
          <h1 className="text-4xl font-bold text-rose-600">Music Learning</h1>
        </div>

        {/* Points Display */}
        <div className="text-center mb-6">
          <div className="bg-rose-500 text-white px-4 py-2 rounded-full font-bold inline-block">
            🎵 Music Points: {points}
          </div>
        </div>

        {/* Activity Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-md">
            <Button
              onClick={() => setCurrentActivity("instruments")}
              variant={currentActivity === "instruments" ? "default" : "outline"}
              className="text-sm"
            >
              🎹 Instruments
            </Button>
            <Button
              onClick={() => setCurrentActivity("rhythm")}
              variant={currentActivity === "rhythm" ? "default" : "outline"}
              className="text-sm"
            >
              🥁 Rhythm
            </Button>
            <Button
              onClick={() => setCurrentActivity("notes")}
              variant={currentActivity === "notes" ? "default" : "outline"}
              className="text-sm"
            >
              🎵 Notes
            </Button>
          </div>
        </div>

        {/* Instruments Activity */}
        {currentActivity === "instruments" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-rose-600">
              🎼 Learn About Instruments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {instruments.map((instrument, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-2">{instrument.emoji}</div>
                    <CardTitle className="text-rose-600">{instrument.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{instrument.sound}</p>
                    <Button
                      onClick={() => completeActivity(`instrument-${index}`, instrument.points)}
                      disabled={completedActivities.includes(`instrument-${index}`)}
                      className="bg-rose-500 hover:bg-rose-600"
                    >
                      {completedActivities.includes(`instrument-${index}`) 
                        ? "✓ Learned!" 
                        : `Learn (+${instrument.points} pts)`
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Rhythm Activity */}
        {currentActivity === "rhythm" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-rose-600">
              🥁 Practice Rhythm Patterns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rhythmPatterns.map((pattern, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="text-center">
                    <CardTitle className="text-rose-600">{pattern.name} Pattern</CardTitle>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                      pattern.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                      pattern.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {pattern.difficulty}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl mb-4 font-mono">{pattern.pattern}</div>
                    <Button
                      onClick={() => completeActivity(`rhythm-${index}`, pattern.points)}
                      disabled={completedActivities.includes(`rhythm-${index}`)}
                      className="bg-rose-500 hover:bg-rose-600"
                    >
                      {completedActivities.includes(`rhythm-${index}`) 
                        ? "✓ Practiced!" 
                        : `Practice (+${pattern.points} pts)`
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Musical Notes Activity */}
        {currentActivity === "notes" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-rose-600">
              🎵 Learn Musical Notes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {musicNotes.map((note, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all ${note.color}`}>
                  <CardContent className="text-center p-6">
                    <div className="text-4xl mb-2">{note.emoji}</div>
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{note.note}</h3>
                    <Button
                      onClick={() => completeActivity(`note-${index}`, note.points)}
                      disabled={completedActivities.includes(`note-${index}`)}
                      size="sm"
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      {completedActivities.includes(`note-${index}`) 
                        ? "✓" 
                        : `+${note.points}`
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {completedActivities.filter(id => id.startsWith('note-')).length === musicNotes.length && (
              <div className="text-center mt-6">
                <div className="bg-rose-100 p-4 rounded-lg">
                  <p className="text-rose-700 font-bold">
                    🎉 Congratulations! You learned all the musical notes!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Music;
