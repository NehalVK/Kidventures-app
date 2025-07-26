
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star, RefreshCw } from "lucide-react";

const StoryCompletion = () => {
  const [currentStory, setCurrentStory] = useState<number | null>(null);
  const [selectedEnding, setSelectedEnding] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const stories = [
    {
      id: 1,
      title: "The Lost Puppy",
      beginning: "Tommy found a little puppy in the park. The puppy looked sad and lost. Tommy wanted to help, so he...",
      endings: [
        { id: 1, text: "took the puppy home and kept it as his own pet.", good: false, feedback: "That's not the best choice. The puppy might have a family looking for it!" },
        { id: 2, text: "looked for the puppy's owner and helped them find each other.", good: true, feedback: "Great choice! Helping lost pets find their families is very kind!" },
        { id: 3, text: "left the puppy alone and walked away.", good: false, feedback: "The puppy needs help! We should always try to help animals in need." }
      ]
    },
    {
      id: 2,
      title: "The Magic Seeds",
      beginning: "Emma planted some magic seeds in her garden. Overnight, they grew into a beautiful rainbow tree! When her friends saw it, Emma decided to...",
      endings: [
        { id: 1, text: "keep the magic tree all to herself.", good: false, feedback: "Sharing magical things makes them even more special!" },
        { id: 2, text: "share the rainbow fruit with all her friends.", good: true, feedback: "Wonderful! Sharing makes everyone happy and brings friends together!" },
        { id: 3, text: "sell the magic fruit to make money.", good: false, feedback: "Magic should be shared freely, not sold for money!" }
      ]
    },
    {
      id: 3,
      title: "The Helpful Robot",
      beginning: "Max built a robot to help with chores around the house. The robot was very good at cleaning and organizing. When his little sister broke her favorite toy, the robot...",
      endings: [
        { id: 1, text: "told her she was careless and should be more careful.", good: false, feedback: "That might make her feel worse. A helper should be kind!" },
        { id: 2, text: "fixed the toy and gave her a gentle hug.", good: true, feedback: "Perfect! Helping others and showing kindness is what good helpers do!" },
        { id: 3, text: "ignored her because fixing toys wasn't its job.", good: false, feedback: "Good helpers go beyond their regular duties to help others!" }
      ]
    }
  ];

  const handleEndingClick = (endingId: number) => {
    setSelectedEnding(endingId);
    setShowResult(true);
  };

  const nextStory = () => {
    const nextId = (currentStory || 0) + 1;
    if (nextId <= stories.length) {
      setCurrentStory(nextId);
      setSelectedEnding(null);
      setShowResult(false);
    } else {
      setCurrentStory(null);
    }
  };

  const resetStory = () => {
    setSelectedEnding(null);
    setShowResult(false);
  };

  if (currentStory) {
    const story = stories[currentStory - 1];
    if (!story) return null;

    const selectedEndingData = story.endings.find(e => e.id === selectedEnding);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{story.title}</h1>
            <BookOpen className="w-16 h-16 mx-auto text-purple-600 mb-6" />
          </div>

          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 mb-8 border-2">
            <CardContent className="p-8">
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                {story.beginning}
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            How should the story end? Choose the best ending:
          </h2>

          <div className="space-y-4 mb-8">
            {story.endings.map((ending) => (
              <Card 
                key={ending.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedEnding === ending.id
                    ? ending.good 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => !showResult && handleEndingClick(ending.id)}
              >
                <CardContent className="p-6">
                  <p className="text-lg text-gray-800">{ending.text}</p>
                  {selectedEnding === ending.id && showResult && (
                    <div className={`mt-4 p-4 rounded-lg ${ending.good ? 'bg-green-100' : 'bg-red-100'}`}>
                      <p className={`font-medium ${ending.good ? 'text-green-800' : 'text-red-800'}`}>
                        {ending.feedback}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {showResult && selectedEndingData?.good && (
            <div className="bg-gradient-to-r from-green-200 to-blue-200 p-6 rounded-2xl text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Excellent Choice! 🎉</h2>
              <p className="text-xl text-gray-700 mb-4">You picked the kindest ending!</p>
              <Button onClick={nextStory} className="bg-purple-500 hover:bg-purple-600">
                <Star className="w-4 h-4 mr-2" />
                {currentStory < stories.length ? "Next Story" : "All Stories Complete!"}
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={() => setCurrentStory(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
            <Button onClick={resetStory} className="bg-blue-500 hover:bg-blue-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Story Completion 📚
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Help finish these stories by choosing the best endings!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stories.map((story) => (
            <Card key={story.id} className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 hover:shadow-xl transition-all cursor-pointer">
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle className="text-xl text-gray-800">{story.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">
                  {story.beginning.substring(0, 100)}...
                </p>
                <div className="text-center">
                  <Button
                    onClick={() => setCurrentStory(story.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Read Story!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📖 Story Tips 📖
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">💝 Choose Kindness</h4>
              <p>The best story endings show characters being kind to others!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🤝 Help Others</h4>
              <p>Good characters always try to help when someone needs it!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🌟 Think First</h4>
              <p>Before choosing, think about what would make everyone happy!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">📚 Learn Together</h4>
              <p>Stories teach us how to be good friends and helpers!</p>
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

export default StoryCompletion;
