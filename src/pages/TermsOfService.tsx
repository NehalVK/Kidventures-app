
import { Scale, Shield, Users, Heart, AlertTriangle, Mail } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Google Play Family Policy Compliant</p>
            <p className="text-sm text-gray-500 mt-2">Last Updated: January 17, 2025</p>
          </div>

          {/* Family Policy Compliance */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-800">Family-Safe Service Commitment</h2>
            </div>
            <p className="text-blue-700 text-sm">
              These Terms of Service reflect our commitment to providing a safe, educational, 
              and family-friendly environment that complies with Google Play Family Policy and COPPA regulations.
            </p>
          </div>

          {/* Age Requirements & Parental Consent */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Age Requirements & Parental Consent</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Children Under 13</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>Explicit parental consent is required before use</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>Parents must supervise their child's use of the app</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>Parents can withdraw consent and delete data at any time</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-green-800 mb-3">Children 13 and Older</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>May use the service with parental guidance recommended</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span>Still subject to child-safe content and privacy protections</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Educational Purpose */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Purpose & Content Standards</h2>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">Kidventures is designed exclusively for educational purposes:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">✓</span>
                  <span>All content is age-appropriate and educationally valuable</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">✓</span>
                  <span>Content is reviewed by educational experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">✓</span>
                  <span>No violent, inappropriate, or harmful content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">✓</span>
                  <span>Promotes positive learning and development</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Prohibited Uses</h2>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">The following activities are strictly prohibited:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600">✗</span>
                  <span>Attempting to collect personal information from other users</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600">✗</span>
                  <span>Sharing inappropriate content or language</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600">✗</span>
                  <span>Circumventing safety features or parental controls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600">✗</span>
                  <span>Using the app for commercial purposes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600">✗</span>
                  <span>Attempting to reverse engineer or hack the application</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Parental Rights and Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Parental Rights and Responsibilities</h2>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Parental Rights</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Access and review all data associated with your child's account</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Request deletion of your child's data at any time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Withdraw consent and terminate your child's access</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Monitor your child's usage and learning progress</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Parental Responsibilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Supervise your child's use of the application</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Ensure your child understands safe online behavior</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Report any inappropriate content or behavior immediately</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Protection Commitment */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Data Protection Commitment</h2>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>We collect only minimal data necessary for educational functionality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>All data is encrypted and stored securely</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>We do not share data with third parties for advertising</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Parents have complete control over their child's data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Compliance with COPPA and international child privacy laws</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Availability & Changes</h2>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                We strive to provide continuous access to our educational content, but please note:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Service may be temporarily unavailable for maintenance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>We may update content to improve educational value</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Parents will be notified of significant changes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>Educational content remains the primary focus</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact and Support */}
          <section className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">Contact and Support</h2>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                We are committed to providing excellent support for families:
              </p>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start space-x-2">
                  <Mail className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>General Support:</strong> kidventuresapp@gmail.com
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Safety Concerns:</strong> Use "URGENT SAFETY" in subject line
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Privacy Requests:</strong> Response within 24 hours
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Phone Support:</strong> +919008460460 (Available for urgent child safety matters)
                </p>
              </div>
            </div>
          </section>

          {/* Terms Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms Updates</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700">
                We may update these Terms of Service to reflect changes in our practices or legal requirements. 
                Parents will be notified of material changes via email and in-app notifications. 
                Continued use after notification constitutes acceptance of updated terms. 
                Parents always retain the right to withdraw consent and discontinue use.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-gray-600">
                Dedicated to safe, educational, and fun learning experiences for children
              </p>
            </div>
            <p className="text-sm text-gray-500">
              These Terms of Service work together with our Privacy Policy to ensure Google Play Family Policy compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
