
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Join the Kidventures Family! 🌟
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Create your free account and unlock a world of educational adventures for your little ones.
          </p>
        </div>

        <div className="flex justify-center">
          {showForm ? (
            <SignupForm onClose={() => setShowForm(false)} />
          ) : (
            <div className="text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome to Kidventures!</h2>
              <p className="text-gray-600">Your account has been created successfully.</p>
              <Link 
                to="/" 
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
              >
                Start Exploring!
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Why Choose Kidventures?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600">Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging activities that make learning fun and memorable for children of all ages.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-pink-600">Achievement System</h3>
              <p className="text-gray-600">
                Track progress and celebrate achievements with our comprehensive reward system.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600">Family Friendly</h3>
              <p className="text-gray-600">
                Safe, ad-free environment designed specifically for children and families.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
