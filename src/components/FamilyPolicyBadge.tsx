
import { Shield, Users, Heart, Lock } from "lucide-react";

const FamilyPolicyBadge = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 text-white flex-shrink-0 mt-1">🛡️</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-3">
            Google Play Family Policy Compliant
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-pink-200 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Child-Safe Content:</strong>
                  <p className="text-white/80">All content is age-appropriate and educational.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Parental Controls:</strong>
                  <p className="text-white/80">Parents have full oversight and control.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Lock className="w-4 h-4 text-orange-200 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Privacy Protected:</strong>
                  <p className="text-white/80">COPPA compliant with no data misuse.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-purple-200 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ad-Free Experience:</strong>
                  <p className="text-white/80">No advertisements or behavioral tracking.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <p className="text-xs text-white/90">
              <strong>Family Policy Certification:</strong> This app meets Google Play's Family Policy requirements 
              for child-directed apps, ensuring safe and appropriate content for all age groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyPolicyBadge;
