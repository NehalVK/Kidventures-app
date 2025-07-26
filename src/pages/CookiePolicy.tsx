import Header from "../components/Header";
import Footer from "../components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us make Kidventures work better for you by remembering your preferences and 
                improving your learning experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
              <p className="mb-4">We use cookies for several important purposes:</p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Essential Cookies</h3>
              <p className="mb-4">These cookies are necessary for the website to function properly:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Remember your age group selection for appropriate content</li>
                <li>Keep you logged in during your session</li>
                <li>Store your progress in games and activities</li>
                <li>Ensure platform security and prevent misuse</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Analytics Cookies</h3>
              <p className="mb-4">These help us understand how children use our platform:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Track which activities are most popular</li>
                <li>Identify technical problems</li>
                <li>Improve our educational content</li>
                <li>Measure learning engagement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Preference Cookies</h3>
              <p className="mb-4">These remember your choices to make your experience better:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your favorite activities</li>
                <li>Store accessibility settings</li>
                <li>Keep track of completed achievements</li>
                <li>Save game progress and scores</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
              <p>
                We may use trusted third-party services that place cookies on your device to help us 
                provide better educational content. These partners follow strict privacy guidelines 
                for children's data protection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
              <p className="mb-4">
                You can control cookies through your browser settings. However, please note that 
                disabling certain cookies may affect your ability to use some features of Kidventures.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Browser Settings</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chrome: Settings {'->'} Privacy and Security {'->'} Cookies</li>
                <li>Firefox: Settings {'->'} Privacy & Security {'->'} Cookies and Site Data</li>
                <li>Safari: Preferences {'->'} Privacy {'->'} Cookies and website data</li>
                <li>Edge: Settings {'->'} Cookies and site permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Children's Privacy</h2>
              <p>
                We are committed to protecting children's privacy online. Our use of cookies complies 
                with children's privacy laws, and we do not use cookies to collect personal information 
                from children for advertising or marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Retention</h2>
              <p className="mb-4">Different types of cookies are stored for different periods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Stored for up to 1 year to remember your preferences</li>
                <li><strong>Analytics Cookies:</strong> Stored for up to 2 years to help us improve our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page and updating the 
                "last updated" date below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:kidventuresapp@gmail.com" className="text-blue-600 hover:underline">kidventuresapp@gmail.com</a><br />
                Phone: <a href="tel:+919008460460" className="text-blue-600 hover:underline">+919008460460</a>
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-600 mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
