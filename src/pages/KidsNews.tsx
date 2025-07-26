import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Eye, ThumbsUp, Share, RefreshCw } from "lucide-react";
import { useAge } from "../context/AgeContext";

const KidsNews = () => {
  const { ageGroup } = useAge();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time news data focused on Bangalore
  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "Bangalore Students Win National Robotics Championship",
      summary: "Team from Mallya Aditi International School creates award-winning robot that helps elderly people with daily tasks.",
      category: "science",
      image: "🤖",
      readTime: "4 min",
      views: 2850,
      likes: 234,
      publishedAt: "1 hour ago",
      ageAppropriate: ["8-10", "11-15"],
      content: "Young innovators from Bangalore showcase their engineering skills on national stage!",
      isNew: true,
      location: "Bangalore"
    },
    {
      id: 2,
      title: "Cubbon Park Gets New Children's Science Corner",
      summary: "Interactive exhibits about plants, weather, and animals now available for kids every weekend at Cubbon Park.",
      category: "science",
      image: "🌳",
      readTime: "3 min",
      views: 1920,
      likes: 187,
      publishedAt: "2 hours ago",
      ageAppropriate: ["5-7", "8-10", "11-15"],
      content: "Bangalore's green lung becomes even more educational for young nature lovers.",
      isNew: true,
      location: "Bangalore"
    },
    {
      id: 3,
      title: "Young Bangalorean Wins International Chess Tournament",
      summary: "12-year-old Arjun Krishnamurthy from Brigade School defeats players from 15 countries in online chess championship.",
      category: "sports",
      image: "♟️",
      readTime: "3 min",
      views: 3200,
      likes: 298,
      publishedAt: "3 hours ago",
      ageAppropriate: ["8-10", "11-15"],
      content: "Strategic thinking and practice lead to global recognition for Bangalore chess prodigy.",
      isNew: true,
      location: "Bangalore"
    },
    {
      id: 4,
      title: "Bangalore School Creates India's First Student-Run Recycling Program",
      summary: "Students at Greenwood High collect 500kg of plastic waste monthly, converting it into useful items for school.",
      category: "environment",
      image: "♻️",
      readTime: "4 min",
      views: 2100,
      likes: 189,
      publishedAt: "4 hours ago",
      ageAppropriate: ["8-10", "11-15"],
      content: "Environmental consciousness meets innovation in this inspiring student-led initiative.",
      isNew: false,
      location: "Bangalore"
    },
    {
      id: 5,
      title: "Bangalore Metro Launches Kids' Safety Campaign",
      summary: "Colorful mascot 'Metro Mani' teaches children about public transport safety through fun interactive sessions.",
      category: "education",
      image: "🚇",
      readTime: "2 min",
      views: 1650,
      likes: 145,
      publishedAt: "5 hours ago",
      ageAppropriate: ["5-7", "8-10"],
      content: "Public transportation becomes a fun learning experience for Bangalore's youngest commuters.",
      isNew: false,
      location: "Bangalore"
    },
    {
      id: 6,
      title: "Bangalore Zoo Welcomes Baby Elephant",
      summary: "Bannerghatta Biological Park celebrates birth of Asian elephant calf, visitors can see mother and baby together.",
      category: "animals",
      image: "🐘",
      readTime: "3 min",
      views: 4200,
      likes: 376,
      publishedAt: "6 hours ago",
      ageAppropriate: ["5-7", "8-10", "11-15"],
      content: "New addition to Bangalore's wildlife family brings joy to children and families.",
      isNew: false,
      location: "Bangalore"
    },
    {
      id: 7,
      title: "Tech Park Kids Code for a Cause",
      summary: "Children of IT professionals in Whitefield create mobile app to help street animals find homes and medical care.",
      category: "technology",
      image: "📱",
      readTime: "4 min",
      views: 2750,
      likes: 231,
      publishedAt: "8 hours ago",
      ageAppropriate: ["11-15"],
      content: "Young coders combine technology skills with compassion for animals.",
      isNew: false,
      location: "Bangalore"
    },
    {
      id: 8,
      title: "Bangalore Book Festival Announces Kids' Writing Contest",
      summary: "Young authors aged 8-15 can submit stories about their city. Winners get published in special Bangalore children's anthology.",
      category: "education",
      image: "📚",
      readTime: "3 min",
      views: 1580,
      likes: 134,
      publishedAt: "12 hours ago",
      ageAppropriate: ["8-10", "11-15"],
      content: "Encouraging creativity and local pride through storytelling competition.",
      isNew: false,
      location: "Bangalore"
    }
  ]);

  const newsCategories = [
    { id: "all", title: "All News", emoji: "📰" },
    { id: "science", title: "Science & Discovery", emoji: "🔬" },
    { id: "animals", title: "Animals & Nature", emoji: "🐾" },
    { id: "sports", title: "Kids Sports", emoji: "⚽" },
    { id: "technology", title: "Cool Tech", emoji: "🤖" },
    { id: "environment", title: "Planet Earth", emoji: "🌍" },
    { id: "education", title: "Learning Fun", emoji: "📚" }
  ];

  const refreshNews = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate new article or updated view counts
      setNewsArticles(prev => prev.map(article => ({
        ...article,
        views: article.views + Math.floor(Math.random() * 50),
        likes: article.likes + Math.floor(Math.random() * 10),
        isNew: Math.random() > 0.7 // Randomly mark some as new
      })));
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(refreshNews, 120000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredNews = () => {
    let filtered = newsArticles;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    // Filter by age group
    filtered = filtered.filter(article => article.ageAppropriate.includes(ageGroup));
    
    // Sort by newest first
    return filtered.sort((a, b) => {
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });
  };

  const handleLike = (articleId: number) => {
    setNewsArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 }
        : article
    ));
  };

  const handleShare = (articleId: number) => {
    const article = newsArticles.find(a => a.id === articleId);
    if (article) {
      navigator.clipboard.writeText(`Check out this cool news: ${article.title}`);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Kids News - Bangalore 📰
          </h1>
          <p className="text-xl text-gray-700">
            Stay updated with fun and educational news from Bangalore for kids!
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button 
              onClick={refreshNews} 
              disabled={isLoading}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {newsCategories.map((category) => (
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

        {/* News Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredNews().map((article) => (
            <Card key={article.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
              {article.isNew && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  NEW
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-6xl mb-2">{article.image}</div>
                  <div className="text-sm text-gray-500">{article.publishedAt}</div>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                <div className="text-xs text-blue-600 font-medium">{article.location}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{article.summary}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(article.id)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {article.likes}
                    </button>
                    <button
                      onClick={() => handleShare(article.id)}
                      className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredNews().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No news articles found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later!</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default KidsNews;
