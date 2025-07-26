
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, Users, BookOpen, Shield, Star, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000, 25000];

  const causes = [
    {
      title: "Educational Support",
      description: "Provide learning materials and resources for underprivileged children",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      impact: "₹1000 can provide a child with educational supplies for a month"
    },
    {
      title: "Child Safety Programs",
      description: "Support programs that ensure children's safety and protection",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      impact: "₹2000 can fund safety workshops for 10 children"
    },
    {
      title: "Community Outreach",
      description: "Help us reach more families and communities in need",
      icon: <Users className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      impact: "₹5000 can support community programs for a week"
    }
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount === "custom" ? customAmount : amount;
    
    if (!finalAmount || !donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate donation process
    toast({
      title: "Thank You! 💝",
      description: `Your ${donationType} donation of ₹${finalAmount} is being processed. You'll receive a confirmation email shortly.`,
    });

    // Reset form
    setAmount("");
    setCustomAmount("");
    setDonorInfo({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Support Our Mission 💝
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Help us create a better future for children through education and safety
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-purple-600">
            <Heart className="w-6 h-6 text-red-500" />
            <span>Every donation makes a difference</span>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">Children Helped</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600">Communities Reached</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">₹1.5Cr+</div>
              <p className="text-gray-600">Funds Raised</p>
            </CardContent>
          </Card>
        </div>

        {/* Causes Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Where Your Donation Goes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {causes.map((cause, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${cause.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                    {cause.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{cause.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{cause.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{cause.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Donation Form */}
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Gift className="w-6 h-6" />
              Make a Donation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonate} className="space-y-6">
              {/* Donation Type */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Donation Type</Label>
                <RadioGroup value={donationType} onValueChange={setDonationType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time Donation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly Donation</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Select Amount (₹)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant={amount === amt.toString() ? "default" : "outline"}
                      onClick={() => setAmount(amt.toString())}
                      className="h-12"
                    >
                      ₹{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={amount === "custom" ? "default" : "outline"}
                    onClick={() => setAmount("custom")}
                    className="h-12"
                  >
                    Custom
                  </Button>
                  {amount === "custom" && (
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="h-12"
                    />
                  )}
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Your Information</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share why you're supporting our cause..."
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate ₹{amount === "custom" ? (customAmount || "0") : (amount ? parseInt(amount).toLocaleString() : "0")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <p className="text-gray-600 mb-4">
            Trusted by thousands of donors worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>🔒 Secure Payments</span>
            <span>📧 Email Receipts</span>
            <span>🏆 Verified Charity</span>
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

      <Footer />
    </div>
  );
};

export default Donate;
