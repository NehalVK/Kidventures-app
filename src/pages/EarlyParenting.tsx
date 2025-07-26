import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Baby, Hand, Scissors, Paintbrush, Utensils, Building2, Clock, Star } from "lucide-react";

const EarlyParenting = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      id: "fine-motor",
      title: "Fine Motor Skills",
      description: "Activities to develop hand-eye coordination and finger dexterity",
      icon: <Hand className="w-8 h-8" />,
      emoji: "✋",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      activities: [
        {
          title: "Playdough Squeezing",
          description: "Let your child squeeze, roll, and shape playdough to strengthen hand muscles",
          ageRange: "2-5 years",
          materials: ["Playdough", "Cookie cutters", "Rolling pin"],
          duration: "15-20 minutes",
          difficulty: "Easy"
        },
        {
          title: "Threading Beads",
          description: "String large beads on a shoelace to improve hand-eye coordination",
          ageRange: "3-5 years",
          materials: ["Large beads", "Shoelace", "Bowl"],
          duration: "10-15 minutes",
          difficulty: "Medium"
        },
        {
          title: "Sticker Peeling",
          description: "Peel stickers and place them on paper to develop pincer grasp",
          ageRange: "2-4 years",
          materials: ["Stickers", "Paper", "Coloring book"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Cutting Practice",
          description: "Use child-safe scissors to cut paper strips and shapes",
          ageRange: "3-5 years",
          materials: ["Child scissors", "Construction paper", "Lines to follow"],
          duration: "15-20 minutes",
          difficulty: "Medium"
        }
      ]
    },
    {
      id: "gross-motor",
      title: "Gross Motor Skills",
      description: "Activities for large muscle development and coordination",
      icon: <Baby className="w-8 h-8" />,
      emoji: "🤸",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      activities: [
        {
          title: "Animal Walks",
          description: "Crawl like animals to develop core strength and coordination",
          ageRange: "2-5 years",
          materials: ["Open space", "Animal picture cards"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Balance Beam Walking",
          description: "Walk on a tape line or low beam to improve balance",
          ageRange: "3-5 years",
          materials: ["Masking tape", "Balance beam (optional)"],
          duration: "10-20 minutes",
          difficulty: "Medium"
        },
        {
          title: "Obstacle Course",
          description: "Create simple obstacles to crawl under, jump over, and walk around",
          ageRange: "2-5 years",
          materials: ["Pillows", "Chairs", "Rope", "Boxes"],
          duration: "20-30 minutes",
          difficulty: "Medium"
        },
        {
          title: "Dance and Movement",
          description: "Follow along with action songs and dance movements",
          ageRange: "2-5 years",
          materials: ["Music", "Open space"],
          duration: "15-25 minutes",
          difficulty: "Easy"
        }
      ]
    },
    {
      id: "cognitive",
      title: "Cognitive Development",
      description: "Activities to enhance thinking, problem-solving, and memory",
      icon: <Building2 className="w-8 h-8" />,
      emoji: "🧠",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      activities: [
        {
          title: "Shape Sorting",
          description: "Sort objects by shape, color, or size to develop classification skills",
          ageRange: "2-4 years",
          materials: ["Shape sorter toy", "Colored blocks", "Containers"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Memory Games",
          description: "Simple matching games to improve memory and concentration",
          ageRange: "3-5 years",
          materials: ["Picture cards", "Memory game"],
          duration: "10-20 minutes",
          difficulty: "Medium"
        },
        {
          title: "Puzzle Building",
          description: "Age-appropriate puzzles to develop problem-solving skills",
          ageRange: "2-5 years",
          materials: ["4-12 piece puzzles", "Wooden puzzles"],
          duration: "15-25 minutes",
          difficulty: "Medium"
        },
        {
          title: "Counting Games",
          description: "Count everyday objects to introduce number concepts",
          ageRange: "3-5 years",
          materials: ["Toys", "Snacks", "Fingers"],
          duration: "5-10 minutes",
          difficulty: "Easy"
        }
      ]
    },
    {
      id: "sensory",
      title: "Sensory Play",
      description: "Activities to stimulate the senses and exploration",
      icon: <Paintbrush className="w-8 h-8" />,
      emoji: "🌈",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      activities: [
        {
          title: "Sensory Bins",
          description: "Explore different textures with rice, beans, or sand",
          ageRange: "2-5 years",
          materials: ["Large container", "Rice/beans", "Scoops", "Small toys"],
          duration: "20-30 minutes",
          difficulty: "Easy"
        },
        {
          title: "Water Play",
          description: "Pour, splash, and explore with water activities",
          ageRange: "2-5 years",
          materials: ["Water table", "Cups", "Funnels", "Sponges"],
          duration: "20-30 minutes",
          difficulty: "Easy"
        },
        {
          title: "Texture Exploration",
          description: "Feel different materials and describe their textures",
          ageRange: "2-4 years",
          materials: ["Fabric swatches", "Sandpaper", "Cotton", "Velvet"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Finger Painting",
          description: "Create art while exploring different textures and colors",
          ageRange: "2-5 years",
          materials: ["Finger paints", "Large paper", "Apron"],
          duration: "15-25 minutes",
          difficulty: "Easy"
        }
      ]
    },
    {
      id: "social",
      title: "Social & Emotional",
      description: "Activities to develop social skills and emotional understanding",
      icon: <Star className="w-8 h-8" />,
      emoji: "💝",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      activities: [
        {
          title: "Emotion Cards",
          description: "Identify and discuss different emotions using picture cards",
          ageRange: "3-5 years",
          materials: ["Emotion cards", "Mirror"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Pretend Play",
          description: "Role-play different scenarios to develop empathy and social skills",
          ageRange: "2-5 years",
          materials: ["Dress-up clothes", "Dolls", "Play kitchen"],
          duration: "20-30 minutes",
          difficulty: "Easy"
        },
        {
          title: "Sharing Games",
          description: "Practice taking turns and sharing through simple games",
          ageRange: "2-5 years",
          materials: ["Toys", "Snacks", "Timer"],
          duration: "10-20 minutes",
          difficulty: "Medium"
        },
        {
          title: "Helper Activities",
          description: "Simple household tasks to build confidence and responsibility",
          ageRange: "2-5 years",
          materials: ["Small broom", "Sorting items", "Wiping cloth"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        }
      ]
    },
    {
      id: "language",
      title: "Language Development",
      description: "Activities to support speech and language skills",
      icon: <Utensils className="w-8 h-8" />,
      emoji: "💬",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      activities: [
        {
          title: "Story Time",
          description: "Read interactive books and ask questions about the story",
          ageRange: "2-5 years",
          materials: ["Picture books", "Interactive books"],
          duration: "10-20 minutes",
          difficulty: "Easy"
        },
        {
          title: "Singing Songs",
          description: "Sing nursery rhymes and action songs to develop language",
          ageRange: "2-5 years",
          materials: ["Songbooks", "Music"],
          duration: "10-15 minutes",
          difficulty: "Easy"
        },
        {
          title: "Name That Object",
          description: "Point to objects and practice naming them together",
          ageRange: "2-4 years",
          materials: ["Household items", "Picture books"],
          duration: "5-10 minutes",
          difficulty: "Easy"
        },
        {
          title: "Simple Conversations",
          description: "Engage in back-and-forth conversations during daily activities",
          ageRange: "2-5 years",
          materials: ["No materials needed"],
          duration: "Throughout day",
          difficulty: "Easy"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderCategoryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category) => (
        <Card
          key={category.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${category.color} text-white border-none shadow-xl`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <CardHeader className="text-center pb-4">
            <div className="text-6xl mb-4">{category.emoji}</div>
            <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
            <div className="flex justify-center mb-3">
              {category.icon}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/90 text-lg leading-relaxed">
              {category.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderActivityDetail = () => {
    const currentCategory = skillCategories.find(cat => cat.id === selectedCategory);
    if (!currentCategory) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setSelectedCategory(null)}
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
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-2 hover:border-yellow-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-800">{activity.title}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-gray-500" />
                      <span>{activity.ageRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{activity.duration}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Materials Needed:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {activity.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    Get Detailed Instructions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🌟 Tips for Parents 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">⏰ Keep It Short</h4>
              <p>Toddlers have short attention spans. 10-15 minutes is perfect!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🎯 Follow Their Lead</h4>
              <p>Let your child explore and don't worry about doing it "right"</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">👏 Celebrate Effort</h4>
              <p>Praise the process, not just the outcome</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold mb-2">🔄 Repeat Often</h4>
              <p>Repetition helps build skills and confidence</p>
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
            Early Development Activities 👶
          </h1>
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-4 rounded-2xl shadow-lg inline-block">
            <p className="text-2xl font-bold text-gray-800">
              Ages 2-5 Years • Parent Guide ✨
            </p>
          </div>
          <p className="text-xl text-gray-700 mt-4">
            Help your toddler develop essential skills through fun, engaging activities!
          </p>
        </div>

        {selectedCategory ? renderActivityDetail() : renderCategoryGrid()}

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

export default EarlyParenting;
