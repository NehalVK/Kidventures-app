import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AchievementShareForm from "../components/AchievementShareForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Award, Calendar, MapPin, Star, Users, Trophy, Medal } from "lucide-react";

const YoungTalents = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [shareFormOpen, setShareFormOpen] = useState(false);

  const talentCategories = [
    { id: "all", title: "All Talents", emoji: "🏆", color: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { id: "academic", title: "Academic Excellence", emoji: "📚", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: "arts", title: "Creative Arts", emoji: "🎨", color: "bg-gradient-to-br from-purple-400 to-pink-500" },
    { id: "sports", title: "Sports Champions", emoji: "⚽", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: "music", title: "Musical Prodigies", emoji: "🎵", color: "bg-gradient-to-br from-orange-400 to-red-500" },
    { id: "science", title: "Young Scientists", emoji: "🔬", color: "bg-gradient-to-br from-cyan-400 to-blue-500" },
    { id: "community", title: "Community Heroes", emoji: "🤝", color: "bg-gradient-to-br from-pink-400 to-purple-500" }
  ];

  const youngTalents = [
    {
      id: 1,
      name: "Arjun Krishnamurthy",
      age: 12,
      achievement: "International Online Chess Championship Winner",
      category: "sports",
      location: "Brigade School, Bangalore",
      story: "Defeated players from 15 countries to win the World Youth Online Chess Championship, making Bangalore proud!",
      date: "January 2024",
      award: "Gold Medal",
      image: "👦",
      school: "Brigade School"
    },
    {
      id: 2,
      name: "Ananya Reddy",
      age: 14,
      achievement: "National Robotics Competition Winner",
      category: "science",
      location: "Mallya Aditi International School, Bangalore",
      story: "Created a robot that helps elderly people with daily tasks, winning the National School Robotics Championship.",
      date: "February 2024",
      award: "Innovation Excellence Award",
      image: "👧",
      school: "Mallya Aditi International School"
    },
    {
      id: 3,
      name: "Rohan Sharma",
      age: 10,
      achievement: "Youngest App Developer in Karnataka",
      category: "science",
      location: "The International School Bangalore",
      story: "Developed 'EcoKids' app that teaches children about environmental conservation through interactive games.",
      date: "December 2023",
      award: "Young Innovator Award",
      image: "👦",
      school: "The International School Bangalore"
    },
    {
      id: 4,
      name: "Kavya Nair",
      age: 13,
      achievement: "All India Bharatanatyam Competition Winner",
      category: "arts",
      location: "Nalanda International School, Bangalore",
      story: "Mastered complex Bharatanatyam choreography and won the national level classical dance competition.",
      date: "January 2024",
      award: "Cultural Excellence Award",
      image: "👧",
      school: "Nalanda International School"
    },
    {
      id: 5,
      name: "Aditya Menon",
      age: 11,
      achievement: "National Spelling Bee Champion",
      category: "academic",
      location: "Greenwood High International School, Bangalore",
      story: "Spelled 'chrysanthemum' to win the National Spelling Bee, representing Karnataka with distinction.",
      date: "March 2024",
      award: "National Spelling Champion",
      image: "👦",
      school: "Greenwood High International School"
    },
    {
      id: 6,
      name: "Priya Patel",
      age: 9,
      achievement: "Youngest Environmental Activist in Bangalore",
      category: "community",
      location: "Inventure Academy, Bangalore",
      story: "Led 'Green Bangalore' campaign, planting 2000 trees and cleaning 15 lakes across the city.",
      date: "February 2024",
      award: "Environmental Hero Award",
      image: "👧",
      school: "Inventure Academy"
    },
    {
      id: 7,
      name: "Karthik Raman",
      age: 15,
      achievement: "Karnataka State Swimming Champion",
      category: "sports",
      location: "Bangalore Swimming Pool Complex",
      story: "Set new state records in 100m freestyle and 200m butterfly stroke at the Karnataka State Championships.",
      date: "January 2024",
      award: "State Swimming Champion",
      image: "👦",
      school: "Vidyashilp Academy"
    },
    {
      id: 8,
      name: "Shreya Iyer",
      age: 12,
      achievement: "National Piano Competition Winner",
      category: "music",
      location: "Chowdiah Memorial Hall, Bangalore",
      story: "Performed Mozart's Piano Concerto No. 21 flawlessly to win the National Young Musicians Competition.",
      date: "February 2024",
      award: "Music Excellence Award",
      image: "👧",
      school: "Bangalore International School"
    },
    {
      id: 9,
      name: "Vikram Joshi",
      age: 13,
      achievement: "Youngest TEDx Speaker in Bangalore",
      category: "academic",
      location: "TEDx Bangalore",
      story: "Delivered inspiring talk on 'Kids Can Change the World' at TEDx Bangalore, viewed by millions online.",
      date: "March 2024",
      award: "Outstanding Speaker Award",
      image: "👦",
      school: "Indus International School"
    },
    {
      id: 10,
      name: "Meera Krishnan",
      age: 14,
      achievement: "All India Science Olympiad Gold Medalist",
      category: "science",
      location: "National Science Centre, Delhi (representing Bangalore)",
      story: "Scored perfect marks in Physics and Chemistry to win Gold at the National Science Olympiad.",
      date: "January 2024",
      award: "National Science Gold Medal",
      image: "👧",
      school: "Sishu Griha Montessori School"
    }
  ];

  const getFilteredTalents = () => {
    if (selectedCategory === "all") {
      return youngTalents;
    }
    return youngTalents.filter(talent => talent.category === selectedCategory);
  };

  const getAwardIcon = (award: string) => {
    if (award.includes("Gold") || award.includes("Champion") || award.includes("National")) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (award.includes("Excellence") || award.includes("Winner")) return <Medal className="w-5 h-5 text-silver-500" />;
    return <Award className="w-5 h-5 text-bronze-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Young Talents & Achievers - Bangalore 🏆
          </h1>
          <p className="text-xl text-gray-700">
            Celebrating amazing kids from Bangalore who are making a difference!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {talentCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-lg">{category.emoji}</span>
              {category.title}
            </Button>
          ))}
        </div>

        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredTalents().map((talent) => (
            <Card key={talent.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-yellow-200">
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{talent.image}</div>
                <CardTitle className="text-xl text-purple-700">{talent.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Age {talent.age}</span>
                </div>
                <div className="text-sm text-blue-600 font-medium">{talent.school}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-green-700 mb-2">{talent.achievement}</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {getAwardIcon(talent.award)}
                    <span className="text-sm font-medium text-gray-600">{talent.award}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{talent.story}"
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{talent.date}</span>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="w-4 h-4" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredTalents().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No talents found</h3>
            <p className="text-gray-500">Try selecting a different category!</p>
          </div>
        )}

        {/* Inspiration Section */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">You Could Be Next! 🌟</h2>
            <p className="text-lg text-gray-700 mb-6">
              Every amazing achievement starts with a dream and hard work. What's your special talent?
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-8 py-3"
              onClick={() => setShareFormOpen(true)}
            >
              Share Your Achievement
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Achievement Share Form */}
      <AchievementShareForm
        isOpen={shareFormOpen}
        onClose={() => setShareFormOpen(false)}
      />
    </div>
  );
};

export default YoungTalents;
