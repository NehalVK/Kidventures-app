
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Smile, Frown, Star, Play } from "lucide-react";

const FeelingsEmotions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());

  const emotions = [
    {
      id: 1,
      name: "Happy",
      emoji: "😊",
      color: "bg-yellow-200",
      description: "When you feel good and want to smile!",
      activity: "Can you show me your happy face? What makes you happy?",
      points: 10
    },
    {
      id: 2,
      name: "Sad",
      emoji: "😢",
      color: "bg-blue-200",
      description: "When you feel down and might want to cry",
      activity: "It's okay to feel sad sometimes. Can you give yourself a hug?",
      points: 10
    },
    {
      id: 3,
      name: "Angry",
      emoji: "😠",
      color: "bg-red-200",
      description: "When something makes you feel mad",
      activity: "When angry, take deep breaths. Count to 5 with me!",
      points: 15
    },
    {
      id: 4,
      name: "Excited",
      emoji: "🤩",
      color: "bg-orange-200",
      description: "When you feel super happy about something!",
      activity: "Jump up and down to show how excited you are!",
      points: 10
    },
    {
      id: 5,
      name: "Scared",
      emoji: "😨",
      color: "bg-purple-200",
      description: "When something makes you feel afraid",
      activity: "When scared, find a grown-up for a cuddle. You're brave!",
      points: 15
    },
    {
      id: 6,
      name: "Surprised",
      emoji: "😲",
      color: "bg-pink-200",
      description: "When something unexpected happens!",
      activity: "Make a surprised face! Open your eyes and mouth wide!",
      points: 10
    }
  ];

  const handleComplete = (emotionId: number) => {
    setCompletedActivities(prev => new Set(prev).add(emotionId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Feelings & Emotions 😊
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Let's learn about different feelings together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {emotions.map((emotion) => (
            <Card key={emotion.id} className={`${emotion.color} border-2 hover:shadow-xl transition-all cursor-pointer`}>
              <CardHeader className="text-center">
                <div className="text-8xl mb-4">{emotion.emoji}</div>
                <CardTitle className="text-2xl text-gray-800">{emotion.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-center">{emotion.description}</p>
                <p className="text-gray-600 text-sm text-center italic">"{emotion.activity}"</p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleComplete(emotion.id)}
                    disabled={completedActivities.has(emotion.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {completedActivities.has(emotion.id) ? (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Completed!
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Try This! (+{emotion.points} points)
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🌟 Remember These Feeling Tips! 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">💝 All Feelings Are Okay</h4>
              <p>It's normal to have different feelings every day!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🗣️ Talk About Feelings</h4>
              <p>Tell a grown-up how you feel when you need help</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🤗 Hugs Help</h4>
              <p>Hugs can make you feel better when you're sad or scared</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">😌 Deep Breaths</h4>
              <p>Take slow, deep breaths when you feel upset</p>
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

export default FeelingsEmotions;
