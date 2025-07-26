
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Sparkles, Trophy, Book, Calendar, ShoppingCart } from 'lucide-react';

interface WalkthroughStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
}

interface WalkthroughPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalkthroughPopup: React.FC<WalkthroughPopupProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: WalkthroughStep[] = [
    {
      title: "Welcome to KidVenture! 🎉",
      description: "Your magical world of learning and fun awaits! Let's take a quick tour to show you around.",
      icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    },
    {
      title: "Choose Your Age Group",
      description: "Select your age group using the dropdown in the header to see activities perfect for you!",
      icon: <Book className="w-12 h-12 text-blue-500" />,
      highlight: "Age group selector in the top navigation"
    },
    {
      title: "Stay Updated with Kids News 📰",
      description: "Get the latest fun and educational news stories written just for kids. Real-time updates keep you informed!",
      icon: <Book className="w-12 h-12 text-green-500" />,
    },
    {
      title: "Discover Local Events 📅",
      description: "Find exciting events happening near you - workshops, shows, competitions and more!",
      icon: <Calendar className="w-12 h-12 text-orange-500" />,
    },
    {
      title: "Earn Points & Rewards 🏆",
      description: "Complete activities to earn points and exchange them for cool rewards in our Kids Store!",
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Explore Age-Specific Activities",
      description: "Each age group has specially designed activities - from puzzles and games to coding and science experiments!",
      icon: <Sparkles className="w-12 h-12 text-pink-500" />,
    },
    {
      title: "Ready to Start Your Adventure! 🚀",
      description: "You're all set! Click on any activity to begin your learning journey. Have fun exploring!",
      icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('kidventure_walkthrough_shown', 'true');
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('kidventure_walkthrough_shown', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
        <DialogHeader className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
            onClick={handleSkip}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center space-y-4 pt-4">
            <div className="flex justify-center">
              {steps[currentStep].icon}
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {steps[currentStep].title}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-center leading-relaxed">
            {steps[currentStep].description}
          </p>
          
          {steps[currentStep].highlight && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">
                💡 {steps[currentStep].highlight}
              </p>
            </div>
          )}
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-purple-500' 
                    : index < currentStep 
                      ? 'bg-purple-300' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started! <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalkthroughPopup;
