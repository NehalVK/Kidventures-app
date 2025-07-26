
import { Shield, Heart, Users, AlertCircle } from "lucide-react";

const SafetyNotice = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-green-800 mb-3">
            🛡️ Safe Learning Environment
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-800">Child-Safe Content:</strong>
                  <p className="text-gray-600">All activities are carefully reviewed for age-appropriateness and educational value.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-800">Parental Control:</strong>
                  <p className="text-gray-600">Parents have full oversight and can monitor their child's learning progress.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-800">Privacy Protected:</strong>
                  <p className="text-gray-600">No personal information sharing, behavioral advertising, or data misuse.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-800">Report Issues:</strong>
                  <p className="text-gray-600">Easy reporting system for any safety or content concerns.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white/70 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>For Parents:</strong> Contact us anytime at{" "}
              <a href="mailto:kidventuresapp@gmail.com" className="text-blue-600 hover:underline">
                kidventuresapp@gmail.com
              </a>{" "}
              for safety concerns or questions. We respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyNotice;
