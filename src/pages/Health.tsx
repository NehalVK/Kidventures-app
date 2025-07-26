
import { Heart, Zap, Smile, Moon, Calendar, Trophy, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Health = () => {
  const [points, setPoints] = useState(0);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [exerciseMinutes, setExerciseMinutes] = useState(0);
  const [healthyFoods, setHealthyFoods] = useState<string[]>([]);
  const [moodCheckins, setMoodCheckins] = useState<string[]>([]);
  const [stretchingDone, setStretchingDone] = useState<string[]>([]);
  const [breathingExercises, setBreathingExercises] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [dailyGoals, setDailyGoals] = useState({
    water: 8,
    exercise: 30,
    healthyFoods: 5,
    sleep: 9
  });
  const { toast } = useToast();

  // Get today's date for tracking
  const today = new Date().toDateString();

  // Calculate progress percentages
  const getProgress = () => {
    return {
      water: Math.min((waterGlasses / dailyGoals.water) * 100, 100),
      exercise: Math.min((exerciseMinutes / dailyGoals.exercise) * 100, 100),
      food: Math.min((healthyFoods.length / dailyGoals.healthyFoods) * 100, 100),
      sleep: Math.min((sleepHours / dailyGoals.sleep) * 100, 100),
      overall: Math.min(((waterGlasses / dailyGoals.water + exerciseMinutes / dailyGoals.exercise + healthyFoods.length / dailyGoals.healthyFoods + sleepHours / dailyGoals.sleep) / 4) * 100, 100)
    };
  };

  const progress = getProgress();

  const addWater = () => {
    if (waterGlasses < 8) {
      setWaterGlasses(waterGlasses + 1);
      setPoints(points + 2);
      toast({
        title: "Great hydration! 💧",
        description: "You earned 2 points!",
      });
    }
  };

  const addExercise = () => {
    setExerciseMinutes(exerciseMinutes + 5);
    setPoints(points + 5);
    toast({
      title: "Keep moving! 🏃‍♂️",
      description: "You earned 5 points!",
    });
  };

  const addHealthyFood = (food: string) => {
    if (!healthyFoods.includes(food)) {
      setHealthyFoods([...healthyFoods, food]);
      setPoints(points + 3);
      toast({
        title: "Healthy choice! 🥗",
        description: "You earned 3 points!",
      });
    }
  };

  const addSleep = () => {
    if (sleepHours < 12) {
      setSleepHours(sleepHours + 1);
      setPoints(points + 4);
      toast({
        title: "Good rest! 😴",
        description: "You earned 4 points!",
      });
    }
  };

  const checkMood = (mood: string) => {
    const moodId = `${mood}-${today}`;
    if (!moodCheckins.includes(moodId)) {
      setMoodCheckins([...moodCheckins, moodId]);
      setPoints(points + 4);
      toast({
        title: "Mood checked! 😊",
        description: "You earned 4 points!",
      });
    }
  };

  const doStretching = (exercise: string) => {
    if (!stretchingDone.includes(exercise)) {
      setStretchingDone([...stretchingDone, exercise]);
      setPoints(points + 6);
      toast({
        title: "Great stretching! 🤸‍♂️",
        description: "You earned 6 points!",
      });
    }
  };

  const doBreathing = () => {
    setBreathingExercises(breathingExercises + 1);
    setPoints(points + 8);
    toast({
      title: "Deep breaths! 🧘‍♀️",
      description: "You earned 8 points!",
    });
  };

  const healthyFoodOptions = ["🍎", "🥕", "🥦", "🍌", "🥬", "🍊"];
  const moodOptions = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😤", label: "Energetic" }
  ];

  const stretchingExercises = [
    { name: "Arm Circles", emoji: "🙆‍♂️", description: "Move your arms in circles" },
    { name: "Touch Toes", emoji: "🤾‍♂️", description: "Stretch down to touch your toes" },
    { name: "Neck Rolls", emoji: "🙄", description: "Gently roll your neck side to side" },
    { name: "Jumping Jacks", emoji: "🤸‍♂️", description: "Jump and move arms up and down" }
  ];

  const getHealthGrade = () => {
    if (progress.overall >= 90) return { grade: "A+", color: "text-green-600", message: "Excellent!" };
    if (progress.overall >= 80) return { grade: "A", color: "text-green-500", message: "Great job!" };
    if (progress.overall >= 70) return { grade: "B", color: "text-blue-500", message: "Good work!" };
    if (progress.overall >= 60) return { grade: "C", color: "text-yellow-500", message: "Keep trying!" };
    return { grade: "D", color: "text-red-500", message: "You can do better!" };
  };

  const healthGrade = getHealthGrade();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Heart className="text-green-500 text-3xl" />
          <h1 className="text-4xl font-bold text-green-600">Health & Wellness</h1>
        </div>

        {/* Daily Health Progress Report */}
        <Card className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-700 flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6" />
              Daily Health Progress Report - {new Date().toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-blue-500 text-2xl mb-2">💧</div>
                <div className="text-lg font-bold">{Math.round(progress.water)}%</div>
                <div className="text-sm text-gray-600">Water Goal</div>
                <div className={`w-full bg-gray-200 rounded-full h-2 mt-2`}>
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: `${progress.water}%`}}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-orange-500 text-2xl mb-2">🏃‍♂️</div>
                <div className="text-lg font-bold">{Math.round(progress.exercise)}%</div>
                <div className="text-sm text-gray-600">Exercise Goal</div>
                <div className={`w-full bg-gray-200 rounded-full h-2 mt-2`}>
                  <div className="bg-orange-500 h-2 rounded-full transition-all" style={{width: `${progress.exercise}%`}}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-green-500 text-2xl mb-2">🥗</div>
                <div className="text-lg font-bold">{Math.round(progress.food)}%</div>
                <div className="text-sm text-gray-600">Healthy Food Goal</div>
                <div className={`w-full bg-gray-200 rounded-full h-2 mt-2`}>
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{width: `${progress.food}%`}}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-purple-500 text-2xl mb-2">😴</div>
                <div className="text-lg font-bold">{Math.round(progress.sleep)}%</div>
                <div className="text-sm text-gray-600">Sleep Goal</div>
                <div className={`w-full bg-gray-200 rounded-full h-2 mt-2`}>
                  <div className="bg-purple-500 h-2 rounded-full transition-all" style={{width: `${progress.sleep}%`}}></div>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Trophy className="text-yellow-500" size={32} />
                <div>
                  <div className={`text-4xl font-bold ${healthGrade.color}`}>{healthGrade.grade}</div>
                  <div className="text-lg text-gray-600">{healthGrade.message}</div>
                </div>
                <TrendingUp className="text-green-500" size={32} />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">Overall Health Score: {Math.round(progress.overall)}%</div>
              <div className="text-lg font-semibold text-purple-600">💪 Health Points: {points}</div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Health Activities */}
        <div className="max-w-6xl mx-auto grid gap-6">
          
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Water Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">💧 Water Tracker</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl mb-2">
                    {Array.from({length: waterGlasses}, (_, i) => "💧").join(" ")}
                  </div>
                  <p className="text-sm text-gray-600">{waterGlasses}/{dailyGoals.water} glasses today</p>
                </div>
                <Button 
                  onClick={addWater} 
                  disabled={waterGlasses >= dailyGoals.water}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Drink Water (+2 pts)
                </Button>
              </CardContent>
            </Card>

            {/* Exercise Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">🏃 Exercise Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-green-600">{exerciseMinutes}</div>
                  <p className="text-sm text-gray-600">minutes today</p>
                </div>
                <Button 
                  onClick={addExercise}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Add 5 mins (+5 pts)
                </Button>
              </CardContent>
            </Card>

            {/* Sleep Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">😴 Sleep Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-purple-600">{sleepHours}</div>
                  <p className="text-sm text-gray-600">hours last night</p>
                </div>
                <Button 
                  onClick={addSleep}
                  disabled={sleepHours >= 12}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Add Hour (+4 pts)
                </Button>
              </CardContent>
            </Card>

            {/* Healthy Food Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">🥗 Healthy Foods</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl mb-2">
                    {healthyFoods.join(" ")}
                  </div>
                  <p className="text-sm text-gray-600">{healthyFoods.length}/{dailyGoals.healthyFoods} foods eaten</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {healthyFoodOptions.map((food, index) => (
                    <Button
                      key={index}
                      onClick={() => addHealthyFood(food)}
                      disabled={healthyFoods.includes(food)}
                      variant="outline"
                      className="text-2xl h-12"
                    >
                      {food}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mood Check-in */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">😊 How Are You Feeling?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-3">
                  {moodOptions.map((mood, index) => (
                    <Button
                      key={index}
                      onClick={() => checkMood(mood.label)}
                      disabled={moodCheckins.some(m => m.includes(mood.label))}
                      variant="outline"
                      className="flex flex-col gap-2 h-16"
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">+4 points each</p>
              </CardContent>
            </Card>

            {/* Breathing Exercise */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 text-center">🧘‍♀️ Breathing Exercise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-6xl mb-2">🫁</div>
                  <p className="text-sm text-gray-600 mb-4">
                    Take 5 deep breaths: In through nose, out through mouth
                  </p>
                  <div className="text-2xl font-bold text-green-600">{breathingExercises}</div>
                  <p className="text-sm text-gray-600">sessions completed</p>
                </div>
                <Button 
                  onClick={doBreathing}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Start Breathing (+8 pts)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stretching Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 text-center">🤸‍♂️ Stretching Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stretchingExercises.map((exercise, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">{exercise.emoji}</div>
                    <h3 className="font-semibold text-green-600 mb-2">{exercise.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <Button
                      onClick={() => doStretching(exercise.name)}
                      disabled={stretchingDone.includes(exercise.name)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      {stretchingDone.includes(exercise.name) ? "✓ Done!" : "Do It! (+6 pts)"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Health;
