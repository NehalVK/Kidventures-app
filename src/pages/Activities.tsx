import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Users, Calendar, Star, ExternalLink } from "lucide-react";
import { useAge } from "../context/AgeContext";

const Activities = () => {
  const { ageGroup } = useAge();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [registrationForm, setRegistrationForm] = useState<{
    isOpen: boolean;
    activity: any;
  }>({
    isOpen: false,
    activity: null
  });

  const openRegistrationForm = (activity: any) => {
    setRegistrationForm({
      isOpen: true,
      activity
    });
  };

  const closeRegistrationForm = () => {
    setRegistrationForm({
      isOpen: false,
      activity: null
    });
  };

  const activityCategories = [
    {
      id: "workshops",
      title: "Workshops & Classes",
      description: "Creative workshops and skill-building classes",
      icon: "🎨",
      color: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: "outdoor",
      title: "Outdoor Adventures",
      description: "Nature camps and outdoor activities",
      icon: "🏕️",
      color: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: "sports",
      title: "Sports & Fitness",
      description: "Sports camps and fitness activities",
      icon: "⚽",
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: "science",
      title: "Science & Technology",
      description: "STEM workshops and science camps",
      icon: "🔬",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600"
    },
    {
      id: "arts",
      title: "Arts & Crafts",
      description: "Creative arts and crafting sessions",
      icon: "🎭",
      color: "bg-gradient-to-br from-pink-400 to-pink-600"
    },
    {
      id: "music",
      title: "Music & Dance",
      description: "Musical instruments and dance classes",
      icon: "🎵",
      color: "bg-gradient-to-br from-orange-400 to-orange-600"
    }
  ];

  const sampleActivities = [
    {
      title: "Art & Craft Workshop",
      location: "Community Center",
      date: "March 15, 2024",
      time: "10:00 AM - 12:00 PM",
      ageRange: "6-12 years",
      price: "₹500",
      rating: 4.8,
      description: "Learn pottery, painting, and creative crafts with professional instructors.",
      category: "workshops"
    },
    {
      title: "Nature Photography Camp",
      location: "Lalbagh Botanical Garden",
      date: "March 20, 2024",
      time: "8:00 AM - 4:00 PM",
      ageRange: "10-16 years",
      price: "₹1200",
      rating: 4.9,
      description: "Explore nature while learning photography basics and wildlife observation.",
      category: "outdoor"
    },
    {
      title: "Football Training Camp",
      location: "Sports Complex",
      date: "March 18, 2024",
      time: "4:00 PM - 6:00 PM",
      ageRange: "8-14 years",
      price: "₹800",
      rating: 4.7,
      description: "Professional football coaching with focus on skills and teamwork.",
      category: "sports"
    },
    {
      title: "Robotics Workshop",
      location: "Tech Hub",
      date: "March 22, 2024",
      time: "2:00 PM - 5:00 PM",
      ageRange: "10-15 years",
      price: "₹1500",
      rating: 4.9,
      description: "Build and program your own robot using Arduino and sensors.",
      category: "science"
    }
  ];

  const getActivitiesByCategory = (categoryId: string) => {
    return sampleActivities.filter(activity => activity.category === categoryId);
  };

  const renderCategorySelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activityCategories.map((category) => (
        <Card
          key={category.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${category.color} text-white border-none shadow-xl`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <CardTitle className="text-2xl">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/90">{category.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderActivityList = () => {
    const currentCategory = activityCategories.find(cat => cat.id === selectedCategory);
    const activities = getActivitiesByCategory(selectedCategory!);
    
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
          <div className="text-4xl">{currentCategory?.icon}</div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentCategory?.title}</h2>
          <p className="text-gray-600">{currentCategory?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{activity.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{activity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{activity.ageRange}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">{activity.price}</div>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => openRegistrationForm(activity)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities found</h3>
            <p className="text-gray-500">Check back soon for new activities in this category!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Kids Activities & Events 🎪
          </h1>
          <p className="text-xl text-gray-700">
            Discover amazing activities and events happening near you!
          </p>
        </div>

        {selectedCategory ? renderActivityList() : renderCategorySelector()}

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Registration Form Modal */}
      {registrationForm.activity && (
        <RegistrationForm
          isOpen={registrationForm.isOpen}
          onClose={closeRegistrationForm}
          activity={registrationForm.activity}
        />
      )}
    </div>
  );
};

export default Activities;
