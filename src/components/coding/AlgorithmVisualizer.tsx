
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlgorithmVisualizer = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('sorting');

  const algorithms = {
    sorting: {
      name: 'Bubble Sort',
      description: 'Sort numbers from smallest to largest',
      steps: [
        { action: 'Start with unsorted list: [64, 34, 25, 12]', data: [64, 34, 25, 12], highlight: [] },
        { action: 'Compare 64 and 34, swap because 64 > 34', data: [34, 64, 25, 12], highlight: [0, 1] },
        { action: 'Compare 64 and 25, swap because 64 > 25', data: [34, 25, 64, 12], highlight: [1, 2] },
        { action: 'Compare 64 and 12, swap because 64 > 12', data: [34, 25, 12, 64], highlight: [2, 3] },
        { action: 'Continue sorting...', data: [25, 34, 12, 64], highlight: [0, 1] },
        { action: 'Final sorted result!', data: [12, 25, 34, 64], highlight: [] }
      ]
    },
    searching: {
      name: 'Linear Search',
      description: 'Find a specific number in a list',
      steps: [
        { action: 'Looking for number 25 in: [12, 34, 25, 64]', data: [12, 34, 25, 64], highlight: [], target: 25 },
        { action: 'Check first position: 12 ≠ 25', data: [12, 34, 25, 64], highlight: [0], target: 25 },
        { action: 'Check second position: 34 ≠ 25', data: [12, 34, 25, 64], highlight: [1], target: 25 },
        { action: 'Check third position: 25 = 25 ✓', data: [12, 34, 25, 64], highlight: [2], target: 25 },
        { action: 'Found! Number 25 is at position 3', data: [12, 34, 25, 64], highlight: [2], target: 25 }
      ]
    }
  };

  const currentAlgorithm = algorithms[selectedAlgorithm];
  const currentStepData = currentAlgorithm.steps[currentStep];

  const runAlgorithm = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentAlgorithm.steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "Algorithm Complete! 🎉",
            description: `${currentAlgorithm.name} finished successfully!`
          });
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetVisualization = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const nextStep = () => {
    if (currentStep < currentAlgorithm.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setSelectedAlgorithm('sorting')}
          variant={selectedAlgorithm === 'sorting' ? 'default' : 'outline'}
          size="sm"
        >
          Sorting
        </Button>
        <Button
          onClick={() => setSelectedAlgorithm('searching')}
          variant={selectedAlgorithm === 'searching' ? 'default' : 'outline'}
          size="sm"
        >
          Searching
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">{currentAlgorithm.name}</h3>
            <p className="text-sm text-gray-600">{currentAlgorithm.description}</p>
          </div>
          <Badge variant="outline">
            Step {currentStep + 1} of {currentAlgorithm.steps.length}
          </Badge>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm font-medium mb-3">{currentStepData.action}</p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {currentStepData.data.map((number, index) => (
              <div
                key={index}
                className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white transition-all duration-300 ${
                  currentStepData.highlight.includes(index)
                    ? 'bg-red-500 scale-110'
                    : 'bg-blue-500'
                }`}
              >
                {number}
              </div>
            ))}
          </div>

          {currentStepData.target && (
            <div className="text-center">
              <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                Target: {currentStepData.target}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={prevStep} disabled={currentStep === 0 || isRunning} variant="outline" size="sm">
            ← Previous
          </Button>
          <Button
            onClick={runAlgorithm}
            disabled={isRunning}
            className="flex items-center gap-2"
            size="sm"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Run Auto'}
          </Button>
          <Button onClick={nextStep} disabled={currentStep >= currentAlgorithm.steps.length - 1 || isRunning} variant="outline" size="sm">
            Next →
          </Button>
          <Button onClick={resetVisualization} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AlgorithmVisualizer;
