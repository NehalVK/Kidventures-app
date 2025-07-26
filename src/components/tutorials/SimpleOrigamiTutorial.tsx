
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SimpleOrigamiTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Step 1: Get Your Paper",
      instruction: "Take a square piece of colored paper. Any color you like!",
      image: "📄"
    },
    {
      title: "Step 2: Make a Triangle",
      instruction: "Fold the paper in half diagonally to make a triangle shape.",
      image: "📐"
    },
    {
      title: "Step 3: Fold Again",
      instruction: "Fold the triangle in half again to make a smaller triangle.",
      image: "🔺"
    },
    {
      title: "Step 4: Open and Create",
      instruction: "Unfold once and tuck the corners to create your animal shape!",
      image: "🐸"
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

export default SimpleOrigamiTutorial;
