
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Palette, Calculator, Microscope, Music, Globe, Heart, Star, Play, CheckCircle } from "lucide-react";
import { useAge } from "../context/AgeContext";
import { getSamplesForCategory } from "../data/sampleActivities";

const EarlyLearning = () => {
  const { ageGroup } = useAge();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<any | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());

  // Get sample activities for early learning - these have the correct structure
  const earlyLearningActivities = getSamplesForCategory("early-learning", 24);

  const activityCategories = [
    {
      id: "phonics",
      title: "Phonics & Reading",
      description: "Letter sounds, simple words, and early reading skills",
      icon: <Book className="w-8 h-8" />,
      emoji: "📚",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      ageGroups: ["2-5", "5-7", "8-10"],
      activities: earlyLearningActivities.filter(a => 
        'category' in a && typeof a.category === 'string' && a.category === "Letters"
      ).slice(0, 4)
    },
    {
      id: "numbers",
      title: "Numbers & Counting",
      description: "Basic math, counting, shapes, and patterns",
      icon: <Calculator className="w-8 h-8" />,
      emoji: "🔢",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      activities: earlyLearningActivities.filter(a => 
        'category' in a && typeof a.category === 'string' && a.category === "Numbers"
      ).slice(0, 4)
    },
    {
      id: "creative",
      title: "Creative Arts",
      description: "Drawing, coloring, crafts, and imagination",
      icon: <Palette className="w-8 h-8" />,
      emoji: "🎨",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      activities: earlyLearningActivities.filter(a => 
        'category' in a && typeof a.category === 'string' && a.category === "Motor Skills"
      ).slice(0, 4)
    },
    {
      id: "science",
      title: "Simple Science",
      description: "Easy experiments and nature exploration",
      icon: <Microscope className="w-8 h-8" />,
      emoji: "🔬",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      activities: earlyLearningActivities.filter(a => 
        'category' in a && typeof a.category === 'string' && a.category === "Science"
      ).slice(0, 4)
    },
    {
      id: "movement",
      title: "Movement & Music",
      description: "Physical activities and musical exploration",
      icon: <Music className="w-8 h-8" />,
      emoji: "🎵",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      ageGroups: ["2-5", "5-7", "8-10"],
      activities: earlyLearningActivities.filter(a => 
        'category' in a && typeof a.category === 'string' && a.category === "Social"
      ).slice(0, 4)
    },
    {
      id: "world",
      title: "My World",
      description: "Family, community, and basic geography",
      icon: <Globe className="w-8 h-8" />,
      emoji: "🌍",
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      activities: earlyLearningActivities.slice(-4)
    }
  ];

  // Filter categories based on current age group
  const filteredCategories = activityCategories.filter(category => 
    category.ageGroups.includes(ageGroup)
  );

  const getAgeGroupTitle = () => {
    switch(ageGroup) {
      case "2-5": return "Little Learners (Ages 2-5)";
      case "5-7": return "Early Explorers (Ages 5-7)";
      case "8-10": return "Curious Minds (Ages 8-10)";
      case "11-15": return "Young Thinkers (Ages 11-15)";
      default: return "Learning Adventures";
    }
  };

  const getAgeGroupEmoji = () => {
    switch(ageGroup) {
      case "2-5": return "🌈";
      case "5-7": return "🌟";
      case "8-10": return "🚀";
      case "11-15": return "🎯";
      default: return "✨";
    }
  };

  const handleActivityStart = (activity: any) => {
    setActiveActivity(activity);
  };

  const handleActivityComplete = (activityId: number) => {
    setCompletedActivities(prev => new Set(prev).add(activityId));
    setActiveActivity(null);
  };

  const renderCategoryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCategories.map((category) => (
        <Card
          key={category.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${category.color} text-white border-none shadow-xl`}
          onClick={() => setSelectedActivity(category.id)}
        >
          <CardHeader className="text-center pb-4">
            <div className="text-6xl mb-4">{category.emoji}</div>
            <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
            <div className="flex justify-center mb-3">
              {category.icon}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/90 text-lg leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="text-center">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {category.activities.length} Activities
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderActiveActivity = () => {
    if (!activeActivity) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-2xl w-full bg-white shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-gray-800">
                {'activity' in activeActivity ? activeActivity.activity : 'title' in activeActivity ? activeActivity.title : 'Learning Activity'}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveActivity(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-lg text-gray-700 mb-6">
                {'description' in activeActivity ? activeActivity.description : 'content' in activeActivity ? activeActivity.content : 'Let\'s start this fun learning activity!'}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3 text-gray-800">Activity Instructions:</h4>
              <div className="space-y-2 text-gray-700">
                <p>• Follow the activity steps carefully</p>
                <p>• Take your time and have fun!</p>
                <p>• Ask for help if you need it</p>
                <p>• Celebrate when you complete it!</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setActiveActivity(null)}
                variant="outline"
                className="px-6 py-3"
              >
                Close
              </Button>
              <Button
                onClick={() => handleActivityComplete(activeActivity.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderActivityDetail = () => {
    const currentCategory = filteredCategories.find(cat => cat.id === selectedActivity);
    if (!currentCategory) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setSelectedActivity(null)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Button>
          <div className="text-6xl">{currentCategory.emoji}</div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{currentCategory.title}</h2>
          <p className="text-xl text-gray-600">{currentCategory.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCategory.activities.map((activity, index) => (
            <Card key={activity.id} className="shadow-lg hover:shadow-xl transition-shadow border-2 hover:border-yellow-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-800">
                    {'activity' in activity ? activity.activity : 'title' in activity ? activity.title : `Activity ${index + 1}`}
                  </CardTitle>
                  {completedActivities.has(activity.id) ? (
                    <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
                  ) : (
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    {'description' in activity ? activity.description : 'content' in activity ? activity.content : 'Fun learning activity!'}
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-gray-700 font-medium">Perfect for {getAgeGroupTitle()}!</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Category: {'category' in activity ? activity.category : 'General Learning'}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-gray-600">+{activity.points} points</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
                      onClick={() => handleActivityStart(activity)}
                      disabled={completedActivities.has(activity.id)}
                    >
                      <Play className="w-4 h-4" />
                      {completedActivities.has(activity.id) ? 'Completed!' : 'Start Activity'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentCategory.activities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities found</h3>
            <p className="text-gray-500">Activities for this age group coming soon!</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🌟 Learning Tips for Parents 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">📝 Keep it Short</h4>
              <p>Young learners focus best in 10-15 minute sessions</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎉 Make it Fun</h4>
              <p>Use games, songs, and hands-on activities</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👏 Celebrate Progress</h4>
              <p>Praise effort and small achievements</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🔄 Repeat & Practice</h4>
              <p>Children learn through repetition and practice</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {getAgeGroupTitle()} {getAgeGroupEmoji()}
          </h1>
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-4 rounded-2xl shadow-lg inline-block">
            <p className="text-2xl font-bold text-gray-800">
              Interactive Learning Activities ✨
            </p>
          </div>
          <p className="text-xl text-gray-700 mt-4">
            Fun learning activities designed specifically for your age group!
          </p>
        </div>

        {selectedActivity ? renderActivityDetail() : renderCategoryGrid()}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto text-lg px-6 py-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {renderActiveActivity()}
    </div>
  );
};

export default EarlyLearning;
