
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FriendshipBraceletTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Step 1: Choose Your Colors",
      instruction: "Pick 3-4 different colored strings, each about 12 inches long.",
      image: "🌈"
    },
    {
      title: "Step 2: Tie the Top",
      instruction: "Tie all strings together with a knot, leaving about 1 inch at the top.",
      image: "🪢"
    },
    {
      title: "Step 3: Start Braiding",
      instruction: "Take the leftmost string and cross it over the middle ones.",
      image: "🤝"
    },
    {
      title: "Step 4: Continue Pattern",
      instruction: "Keep alternating left and right strings over the middle.",
      image: "➰"
    },
    {
      title: "Step 5: Tie the End",
      instruction: "When you reach the desired length, tie another knot at the bottom.",
      image: "🎀"
    },
    {
      title: "Step 6: Give to a Friend!",
      instruction: "Your friendship bracelet is ready to give to someone special!",
      image: "💝"
    }
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{steps[currentStep].image}</div>
            <h3 className="text-lg font-bold text-kidpink">{steps[currentStep].title}</h3>
          </div>
          
          <p className="text-center mb-6 text-gray-700">
            {steps[currentStep].instruction}
          </p>
          
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
            
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendshipBraceletTutorial;
