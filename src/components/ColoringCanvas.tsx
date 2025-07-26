
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ColoringCanvasProps {
  template?: string;
  ageGroup: string;
}

const ColoringCanvas: React.FC<ColoringCanvasProps> = ({ template = "butterfly", ageGroup }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [brushSize, setBrushSize] = useState(ageGroup === "5-7" ? 20 : ageGroup === "8-10" ? 15 : 10);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();

  const colors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57",
    "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43",
    "#10ac84", "#ee5253", "#0abde3", "#7bed9f", "#70a1ff",
    "#000000", "#ffffff", "#2f3640", "#57606f", "#8b7355"
  ];

  const templates = {
    butterfly: [
      { x: 100, y: 50, width: 200, height: 150, path: "M100,100 Q150,50 200,100 Q250,75 300,100 Q250,150 200,125 Q150,175 100,125 Z" },
      { x: 120, y: 80, width: 160, height: 90, path: "M120,120 Q160,80 200,120 Q230,100 260,120 Q230,140 200,130 Q160,150 120,130 Z" }
    ],
    flower: [
      { x: 150, y: 100, width: 100, height: 100, path: "M200,150 Q175,125 200,100 Q225,125 200,150 Q225,175 200,200 Q175,175 200,150 Z" },
      { x: 180, y: 130, width: 40, height: 40, path: "M200,150 A20,20 0 1,1 200,149" }
    ],
    car: [
      { x: 50, y: 100, width: 200, height: 80, path: "M50,150 L250,150 L250,130 L200,130 L200,110 L100,110 L100,130 L50,130 Z" },
      { x: 80, y: 150, width: 30, height: 30, path: "M95,165 A15,15 0 1,1 95,164" },
      { x: 190, y: 150, width: 30, height: 30, path: "M205,165 A15,15 0 1,1 205,164" }
    ]
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw template outline
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    const templateShapes = templates[template as keyof typeof templates] || templates.butterfly;
    templateShapes.forEach(shape => {
      ctx.stroke(new Path2D(shape.path));
    });
  }, [template]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw template
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    const templateShapes = templates[template as keyof typeof templates] || templates.butterfly;
    templateShapes.forEach(shape => {
      ctx.stroke(new Path2D(shape.path));
    });
  };

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = `coloring-${template}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();

    toast({
      title: "Artwork Saved! 🎨",
      description: "Your beautiful creation has been downloaded!"
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-3">Digital Coloring Studio</h3>
        
        {/* Template Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Choose Template:</label>
          <div className="flex gap-2">
            {Object.keys(templates).map((temp) => (
              <Button
                key={temp}
                variant={template === temp ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  // Trigger redraw with new template
                  const canvas = canvasRef.current;
                  const ctx = canvas?.getContext('2d');
                  if (!canvas || !ctx) return;
                  
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = '#000';
                  ctx.lineWidth = 2;
                  const templateShapes = templates[temp as keyof typeof templates];
                  templateShapes.forEach(shape => {
                    ctx.stroke(new Path2D(shape.path));
                  });
                }}
              >
                {temp.charAt(0).toUpperCase() + temp.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Colors:</label>
          <div className="grid grid-cols-10 gap-1 mb-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded border-2 transition-all ${
                  selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Brush Size */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Brush Size: {brushSize}px
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="border-2 border-gray-300 rounded-lg mb-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full h-auto cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button onClick={clearCanvas} variant="outline">
          Clear Canvas
        </Button>
        <Button onClick={saveArtwork} className="bg-gradient-to-r from-purple-500 to-pink-500">
          Save Artwork
        </Button>
      </div>
    </div>
  );
};

export default ColoringCanvas;
