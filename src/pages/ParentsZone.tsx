
import { useState } from "react";
import { Clock, Shield, BarChart3, Wifi, Lock, User, Bell, Eye, Download, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "../components/Header";

const ParentsZone = () => {
  const [dailyTimeLimit, setDailyTimeLimit] = useState([60]);
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [safeMode, setSafeMode] = useState(true);
  const [selectedAge, setSelectedAge] = useState("8-10");

  // Mock progress data
  const weeklyProgress = [
    { day: "Mon", minutes: 45, activities: 8, completed: true },
    { day: "Tue", minutes: 60, activities: 12, completed: true },
    { day: "Wed", minutes: 30, activities: 6, completed: false },
    { day: "Thu", minutes: 55, activities: 10, completed: true },
    { day: "Fri", minutes: 40, activities: 7, completed: false },
    { day: "Sat", minutes: 75, activities: 15, completed: true },
    { day: "Sun", minutes: 50, activities: 9, completed: true }
  ];

  const recentActivities = [
    { category: "Health & Wellness", time: "10 min", points: 50, status: "completed" },
    { category: "Creativity & Arts", time: "25 min", points: 120, status: "completed" },
    { category: "Story Telling", time: "15 min", points: 75, status: "in-progress" },
    { category: "Language Learning", time: "20 min", points: 90, status: "completed" }
  ];

  const achievements = [
    { title: "Reading Champion", description: "Completed 10 stories", date: "2024-06-08" },
    { title: "Math Wizard", description: "Solved 50 puzzles", date: "2024-06-07" },
    { title: "Creative Artist", description: "Finished 5 art projects", date: "2024-06-06" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Parents Zone 👨‍👩‍👧‍👦
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Monitor your child's progress and manage their learning experience
          </p>
        </div>

        <Tabs defaultValue="controls" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="controls" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm">
              <Shield className="w-4 h-4" />
              <span>Controls</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 text-xs md:text-sm">
              <Lock className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Time Limits */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <h3 className="text-lg md:text-xl font-bold">Daily Time Limits</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Maximum daily usage: {dailyTimeLimit[0]} minutes
                    </label>
                    <Slider
                      value={dailyTimeLimit}
                      onValueChange={setDailyTimeLimit}
                      max={180}
                      min={15}
                      step={15}
                      className="w-full"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    Recommended: 60-90 minutes for ages 8-10
                  </div>
                </div>
              </Card>

              {/* Content Controls */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  <h3 className="text-lg md:text-xl font-bold">Content Controls</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Age Group
                    </label>
                    <Select value={selectedAge} onValueChange={setSelectedAge}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-7">Ages 5-7</SelectItem>
                        <SelectItem value="8-10">Ages 8-10</SelectItem>
                        <SelectItem value="11-15">Ages 11-15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Safe Mode</span>
                    <Switch checked={safeMode} onCheckedChange={setSafeMode} />
                  </div>
                </div>
              </Card>

              {/* Offline Mode */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wifi className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  <h3 className="text-lg md:text-xl font-bold">Offline Mode</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Offline Activities</p>
                      <p className="text-sm text-gray-600">Allow access without internet</p>
                    </div>
                    <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
                  </div>
                  {offlineMode && (
                    <Button variant="outline" className="w-full">
                      Download Content for Offline Use
                    </Button>
                  )}
                </div>
              </Card>

              {/* Notifications */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  <h3 className="text-lg md:text-xl font-bold">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Progress Notifications</p>
                      <p className="text-sm text-gray-600">Get updates on achievements</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4 md:space-y-6">
            {/* Weekly Progress - Fixed */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Progress Report
              </h3>
              
              {/* Weekly Overview */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-green-600">355m</div>
                  <div className="text-xs md:text-sm text-gray-600">Total Time</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">67</div>
                  <div className="text-xs md:text-sm text-gray-600">Activities</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-purple-600">485</div>
                  <div className="text-xs md:text-sm text-gray-600">Points Earned</div>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Daily Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex md:flex-col items-center md:items-stretch gap-2 md:gap-0 p-2 md:p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 md:text-center md:mb-2">{day.day}</div>
                      <div className="flex-1 md:flex-none">
                        <div className="flex md:flex-col items-center md:items-stretch gap-2 md:gap-1">
                          <Badge variant={day.completed ? "default" : "secondary"} className="text-xs">
                            {day.minutes}m
                          </Badge>
                          <div className="text-xs text-gray-600 md:text-center">{day.activities} activities</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{activity.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-600">Duration: {activity.time}</p>
                        <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+{activity.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl">🏆</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Privacy Controls */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  <h3 className="text-lg md:text-xl font-bold">Privacy & Safety</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Collection</p>
                      <p className="text-sm text-gray-600">Minimal data for progress tracking</p>
                    </div>
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">External Links</p>
                      <p className="text-sm text-gray-600">Block external content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chat Features</p>
                      <p className="text-sm text-gray-600">Disable all chat functions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>

              {/* Account Management - Fixed */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                  <h3 className="text-lg md:text-xl font-bold">Account Management</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="w-4 h-4" />
                    Export Progress Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset All Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                    Delete Account Data
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Account deletion is permanent and cannot be undone. All progress and data will be lost.
                  </p>
                </div>
              </Card>
            </div>

            {/* Safety Guidelines */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">Safety Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="space-y-2">
                  <p>• All content is reviewed and age-appropriate</p>
                  <p>• No personal information is collected from children</p>
                  <p>• Activities are designed to be educational and fun</p>
                </div>
                <div className="space-y-2">
                  <p>• Screen time recommendations are built into the app</p>
                  <p>• Parents have full control over all settings and data</p>
                  <p>• Regular security updates and monitoring</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ParentsZone;
