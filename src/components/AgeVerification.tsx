
import { useState } from "react";
import { Shield, Users, AlertTriangle, Lock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAge } from "@/context/AgeContext";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [isParent, setIsParent] = useState<boolean | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const { setAgeGroup } = useAge();

  const handleParentVerification = () => {
    if (hasConsent) {
      onVerified();
    }
  };

  const handleChildAccess = (ageGroup: "2-5" | "5-7" | "8-10" | "11-15") => {
    setAgeGroup(ageGroup);
    onVerified();
  };

  if (isParent === null) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Family-Safe App Verification</h2>
            <p className="text-gray-600">
              Kidventures is Google Play Family Policy compliant. Please verify your role for age-appropriate experience.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Family Policy Certified</span>
            </div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• No inappropriate content or ads</li>
              <li>• COPPA compliant privacy protection</li>
              <li>• Educational content only</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setIsParent(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
            >
              <Users className="w-5 h-5 mr-2" />
              I am a Parent/Guardian
            </Button>

            <Button 
              onClick={() => setIsParent(false)}
              variant="outline"
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 py-3"
            >
              I am a Child (with parent permission)
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            This verification ensures compliance with child safety regulations and provides age-appropriate content.
          </p>
        </div>
      </div>
    );
  }

  if (isParent) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-2xl mx-4 shadow-2xl">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Parental Consent Required</h2>
            <p className="text-gray-600">
              As a Google Play Family Policy compliant app, we require explicit parental consent
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Family Policy Compliance:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• COPPA compliant data handling</li>
              <li>• No behavioral advertising or tracking</li>
              <li>• Age-appropriate educational content only</li>
              <li>• Secure, encrypted data protection</li>
              <li>• Parental controls and oversight</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Data Collection (Minimal):</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Age range selection for content appropriateness</li>
              <li>• Learning progress (stored locally when possible)</li>
              <li>• Technical data for app functionality only</li>
              <li>• No personal information sharing with third parties</li>
            </ul>
          </div>

          <div className="flex items-start space-x-3 mb-6">
            <input 
              type="checkbox" 
              id="consent" 
              checked={hasConsent}
              onChange={(e) => setHasConsent(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I understand that this app is Google Play Family Policy compliant. I have read the Privacy Policy 
              and Terms of Service. I provide explicit consent for my child to use Kidventures and understand 
              I can withdraw this consent at any time by contacting kidventuresapp@gmail.com
            </label>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={() => setIsParent(null)}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleParentVerification}
              disabled={!hasConsent}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Provide Consent
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Age Group</h2>
          <p className="text-gray-600">
            Choose your age to get the perfect learning experience designed just for you!
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2 mb-1">
            <Lock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">Parent Permission Required</span>
          </div>
          <p className="text-xs text-yellow-700">
            This app follows strict child safety guidelines. Make sure you have your parent's permission!
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => handleChildAccess("2-5")}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3"
          >
            Ages 2-5 (Early Learning) 🌱
          </Button>
          
          <Button 
            onClick={() => handleChildAccess("5-7")}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white py-3"
          >
            Ages 5-7 (Elementary) 📚
          </Button>
          
          <Button 
            onClick={() => handleChildAccess("8-10")}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white py-3"
          >
            Ages 8-10 (Middle) 🎯
          </Button>
          
          <Button 
            onClick={() => handleChildAccess("11-15")}
            className="w-full bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-3"
          >
            Ages 11-15 (Advanced) 🚀
          </Button>
        </div>

        <div className="mt-6">
          <Button 
            onClick={() => setIsParent(null)}
            variant="outline"
            className="w-full"
          >
            Back
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Always ask your parent or guardian for permission before using any app. Your safety is our priority!
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;
