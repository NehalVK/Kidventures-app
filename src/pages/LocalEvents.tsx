import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Filter } from "lucide-react";
import { useAge } from "../context/AgeContext";

const LocalEvents = () => {
  const { ageGroup } = useAge();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const eventCategories = [
    { id: "all", title: "All Events", emoji: "🎪" },
    { id: "workshops", title: "Workshops", emoji: "🛠️" },
    { id: "sports", title: "Sports", emoji: "⚽" },
    { id: "arts", title: "Arts & Crafts", emoji: "🎨" },
    { id: "science", title: "Science Fun", emoji: "🔬" },
    { id: "music", title: "Music & Dance", emoji: "🎵" },
    { id: "outdoor", title: "Outdoor Adventures", emoji: "🌳" }
  ];

  const localEvents = [
    {
      id: 1,
      title: "Bangalore Science Festival 2024",
      description: "Interactive science exhibits, live experiments, and planetarium shows at the iconic Visvesvaraya Industrial and Technological Museum.",
      category: "science",
      location: "Visvesvaraya Museum",
      address: "Kasturba Road, Bengaluru",
      date: "2024-02-15",
      time: "10:00 AM - 6:00 PM",
      ageRange: ["8-10", "11-15"],
      price: "₹100 per child",
      priceInRupees: "₹100",
      maxParticipants: 500,
      registered: 285,
      organizer: "Karnataka Science & Technology Academy",
      image: "🔬",
      rating: 4.9,
      isPopular: true,
      tags: ["Educational", "Interactive", "Hands-on"],
      venue: "Visvesvaraya Museum"
    },
    {
      id: 2,
      title: "Cubbon Park Nature Walk & Art Workshop",
      description: "Guided nature walk followed by leaf art and nature journaling. Learn about Bangalore's urban biodiversity!",
      category: "outdoor",
      location: "Cubbon Park",
      address: "Cubbon Park, MG Road Area, Bengaluru",
      date: "2024-02-08",
      time: "7:00 AM - 10:00 AM",
      ageRange: ["5-7", "8-10", "11-15"],
      price: "₹200 per family",
      priceInRupees: "₹200",
      maxParticipants: 60,
      registered: 45,
      organizer: "Bangalore Nature Club",
      image: "🌳",
      rating: 4.8,
      isPopular: true,
      tags: ["Nature", "Art", "Family-friendly"],
      venue: "Cubbon Park"
    },
    {
      id: 3,
      title: "Young Entrepreneurs Fair - Orion Mall",
      description: "Kids showcase their business ideas and mini enterprises. Young entrepreneurs aged 8-15 can participate and win prizes!",
      category: "workshops",
      location: "Orion Mall",
      address: "Dr Rajkumar Road, Rajajinagar, Bengaluru",
      date: "2024-02-12",
      time: "11:00 AM - 5:00 PM",
      ageRange: ["8-10", "11-15"],
      price: "₹300 participation fee",
      priceInRupees: "₹300",
      maxParticipants: 80,
      registered: 62,
      organizer: "Young Minds Bangalore",
      image: "💼",
      rating: 4.7,
      isPopular: false,
      tags: ["Business", "Innovation", "Competition"],
      venue: "Orion Mall"
    },
    {
      id: 4,
      title: "Bangalore International Kids Film Festival",
      description: "Watch age-appropriate films from around the world, followed by filmmaking workshops and meet with young directors.",
      category: "arts",
      location: "PVR Cinemas Forum Mall",
      address: "Hosur Road, Koramangala, Bengaluru",
      date: "2024-02-20",
      time: "2:00 PM - 8:00 PM",
      ageRange: ["8-10", "11-15"],
      price: "₹250 per child",
      priceInRupees: "₹250",
      maxParticipants: 200,
      registered: 156,
      organizer: "Bangalore Film Society",
      image: "🎬",
      rating: 4.8,
      isPopular: true,
      tags: ["Cinema", "International", "Creative"],
      venue: "PVR Forum Mall"
    },
    {
      id: 5,
      title: "Junior Cricket Tournament - Chinnaswamy Stadium",
      description: "Under-12 and Under-15 cricket tournament at the iconic M Chinnaswamy Stadium. Experience playing where Virat Kohli plays!",
      category: "sports",
      location: "M Chinnaswamy Stadium",
      address: "Cubbon Park, Queens Road, Bengaluru",
      date: "2024-02-25",
      time: "8:00 AM - 5:00 PM",
      ageRange: ["8-10", "11-15"],
      price: "₹500 registration",
      priceInRupees: "₹500",
      maxParticipants: 120,
      registered: 98,
      organizer: "Karnataka State Cricket Association",
      image: "🏏",
      rating: 4.9,
      isPopular: true,
      tags: ["Cricket", "Tournament", "Stadium experience"],
      venue: "Chinnaswamy Stadium"
    },
    {
      id: 6,
      title: "Bangalore Kids Coding Bootcamp",
      description: "3-day intensive coding workshop at the heart of India's Silicon Valley. Learn Scratch, Python basics, and create your first app!",
      category: "workshops",
      location: "Microsoft Office Bengaluru",
      address: "Vigyan, RMZ Infinity, Old Madras Road, Bengaluru",
      date: "2024-02-18",
      time: "9:00 AM - 4:00 PM",
      ageRange: ["11-15"],
      price: "₹1500 for 3 days",
      priceInRupees: "₹1500",
      maxParticipants: 40,
      registered: 35,
      organizer: "Code for Kids Bangalore",
      image: "💻",
      rating: 4.9,
      isPopular: true,
      tags: ["Technology", "Programming", "3-day workshop"],
      venue: "Microsoft Office"
    },
    {
      id: 7,
      title: "Lalbagh Botanical Garden Explorer Program",
      description: "Discover rare plants, learn about conservation, and participate in a treasure hunt through India's most beautiful botanical garden.",
      category: "outdoor",
      location: "Lalbagh Botanical Garden",
      address: "Mavalli, Bengaluru",
      date: "2024-02-10",
      time: "6:00 AM - 9:00 AM",
      ageRange: ["5-7", "8-10", "11-15"],
      price: "₹150 per child",
      priceInRupees: "₹150",
      maxParticipants: 80,
      registered: 67,
      organizer: "Lalbagh Horticulture Society",
      image: "🌺",
      rating: 4.8,
      isPopular: false,
      tags: ["Botany", "Conservation", "Treasure hunt"],
      venue: "Lalbagh Gardens"
    },
    {
      id: 8,
      title: "Bangalore Children's Music Festival",
      description: "Young musicians perform classical and contemporary music. Open mic session for kids, music workshops, and instrument trials.",
      category: "music",
      location: "Chowdiah Memorial Hall",
      address: "Gayathri Devi Park Extension, Malleswaram, Bengaluru",
      date: "2024-02-22",
      time: "4:00 PM - 8:00 PM",
      ageRange: ["5-7", "8-10", "11-15"],
      price: "Free entry",
      priceInRupees: "₹0",
      maxParticipants: 300,
      registered: 189,
      organizer: "Bangalore Music Academy",
      image: "🎵",
      rating: 4.7,
      isPopular: false,
      tags: ["Music", "Performance", "Open mic"],
      venue: "Chowdiah Memorial Hall"
    }
  ];

  const getFilteredEvents = () => {
    let filtered = localEvents;
    
    if (selectedFilter !== "all") {
      filtered = filtered.filter(event => event.category === selectedFilter);
    }
    
    filtered = filtered.filter(event => event.ageRange.includes(ageGroup));
    
    if (selectedDate !== "all") {
      const today = new Date();
      
      switch(selectedDate) {
        case "today":
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate.toDateString() === today.toDateString();
          });
          break;
        case "thisWeek":
          const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate >= today && eDate <= nextWeek;
          });
          break;
        case "thisMonth":
          filtered = filtered.filter(event => {
            const eDate = new Date(event.date);
            return eDate.getMonth() === today.getMonth() && eDate.getFullYear() === today.getFullYear();
          });
          break;
      }
    }
    
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getAvailableSpots = (event: any) => {
    return event.maxParticipants - event.registered;
  };

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Local Events - Bangalore 📅
          </h1>
          <p className="text-xl text-gray-700">
            Discover exciting activities and events in Bangalore for kids!
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap justify-center gap-3">
            {eventCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedFilter === category.id ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setSelectedFilter(category.id)}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.title}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-center gap-3">
            <Button
              variant={selectedDate === "all" ? "default" : "outline"}
              onClick={() => setSelectedDate("all")}
              size="sm"
            >
              All Dates
            </Button>
            <Button
              variant={selectedDate === "thisWeek" ? "default" : "outline"}
              onClick={() => setSelectedDate("thisWeek")}
              size="sm"
            >
              This Week
            </Button>
            <Button
              variant={selectedDate === "thisMonth" ? "default" : "outline"}
              onClick={() => setSelectedDate("thisMonth")}
              size="sm"
            >
              This Month
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredEvents().map((event) => (
            <Card key={event.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
              {event.isPopular && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-6xl mb-2">{event.image}</div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      {event.rating}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">{event.venue}</span>
                      <span className="text-xs text-gray-500">{event.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{getAvailableSpots(event)} spots left</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-green-800">{event.priceInRupees}</div>
                  <div className="text-sm text-gray-600">Organized by {event.organizer}</div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleRegisterClick(event)}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredEvents().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new events!</p>
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

      {selectedEvent && (
        <RegistrationForm
          isOpen={isRegistrationOpen}
          onClose={handleCloseRegistration}
          activity={selectedEvent}
        />
      )}
    </div>
  );
};

export default LocalEvents;
