import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import WalkthroughPopup from "../components/WalkthroughPopup";
import { useAge } from "../context/AgeContext";
import { 
  BookOpen, 
  Music, 
  Camera, 
  Play, 
  Heart, 
  Gamepad2, 
  Trophy, 
  ShoppingCart,
  Brain,
  Calendar,
  Grid3X3,
  Search,
  Code,
  Microscope,
  Volume2,
  Shapes,
  Map,
  Baby,
  Languages,
  Book,
  Users,
  ThumbsUp,
  Briefcase,
  Briefcase as BriefcaseBusiness,
  Calculator,
  Palette,
  Shield
} from "lucide-react";

const Index = () => {
  const { ageGroup } = useAge();
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  // Check if this is the user's first visit
  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem('kidventure_walkthrough_shown');
    if (!hasSeenWalkthrough) {
      // Small delay to let the page load first
      setTimeout(() => {
        setShowWalkthrough(true);
      }, 1000);
    }
  }, []);

  const commonCategories = [
    {
      title: "Kids News",
      color: "bg-gradient-to-r from-blue-400 to-green-600",
      path: "/kids-news",
      icon: <BookOpen className="w-8 h-8" />,
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      emoji: "📰"
    },
    {
      title: "Local Events",
      color: "bg-gradient-to-r from-orange-400 to-red-600",
      path: "/local-events",
      icon: <Calendar className="w-8 h-8" />,
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      emoji: "📅"
    },
    {
      title: "Young Talents",
      color: "bg-gradient-to-r from-yellow-400 to-red-600",
      path: "/young-talents",
      icon: <Trophy className="w-8 h-8" />,
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      emoji: "⭐"
    },
    {
      title: "Leaderboard",
      color: "bg-gradient-to-r from-yellow-400 to-orange-600",
      path: "/leaderboard",
      icon: <Trophy className="w-8 h-8" />,
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      emoji: "🏆"
    },
    {
      title: "Kids Store",
      color: "bg-gradient-to-r from-orange-400 to-pink-600",
      path: "/kids-store",
      icon: <ShoppingCart className="w-8 h-8" />,
      ageGroups: ["2-5", "5-7", "8-10", "11-15"],
      emoji: "🛒"
    }
  ];

  // Age-specific categories
  const ageSpecificCategories = {
    "2-5": [
      {
        title: "Positive Actions",
        color: "bg-gradient-to-r from-green-400 to-blue-600",
        path: "/positive-actions",
        icon: <ThumbsUp className="w-12 h-12" />,
        ageGroups: ["2-5"],
        emoji: "🌟"
      },
      {
        title: "Reading Practice",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
        path: "/reading-practice",
        icon: <Book className="w-12 h-12" />,
        ageGroups: ["2-5"],
        emoji: "📖"
      },
      {
        title: "Early Parenting",
        color: "bg-gradient-to-r from-rose-400 to-pink-600",
        path: "/early-parenting",
        icon: <Heart className="w-12 h-12" />,
        ageGroups: ["2-5"],
        emoji: "👨‍👩‍👧‍👦"
      },
      {
        title: "Feelings & Emotions",
        color: "bg-gradient-to-r from-pink-400 to-purple-600",
        path: "/feelings-emotions",
        icon: <Heart className="w-12 h-12" />,
        ageGroups: ["2-5"],
        emoji: "😊"
      },
      {
        title: "Color & Shape Sorting",
        color: "bg-gradient-to-r from-rainbow-400 to-rainbow-600",
        path: "/color-shape-sorting",
        icon: <Palette className="w-12 h-12" />,
        ageGroups: ["2-5"],
        emoji: "🌈"
      }
    ],
    "5-7": [
      {
        title: "Reading Practice",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
        path: "/reading-practice",
        icon: <Book className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "📖"
      },
      {
        title: "Shape & Pattern Matching",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
        path: "/shapes",
        icon: <Shapes className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "🔷"
      },
      {
        title: "Picture Hunt",
        color: "bg-gradient-to-r from-cyan-400 to-blue-600",
        path: "/picture-hunt",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "🔍"
      },
      {
        title: "Puzzles",
        color: "bg-gradient-to-r from-purple-400 to-blue-600",
        path: "/puzzle",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "🧩"
      },
      {
        title: "Early Learning",
        color: "bg-gradient-to-r from-green-400 to-teal-600",
        path: "/early-learning",
        icon: <Baby className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "👶"
      },
      {
        title: "Rhyming Games",
        color: "bg-gradient-to-r from-yellow-400 to-orange-600",
        path: "/rhyming-games",
        icon: <Music className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "🎵"
      },
      {
        title: "Story Completion",
        color: "bg-gradient-to-r from-indigo-400 to-purple-600",
        path: "/story-completion",
        icon: <BookOpen className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "📚"
      },
      {
        title: "Safety Awareness",
        color: "bg-gradient-to-r from-red-400 to-orange-600",
        path: "/safety-awareness",
        icon: <Shield className="w-12 h-12" />,
        ageGroups: ["5-7"],
        emoji: "🛡️"
      }
    ],
    "8-10": [
      {
        title: "Dictionary",
        color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
        path: "/dictionary",
        icon: <Book className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "📚"
      },
      {
        title: "Translator",
        color: "bg-gradient-to-r from-teal-400 to-teal-600",
        path: "/translator",
        icon: <Languages className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "🌍"
      },
      {
        title: "Social Skills",
        color: "bg-gradient-to-r from-rose-400 to-rose-600",
        path: "/social-skills",
        icon: <Users className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "🤝"
      },
      {
        title: "Career Discovery",
        color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
        path: "/career-discovery",
        icon: <Briefcase className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "💼"
      },
      {
        title: "Health & Wellness",
        color: "bg-gradient-to-r from-pink-400 to-red-600",
        path: "/health",
        icon: <Heart className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "❤️"
      },
      {
        title: "Stories",
        color: "bg-gradient-to-r from-green-400 to-blue-600",
        path: "/stories",
        icon: <BookOpen className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "📚"
      },
      {
        title: "Language",
        color: "bg-gradient-to-r from-purple-400 to-pink-600",
        path: "/language",
        icon: <BookOpen className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🗣️"
      },
      {
        title: "Pictures",
        color: "bg-gradient-to-r from-yellow-400 to-orange-600",
        path: "/pictures",
        icon: <Camera className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "📸"
      },
      {
        title: "Videos",
        color: "bg-gradient-to-r from-red-400 to-pink-600",
        path: "/videos",
        icon: <Play className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🎬"
      },
      {
        title: "Riddles",
        color: "bg-gradient-to-r from-teal-400 to-blue-600",
        path: "/riddles",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🧠"
      },
      {
        title: "Picture Composition",
        color: "bg-gradient-to-r from-orange-400 to-red-600",
        path: "/picture-composition",
        icon: <Camera className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🎨"
      },
      {
        title: "Picture Hunt",
        color: "bg-gradient-to-r from-cyan-400 to-blue-600",
        path: "/picture-hunt",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🔍"
      },
      {
        title: "Mystery Image",
        color: "bg-gradient-to-r from-purple-400 to-indigo-600",
        path: "/mystery-image",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🔍"
      },
      {
        title: "Ten Clue",
        color: "bg-gradient-to-r from-green-400 to-teal-600",
        path: "/ten-clue",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🧩"
      },
      {
        title: "Visual IQ Challenges",
        color: "bg-gradient-to-r from-blue-400 to-indigo-600",
        path: "/visual-iq",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "👁️"
      },
      {
        title: "Treasure Hunt",
        color: "bg-gradient-to-r from-yellow-400 to-green-600",
        path: "/treasure-hunt",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🗺️"
      },
      {
        title: "Puzzles",
        color: "bg-gradient-to-r from-purple-400 to-blue-600",
        path: "/puzzle",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["8-10"],
        emoji: "🧩"
      }
    ],
    "11-15": [
      {
        title: "Dictionary",
        color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
        path: "/dictionary",
        icon: <Book className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "📚"
      },
      {
        title: "Translator",
        color: "bg-gradient-to-r from-teal-400 to-teal-600",
        path: "/translator",
        icon: <Languages className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "🌍"
      },
      {
        title: "Social Skills",
        color: "bg-gradient-to-r from-rose-400 to-rose-600",
        path: "/social-skills",
        icon: <Users className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "🤝"
      },
      {
        title: "Career Discovery",
        color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
        path: "/career-discovery",
        icon: <Briefcase className="w-12 h-12" />,
        ageGroups: ["8-10", "11-15"],
        emoji: "💼"
      },
      {
        title: "Entrepreneurship for Kids",
        color: "bg-gradient-to-r from-amber-400 to-orange-600",
        path: "/entrepreneurship",
        icon: <BriefcaseBusiness className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🚀"
      },
      {
        title: "Advanced Math Challenges",
        color: "bg-gradient-to-r from-violet-400 to-purple-600",
        path: "/advanced-math",
        icon: <Calculator className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🧮"
      },
      {
        title: "Intro to Coding",
        color: "bg-gradient-to-r from-amber-400 to-amber-600",
        path: "/coding",
        icon: <Code className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "💻"
      },
      {
        title: "Health & Wellness",
        color: "bg-gradient-to-r from-pink-400 to-red-600",
        path: "/health",
        icon: <Heart className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "❤️"
      },
      {
        title: "Stories",
        color: "bg-gradient-to-r from-green-400 to-blue-600",
        path: "/stories",
        icon: <BookOpen className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "📚"
      },
      {
        title: "Language",
        color: "bg-gradient-to-r from-purple-400 to-pink-600",
        path: "/language",
        icon: <BookOpen className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🗣️"
      },
      {
        title: "Pictures",
        color: "bg-gradient-to-r from-yellow-400 to-orange-600",
        path: "/pictures",
        icon: <Camera className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "📸"
      },
      {
        title: "Videos",
        color: "bg-gradient-to-r from-red-400 to-pink-600",
        path: "/videos",
        icon: <Play className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🎬"
      },
      {
        title: "Riddles",
        color: "bg-gradient-to-r from-teal-400 to-blue-600",
        path: "/riddles",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🧠"
      },
      {
        title: "Picture Composition",
        color: "bg-gradient-to-r from-orange-400 to-red-600",
        path: "/picture-composition",
        icon: <Camera className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🎨"
      },
      {
        title: "Picture Hunt",
        color: "bg-gradient-to-r from-cyan-400 to-blue-600",
        path: "/picture-hunt",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🔍"
      },
      {
        title: "Mystery Image",
        color: "bg-gradient-to-r from-purple-400 to-indigo-600",
        path: "/mystery-image",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🔍"
      },
      {
        title: "Ten Clue",
        color: "bg-gradient-to-r from-green-400 to-teal-600",
        path: "/ten-clue",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🧩"
      },
      {
        title: "Visual IQ Challenges",
        color: "bg-gradient-to-r from-blue-400 to-indigo-600",
        path: "/visual-iq",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "👁️"
      },
      {
        title: "Treasure Hunt",
        color: "bg-gradient-to-r from-yellow-400 to-green-600",
        path: "/treasure-hunt",
        icon: <Search className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🗺️"
      },
      {
        title: "Puzzles",
        color: "bg-gradient-to-r from-purple-400 to-blue-600",
        path: "/puzzle",
        icon: <Brain className="w-12 h-12" />,
        ageGroups: ["11-15"],
        emoji: "🧩"
      }
    ]
  };

  // Get age-specific categories for current age group
  const getCurrentAgeCategories = () => {
    return ageSpecificCategories[ageGroup] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Kidventures! 🌟
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Your magical world of learning and fun awaits!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg">
            <span className="text-lg font-semibold text-purple-600">
              Currently exploring: Ages {ageGroup} Adventures
            </span>
          </div>
        </div>

        {/* Content Rating Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold">
              RATED E - EVERYONE
            </span>
            <span className="text-blue-700">
              📚 Educational Content • 🛡️ Safe for Children • 👨‍👩‍👧‍👦 Parental Guidance Available
            </span>
          </div>
        </div>

        {/* Common Categories Row - Smaller tiles for mobile */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Essential Activities</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {commonCategories.map((category, index) => (
              <Link key={index} to={category.path}>
                <div 
                  className={`category-card p-3 sm:p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 h-28 w-20 sm:h-32 sm:w-24 ${category.color} hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="text-2xl sm:text-3xl">{category.emoji}</div>
                    <div className="text-white drop-shadow-lg">{category.icon}</div>
                    <h3 className="text-xs sm:text-sm font-bold text-white text-center drop-shadow-lg leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full -translate-y-4 translate-x-4"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/20 rounded-full translate-y-3 -translate-x-3"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Age-Specific Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Age {ageGroup} Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentAgeCategories().map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>

        {/* App Store Compliance Notice */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            🏆 Trusted Educational Platform
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <strong className="text-gray-800">Google Play Compliant</strong>
              <p>Meets all content policy requirements</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎓</div>
              <strong className="text-gray-800">Educational Focus</strong>
              <p>Designed for learning and development</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <strong className="text-gray-800">Privacy First</strong>
              <p>COPPA and GDPR compliant</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Walkthrough Popup */}
      <WalkthroughPopup 
        isOpen={showWalkthrough} 
        onClose={() => setShowWalkthrough(false)} 
      />
    </div>
  );
};

export default Index;
