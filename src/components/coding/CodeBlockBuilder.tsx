
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeBlockBuilder = () => {
  const { toast } = useToast();
  const [codeBlocks, setCodeBlocks] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const availableBlocks = [
    { id: 'move', text: 'Move Forward', color: 'bg-blue-500' },
    { id: 'turn', text: 'Turn Right', color: 'bg-green-500' },
    { id: 'jump', text: 'Jump', color: 'bg-yellow-500' },
    { id: 'repeat', text: 'Repeat 3 times', color: 'bg-purple-500' }
  ];

  const addBlock = (block: string) => {
    setCodeBlocks([...codeBlocks, block]);
  };

  const removeBlock = (index: number) => {
    const newBlocks = codeBlocks.filter((_, i) => i !== index);
    setCodeBlocks(newBlocks);
  };

  const runCode = () => {
    if (codeBlocks.length === 0) {
      toast({
        title: "No code to run!",
        description: "Add some code blocks first.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    toast({
      title: "Running your code! 🤖",
      description: `Executing ${codeBlocks.length} commands...`
    });

    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Code executed successfully! ✅",
        description: "Great job building your first program!"
      });
    }, 2000);
  };

  const clearCode = () => {
    setCodeBlocks([]);
    toast({
      title: "Code cleared!",
      description: "Ready to start fresh."
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Available Blocks</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableBlocks.map((block) => (
            <Button
              key={block.id}
              onClick={() => addBlock(block.text)}
              className={`${block.color} text-white hover:opacity-80`}
              size="sm"
            >
              + {block.text}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Your Code</h3>
        <Card className="p-4 min-h-[200px] bg-gray-50">
          {codeBlocks.length === 0 ? (
            <p className="text-gray-500 text-center">Drag blocks here to build your code!</p>
          ) : (
            <div className="space-y-2">
              {codeBlocks.map((block, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border shadow-sm"
                >
                  <span className="font-mono">{index + 1}. {block}</span>
                  <Button
                    onClick={() => removeBlock(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        <Button
          onClick={clearCode}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CodeBlockBuilder;
