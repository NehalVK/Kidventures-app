
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Trophy, Star, Medal, Award, Target, Zap, Crown, BookOpen, Palette, Globe, Heart, Music, Search, Eye, Lightbulb } from "lucide-react";

const Leaderboard = () => {
  const leaders = [
    { 
      id: 1, 
      name: "Super Sarah", 
      points: 145, 
      avatar: "👧",
      categories: {
        health: 25,
        stories: 30,
        arts: 20,
        geography: 15,
        language: 20,
        riddles: 15,
        pictures: 10,
        videos: 10
      },
      badges: ["first_place", "story_master", "health_hero", "creative_genius"]
    },
    { 
      id: 2, 
      name: "Brainy Ben", 
      points: 132, 
      avatar: "👦",
      categories: {
        health: 20,
        stories: 25,
        arts: 15,
        geography: 25,
        language: 22,
        riddles: 20,
        pictures: 5,
        videos: 0
      },
      badges: ["second_place", "geography_expert", "riddle_solver"]
    },
    { 
      id: 3, 
      name: "Amazing Alex", 
      points: 128, 
      avatar: "👧",
      categories: {
        health: 18,
        stories: 20,
        arts: 25,
        geography: 20,
        language: 18,
        riddles: 12,
        pictures: 15,
        videos: 0
      },
      badges: ["third_place", "art_champion", "picture_hunter"]
    },
    { 
      id: 4, 
      name: "Clever Carlos", 
      points: 115, 
      avatar: "👦",
      categories: {
        health: 15,
        stories: 18,
        arts: 12,
        geography: 18,
        language: 20,
        riddles: 18,
        pictures: 8,
        videos: 6
      },
      badges: ["language_lover", "consistent_learner"]
    },
    { 
      id: 5, 
      name: "Jumping Jack", 
      points: 109, 
      avatar: "👦",
      categories: {
        health: 22,
        stories: 15,
        arts: 10,
        geography: 12,
        language: 15,
        riddles: 10,
        pictures: 15,
        videos: 10
      },
      badges: ["health_hero", "active_explorer"]
    }
  ];

  const categoryData = [
    { name: "Health", points: 100, color: "#10b981", icon: Heart },
    { name: "Stories", points: 108, color: "#8b5cf6", icon: BookOpen },
    { name: "Arts", points: 82, color: "#ec4899", icon: Palette },
    { name: "Geography", points: 90, color: "#3b82f6", icon: Globe },
    { name: "Language", points: 95, color: "#f97316", icon: Search },
    { name: "Riddles", points: 75, color: "#eab308", icon: Lightbulb },
    { name: "Pictures", points: 53, color: "#14b8a6", icon: Eye },
    { name: "Videos", points: 26, color: "#6366f1", icon: Music }
  ];

  const weeklyProgress = [
    { week: "Week 1", points: 45 },
    { week: "Week 2", points: 62 },
    { week: "Week 3", points: 78 },
    { week: "Week 4", points: 95 },
    { week: "Week 5", points: 108 }
  ];

  const badgeDefinitions = {
    first_place: { name: "Champion", icon: Crown, color: "bg-yellow-500", description: "1st Place Winner" },
    second_place: { name: "Runner Up", icon: Medal, color: "bg-gray-400", description: "2nd Place Winner" },
    third_place: { name: "Bronze Star", icon: Award, color: "bg-amber-600", description: "3rd Place Winner" },
    story_master: { name: "Story Master", icon: BookOpen, color: "bg-purple-500", description: "Story Expert" },
    health_hero: { name: "Health Hero", icon: Heart, color: "bg-green-500", description: "Health Champion" },
    creative_genius: { name: "Creative Genius", icon: Palette, color: "bg-pink-500", description: "Art Master" },
    geography_expert: { name: "Geography Expert", icon: Globe, color: "bg-blue-500", description: "World Explorer" },
    riddle_solver: { name: "Riddle Solver", icon: Lightbulb, color: "bg-yellow-500", description: "Puzzle Master" },
    art_champion: { name: "Art Champion", icon: Palette, color: "bg-pink-600", description: "Creative Leader" },
    picture_hunter: { name: "Picture Hunter", icon: Eye, color: "bg-teal-500", description: "Visual Expert" },
    language_lover: { name: "Language Lover", icon: Search, color: "bg-orange-500", description: "Word Master" },
    consistent_learner: { name: "Consistent Learner", icon: Target, color: "bg-indigo-500", description: "Daily Achiever" },
    active_explorer: { name: "Active Explorer", icon: Zap, color: "bg-emerald-500", description: "Adventure Seeker" }
  };

  const chartConfig = {
    points: {
      label: "Points",
      color: "hsl(var(--chart-1))",
    },
  };

  const renderBadge = (badgeKey: string) => {
    const badge = badgeDefinitions[badgeKey as keyof typeof badgeDefinitions];
    if (!badge) return null;
    
    const IconComponent = badge.icon;
    return (
      <div key={badgeKey} className={`${badge.color} text-white p-2 rounded-lg flex flex-col items-center gap-1 min-w-[80px]`}>
        <IconComponent size={20} />
        <span className="text-xs font-bold text-center">{badge.name}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-kidyellow">Leaderboard & Analytics</h1>
        
        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-kidyellow to-kidorange p-4">
                <h2 className="text-2xl font-bold text-white text-center">Top Explorers</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {leaders.map((leader, index) => (
                    <div 
                      key={leader.id} 
                      className={`flex items-center p-4 rounded-xl ${
                        index === 0 ? "bg-yellow-100 border-2 border-yellow-400" : 
                        index === 1 ? "bg-gray-100 border-2 border-gray-400" : 
                        index === 2 ? "bg-amber-100 border-2 border-amber-700" : 
                        "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="text-2xl mr-4 font-bold">{index + 1}</div>
                      <div className="text-3xl mr-4">{leader.avatar}</div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg">{leader.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {leader.badges.slice(0, 3).map(badgeKey => {
                            const badge = badgeDefinitions[badgeKey as keyof typeof badgeDefinitions];
                            if (!badge) return null;
                            const IconComponent = badge.icon;
                            return (
                              <div key={badgeKey} className={`${badge.color} text-white p-1 rounded text-xs`}>
                                <IconComponent size={12} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="bg-kidpurple text-white px-4 py-2 rounded-full font-bold">
                        {leader.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="points" fill="#8884d8">
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="text-purple-500" />
                    Activity Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="points"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-green-500" />
                  Weekly Progress Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgress}>
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="points" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="text-yellow-500" />
                      Achievement Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(badgeDefinitions).map(([key, badge]) => {
                        const IconComponent = badge.icon;
                        return (
                          <div key={key} className={`${badge.color} text-white p-3 rounded-lg flex flex-col items-center gap-2`}>
                            <IconComponent size={24} />
                            <span className="text-xs font-bold text-center">{badge.name}</span>
                            <span className="text-xs opacity-90 text-center">{badge.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Medal className="text-blue-500" />
                      Top Achievers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaders.slice(0, 3).map((leader, index) => (
                        <div key={leader.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{leader.avatar}</span>
                          <div className="flex-grow">
                            <h4 className="font-bold">{leader.name}</h4>
                            <div className="flex gap-1 mt-1">
                              {leader.badges.map(badgeKey => renderBadge(badgeKey))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Leaderboard;
