
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, User, Mail, Phone, MapPin, Calendar, Users, DollarSign } from "lucide-react";

interface Activity {
  title: string;
  location: string;
  date: string;
  time: string;
  ageRange: string;
  price: string;
  description: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
}

const RegistrationForm = ({ isOpen, onClose, activity }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalInfo: "",
    paymentMethod: "card"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a payment processor
    alert("Registration submitted! Payment processing would happen here.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Register for {activity.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activity Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{activity.ageRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-bold text-green-600">{activity.price}</span>
              </div>
            </CardContent>
          </Card>

          {/* Child Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Child Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="childName">Child's Full Name *</Label>
                <Input
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter child's full name"
                />
              </div>
            </CardContent>
          </Card>

          {/* Parent/Guardian Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Parent/Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter parent's name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter home address"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Enter emergency phone number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="medicalInfo">Medical Information/Allergies</Label>
                <Textarea
                  id="medicalInfo"
                  name="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={handleInputChange}
                  placeholder="Any medical conditions, allergies, or special requirements"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  type="button"
                  variant={formData.paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange("card")}
                  className="h-20 flex flex-col gap-1"
                >
                  <CreditCard className="w-6 h-6" />
                  <span>Credit/Debit Card</span>
                </Button>
                <Button
                  type="button"
                  variant={formData.paymentMethod === "upi" ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange("upi")}
                  className="h-20 flex flex-col gap-1"
                >
                  <Phone className="w-6 h-6" />
                  <span>UPI</span>
                </Button>
                <Button
                  type="button"
                  variant={formData.paymentMethod === "cash" ? "default" : "outline"}
                  onClick={() => handlePaymentMethodChange("cash")}
                  className="h-20 flex flex-col gap-1"
                >
                  <DollarSign className="w-6 h-6" />
                  <span>Pay at Venue</span>
                </Button>
              </div>
              
              {formData.paymentMethod === "card" && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <p className="text-sm text-blue-700 mb-2">You will be redirected to secure payment gateway</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Secured by</span>
                    <span className="font-semibold">Stripe</span>
                  </div>
                </div>
              )}
              
              {formData.paymentMethod === "upi" && (
                <div className="p-4 border rounded-lg bg-green-50">
                  <p className="text-sm text-green-700">Pay using any UPI app like PhonePe, GPay, or Paytm</p>
                </div>
              )}
              
              {formData.paymentMethod === "cash" && (
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <p className="text-sm text-yellow-700">Payment can be made at the venue on the day of the activity</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {formData.paymentMethod === "cash" ? "Confirm Registration" : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
