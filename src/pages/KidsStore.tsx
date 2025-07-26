import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Star, Trophy, Gift, ShoppingCart, Coins, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useAge } from "../context/AgeContext";

const KidsStore = () => {
  const { ageGroup } = useAge();
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("points");

  const categories = [
    { id: "all", title: "All Items", emoji: "🛍️" },
    { id: "toys", title: "Toys & Games", emoji: "🧸" },
    { id: "books", title: "Books", emoji: "📚" },
    { id: "art", title: "Art Supplies", emoji: "🎨" },
    { id: "digital", title: "Digital Rewards", emoji: "💎" },
    { id: "experiences", title: "Experiences", emoji: "🎪" }
  ];

  const storeItems = [
    {
      id: 1,
      name: "Educational Puzzle Set",
      description: "50-piece puzzle featuring world landmarks",
      category: "toys",
      points: 500,
      priceInRupees: "₹299",
      originalPrice: "₹399",
      image: "🧩",
      inStock: true,
      ageRange: ["5-7", "8-10"],
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Science Experiment Kit",
      description: "10 safe experiments for young scientists",
      category: "toys",
      points: 800,
      priceInRupees: "₹599",
      originalPrice: "₹799",
      image: "🔬",
      inStock: true,
      ageRange: ["8-10", "11-15"],
      rating: 4.9,
      reviews: 87
    },
    {
      id: 3,
      name: "Adventure Story Collection",
      description: "5 exciting adventure books for young readers",
      category: "books",
      points: 300,
      priceInRupees: "₹199",
      originalPrice: "₹299",
      image: "📖",
      inStock: true,
      ageRange: ["5-7", "8-10", "11-15"],
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Art & Craft Mega Kit",
      description: "Complete art supplies with 50+ items",
      category: "art",
      points: 600,
      priceInRupees: "₹449",
      originalPrice: "₹599",
      image: "🎨",
      inStock: true,
      ageRange: ["5-7", "8-10", "11-15"],
      rating: 4.8,
      reviews: 203
    },
    {
      id: 5,
      name: "Premium Avatar Costume",
      description: "Unlock special avatar outfit for your profile",
      category: "digital",
      points: 200,
      priceInRupees: "₹99",
      originalPrice: "₹149",
      image: "👗",
      inStock: true,
      ageRange: ["5-7", "8-10", "11-15"],
      rating: 4.5,
      reviews: 89
    },
    {
      id: 6,
      name: "Zoo Visit Experience",
      description: "Free entry ticket to local zoo",
      category: "experiences",
      points: 1000,
      priceInRupees: "₹299",
      originalPrice: "₹399",
      image: "🦁",
      inStock: true,
      ageRange: ["5-7", "8-10", "11-15"],
      rating: 4.9,
      reviews: 67
    },
    {
      id: 7,
      name: "Musical Keyboard",
      description: "37-key electronic keyboard with learning modes",
      category: "toys",
      points: 1200,
      priceInRupees: "₹899",
      originalPrice: "₹1199",
      image: "🎹",
      inStock: false,
      ageRange: ["8-10", "11-15"],
      rating: 4.8,
      reviews: 45
    },
    {
      id: 8,
      name: "Digital Badge Collection",
      description: "Unlock 10 special achievement badges",
      category: "digital",
      points: 150,
      priceInRupees: "₹49",
      originalPrice: "₹99",
      image: "🏅",
      inStock: true,
      ageRange: ["5-7", "8-10", "11-15"],
      rating: 4.6,
      reviews: 234
    }
  ];

  const getFilteredItems = () => {
    let filtered = storeItems;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by age group
    filtered = filtered.filter(item => item.ageRange.includes(ageGroup));
    
    return filtered.sort((a, b) => {
      if (a.inStock && !b.inStock) return -1;
      if (!a.inStock && b.inStock) return 1;
      return a.points - b.points;
    });
  };

  const canAfford = (points: number) => {
    return userPoints >= points;
  };

  const handleRedeemClick = (item: any) => {
    if (item.inStock) {
      setSelectedItem(item);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = () => {
    if (selectedPaymentMethod === "points" && canAfford(selectedItem.points)) {
      setUserPoints(prev => prev - selectedItem.points);
      alert(`🎉 Congratulations! You've successfully redeemed ${selectedItem.name} using ${selectedItem.points} points!`);
    } else if (selectedPaymentMethod !== "points") {
      // Simulate payment gateway redirect
      alert(`Redirecting to payment gateway for ${selectedItem.priceInRupees}...`);
      // In a real app, this would redirect to Stripe/Razorpay
    }
    setShowPaymentModal(false);
    setSelectedItem(null);
  };

  const handleEarnMorePoints = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Kids Rewards Store 🛒
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Use your points to get amazing rewards!
          </p>
          
          {/* User Points Display */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl shadow-lg inline-block mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8 text-yellow-600" />
                <div>
                  <div className="text-3xl font-bold text-yellow-800">{userPoints.toLocaleString()}</div>
                  <div className="text-sm text-yellow-600">Your Points</div>
                </div>
              </div>
              <Button 
                onClick={handleEarnMorePoints}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Earn More Points
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
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

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredItems().map((item) => (
            <Card key={item.id} className={`shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${!item.inStock ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="text-center">
                  <div className="text-6xl mb-4">{item.image}</div>
                  <CardTitle className="text-lg leading-tight mb-2">{item.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {item.description}
                </p>
                
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-600">
                      {item.points.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      {item.priceInRupees}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </div>
                  </div>
                </div>

                {!item.inStock && (
                  <Badge variant="destructive" className="w-full justify-center">
                    Out of Stock
                  </Badge>
                )}

                {item.inStock && (
                  <Button
                    onClick={() => handleRedeemClick(item)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Redeem Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredItems().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try selecting a different category!</p>
          </div>
        )}

        <div className="mt-12 text-center bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Earn More Points? 🌟</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-bold mb-2">Complete Activities</h4>
              <p className="text-sm">Finish games and learning activities</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-bold mb-2">Daily Learning</h4>
              <p className="text-sm">Read stories and solve puzzles daily</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-bold mb-2">Win Competitions</h4>
              <p className="text-sm">Participate in contests and challenges</p>
            </div>
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

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">{selectedItem.image}</div>
                <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                <p className="text-gray-600 text-sm">{selectedItem.description}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant={selectedPaymentMethod === "points" ? "default" : "outline"}
                    onClick={() => setSelectedPaymentMethod("points")}
                    className="h-16 flex flex-col gap-1"
                    disabled={!canAfford(selectedItem.points)}
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5" />
                      <span>Use {selectedItem.points} Points</span>
                    </div>
                    {!canAfford(selectedItem.points) && (
                      <span className="text-xs text-red-500">Not enough points</span>
                    )}
                  </Button>
                  
                  <Button
                    variant={selectedPaymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setSelectedPaymentMethod("card")}  
                    className="h-16 flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Pay {selectedItem.priceInRupees}</span>
                    </div>
                    <span className="text-xs">Credit/Debit Card</span>
                  </Button>
                  
                  <Button
                    variant={selectedPaymentMethod === "upi" ? "default" : "outline"}
                    onClick={() => setSelectedPaymentMethod("upi")}
                    className="h-16 flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      <span>Pay {selectedItem.priceInRupees}</span>
                    </div>
                    <span className="text-xs">UPI Payment</span>
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handlePaymentConfirm} className="flex-1">
                  {selectedPaymentMethod === "points" ? "Redeem with Points" : "Proceed to Pay"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KidsStore;
