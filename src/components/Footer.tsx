
import { Link } from "react-router-dom";
import { Heart, Shield, Mail, Phone } from "lucide-react";
import FamilyPolicyBadge from "./FamilyPolicyBadge";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-kidblue via-kidpurple to-kidpink text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Family Policy Compliance */}
        <FamilyPolicyBadge />

        {/* Safety Notice */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 text-white flex-shrink-0 mt-1">🛡️</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">
                  Safe Learning Environment for Children
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-pink-200">❤️</span>
                      <div>
                        <strong className="text-white">Age-Appropriate Content:</strong>
                        <p className="text-white/80">All activities are reviewed for educational value and child safety.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-200">👨‍👩‍👧‍👦</span>
                      <div>
                        <strong className="text-white">Parental Oversight:</strong>
                        <p className="text-white/80">Parents can monitor progress and control access.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-orange-200">🔒</span>
                      <div>
                        <strong className="text-white">Privacy Protected:</strong>
                        <p className="text-white/80">No data sharing, behavioral advertising, or misuse.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <span className="text-purple-200">📞</span>
                      <div>
                        <strong className="text-white">24/7 Support:</strong>
                        <p className="text-white/80">Contact kidventuresapp@gmail.com for any concerns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              Kid<span className="text-kidyellow">ventures</span>
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Making learning fun and safe for kids everywhere!
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-300 fill-current" />
              <span>for kids</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/activities" className="text-white/90 hover:text-kidyellow transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-white/90 hover:text-kidyellow transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/puzzle" className="text-white/90 hover:text-kidyellow transition-colors">
                  Puzzles
                </Link>
              </li>
              <li>
                <Link to="/arts" className="text-white/90 hover:text-kidyellow transition-colors">
                  Arts & Crafts
                </Link>
              </li>
            </ul>
          </div>

          {/* Parents Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">For Parents</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/parents-zone" className="text-white/90 hover:text-kidyellow transition-colors">
                  Parents Zone
                </Link>
              </li>
              <li>
                <Link to="/early-parenting" className="text-white/90 hover:text-kidyellow transition-colors">
                  Early Parenting
                </Link>
              </li>
              <li>
                <Link to="/health" className="text-white/90 hover:text-kidyellow transition-colors">
                  Health Tips
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white/90 hover:text-kidyellow transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Safety & Support</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/90">
                <Shield className="w-4 h-4" />
                <span>Kid-Safe Content</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/90">
                <Mail className="w-4 h-4" />
                <span>kidventuresapp@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/90">
                <Phone className="w-4 h-4" />
                <span>+919008460460</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p>&copy; 2024 Kidventures. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <p className="text-xs">Google Play Family Policy Compliant</p>
            </div>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-kidyellow transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-kidyellow transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-kidyellow transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
