
import React, { useState } from "react";
import { PencilLine, Image as ImageIcon, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormEvent } from "react";

const DogDrawingTutorial = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasEarnedPoints, setHasEarnedPoints] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setHasEarnedPoints(true);
      toast({
        title: "Drawing Uploaded Successfully!",
        description: "Great job! You've earned 10 points for your dog drawing.",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-kidblue">How to Draw a Dog - Step by Step</h3>
      
      <div className="bg-gray-100 p-4 rounded-md">
        <h4 className="font-bold mb-2">Materials Needed:</h4>
        <ul className="list-disc pl-5">
          <li>Paper</li>
          <li>Pencil</li>
          <li>Eraser</li>
          <li>Colored pencils or crayons (optional)</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 1: Draw the Basic Shapes</h4>
          <p>Start by drawing a large circle for the head and a slightly bigger oval for the body. These don't need to be perfect!</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 2: Add the Snout and Ears</h4>
          <p>Draw a smaller oval or rounded rectangle shape sticking out from the head circle - this is your dog's snout. Then add two triangle shapes on top of the head for ears. For floppy ears, draw curved triangles!</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 3: Draw the Legs</h4>
          <p>Add four rectangle shapes below the body oval for legs. Make sure the front legs connect to the front of the body and the back legs to the back of the body.</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 4: Add a Tail</h4>
          <p>Draw a curved line from the back of the body oval - this is your dog's tail! You can make it long and thin, short and stumpy, or curly!</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 5: Add Facial Features</h4>
          <p>Draw two small circles for eyes, a small triangle or oval for the nose at the end of the snout, and a curved line for the mouth. You can add a little tongue if you like!</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 6: Add Details</h4>
          <p>Now add some small details like spots, fur texture or a collar. These little details will make your dog unique!</p>
        </div>
        
        <div className="border-l-4 border-kidblue pl-4">
          <h4 className="font-bold">Step 7: Color Your Dog</h4>
          <p>Use colored pencils or crayons to color your dog. Dogs can be brown, black, white, golden, spotted, or any combination!</p>
        </div>
      </div>
      
      <div className="mt-6 border rounded-lg overflow-hidden">
        <div className="bg-kidblue/10 p-2 flex items-center">
          <ImageIcon className="h-5 w-5 mr-2 text-kidblue" />
          <h4 className="font-bold text-kidblue">Example Dog Drawing</h4>
        </div>
        <div className="p-4 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800" 
            alt="Example of a dog drawing" 
            className="max-w-full h-auto rounded-md border border-gray-200 shadow-sm" 
          />
        </div>
        <p className="text-sm text-center text-gray-500 p-2">Follow the steps above to create your own dog drawing!</p>
      </div>
      
      <div className="bg-kidblue/10 p-4 rounded-md">
        <h4 className="font-bold text-kidblue">Tips:</h4>
        <ul className="list-disc pl-5">
          <li>If you make a mistake, don't worry! Use your eraser and try again.</li>
          <li>Dogs come in many shapes and sizes - your drawing doesn't have to look like anyone else's!</li>
          <li>Practice makes perfect - try drawing different types of dogs!</li>
        </ul>
      </div>
      
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-kidblue mb-4">
            <PencilLine className="h-5 w-5" />
            <h4 className="font-bold">Challenge:</h4>
          </div>
          <p className="mb-4">Try drawing your dog doing something fun like playing with a ball or sleeping in a basket!</p>
          
          {!hasEarnedPoints ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Your uploaded drawing" 
                      className="max-h-64 mx-auto"
                    />
                    <p className="text-sm text-gray-500">Looking good! You can submit your drawing or choose another image.</p>
                  </div>
                ) : (
                  <div className="py-8 space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm font-medium">Upload your dog drawing</p>
                    <p className="text-xs text-gray-500">Take a photo or select an image file</p>
                  </div>
                )}
                
                <Input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  id="drawing-upload" 
                  onChange={handleImageChange}
                />
                <label 
                  htmlFor="drawing-upload"
                  className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-kidblue px-4 py-2 text-sm font-medium text-white hover:bg-kidblue/90 focus:outline-none"
                >
                  Choose Image
                </label>
              </div>
              
              {uploadedImage && (
                <Button 
                  type="submit" 
                  className="w-full bg-kidpink hover:bg-kidpink/90"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Submit My Drawing"}
                </Button>
              )}
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Drawing Submitted!</span>
              </div>
              <p className="text-green-700">You've earned 10 points for completing this challenge.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DogDrawingTutorial;
