
import { Shield, Users, Lock, Heart, AlertTriangle, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Google Play Family Policy Compliant</p>
            <p className="text-sm text-gray-500 mt-2">Last Updated: January 17, 2025</p>
          </div>

          {/* Family Policy Compliance Badge */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-purple-800">Google Play Family Policy Certified</h2>
            </div>
            <p className="text-purple-700 text-sm">
              Kidventures is fully compliant with Google Play's Family Policy, ensuring the highest standards 
              of child safety, privacy protection, and age-appropriate content delivery.
            </p>
          </div>

          {/* COPPA Compliance Section */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">COPPA Compliance</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                Kidventures strictly complies with the Children's Online Privacy Protection Act (COPPA) and 
                Google Play Family Policy requirements:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>We do not knowingly collect personal information from children under 13 without verifiable parental consent</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>All data collection is minimal and necessary for app functionality only</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>No behavioral advertising or tracking of children</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>Parents have full control and access to their child's data</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Minimal Data Collection</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600">✓</span>
                    <span><strong>Age Range:</strong> Selected age group for content appropriateness (2-5, 5-7, 8-10, 11-15)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600">✓</span>
                    <span><strong>Learning Progress:</strong> Educational progress stored locally when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600">✓</span>
                    <span><strong>Technical Data:</strong> App performance and crash reports (anonymized)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-red-800 mb-3">We Do NOT Collect</h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600">✗</span>
                    <span>Names, addresses, or contact information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600">✗</span>
                    <span>Photos, videos, or audio recordings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600">✗</span>
                    <span>Location data or device identifiers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600">✗</span>
                    <span>Behavioral tracking for advertising</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Parental Rights */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Parental Rights & Controls</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">Parents and guardians have complete control:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">1</span>
                  </div>
                  <div>
                    <strong>Review and Access:</strong> View all data associated with your child's account
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">2</span>
                  </div>
                  <div>
                    <strong>Delete Data:</strong> Request deletion of your child's information at any time
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">3</span>
                  </div>
                  <div>
                    <strong>Withdraw Consent:</strong> Revoke permission and disable your child's access
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">4</span>
                  </div>
                  <div>
                    <strong>Monitor Usage:</strong> Track your child's learning progress and time spent
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security & Protection</h2>
            <div className="bg-blue-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Industry-standard encryption for all data transmission and storage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Secure servers with regular security audits and updates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Limited access to data by authorized personnel only</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Immediate breach notification procedures in place</span>
                </li>
              </ul>
            </div>
          </section>

          {/* No Advertising Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Zero Advertising Policy</h2>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                Kidventures maintains a strict no-advertising policy to ensure a safe learning environment:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>No third-party advertisements displayed to children</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>No behavioral advertising or tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>No data sharing with advertising networks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>No interest-based profiling of children</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                For any privacy concerns, data requests, or questions about your child's information:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> kidventuresapp@gmail.com</p>
                <p><strong>Phone:</strong> +919008460460</p>
                <p><strong>Response Time:</strong> Within 24 hours for privacy-related requests</p>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Emergency Privacy Concerns:</strong> For urgent privacy or safety concerns 
                  involving your child, please contact us immediately at kidventuresapp@gmail.com 
                  with "URGENT PRIVACY" in the subject line.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Policy Updates</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700">
                We will notify parents of any material changes to this privacy policy via email 
                and through in-app notifications. Parents will have the opportunity to review 
                changes and withdraw consent if desired. Continued use after notification 
                constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              This Privacy Policy demonstrates our commitment to protecting children's privacy 
              and complying with Google Play Family Policy requirements.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              For the complete Terms of Service, please visit our Terms page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
