
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Pictures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("featured");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // This would be user's uploaded pictures in a real app
  const userUploads = [
    {
      id: 201,
      title: "My Drawing",
      imageUrl: "https://images.unsplash.com/photo-1603201686943-a7dde9b5fe89",
      description: "My first drawing using crayons",
      points: 10
    },
    {
      id: 202,
      title: "Family Photo",
      imageUrl: "https://images.unsplash.com/photo-1595830300558-e5937d698c27",
      description: "A photo from our vacation",
      points: 10
    }
  ];

  const kidsUploads = [
    {
      id: 101,
      title: "My Pet Dog",
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      description: "By Sarah, age 8",
      author: "Sarah",
      points: 10
    },
    {
      id: 102,
      title: "Family Vacation",
      imageUrl: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa",
      description: "By Ben, age 10",
      author: "Ben",
      points: 12
    },
    {
      id: 103,
      title: "My Art Project",
      imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7",
      description: "By Maya, age 7",
      author: "Maya",
      points: 9
    },
    {
      id: 104,
      title: "Amazing Butterfly",
      imageUrl: "https://images.unsplash.com/photo-1590047798626-08571cf69b43",
      description: "By Liam, age 9",
      author: "Liam",
      points: 11
    },
  ];

  const currentPicture = selectedTab === "featured" 
    ? userUploads[currentIndex] 
    : kidsUploads[currentIndex];

  const picturesArray = selectedTab === "featured" ? userUploads : kidsUploads;

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setCurrentIndex(0); // Reset to first picture when changing tabs
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Picture Uploaded Successfully!",
          description: "Great job! You've earned 10 points for your picture.",
        });
        
        // In a real app, we would add the new picture to userUploads here
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ImageIcon className="text-kidgreen text-3xl" />
          <h1 className="text-4xl font-bold text-kidgreen">Pictures</h1>
        </div>
        
        <Tabs defaultValue="featured" className="mb-8" onValueChange={handleTabChange}>
          <TabsList className="w-full justify-center mb-6">
            <TabsTrigger value="featured" className="flex gap-2 items-center">
              <ImageIcon className="h-4 w-4" /> My Pictures
            </TabsTrigger>
            <TabsTrigger value="kids" className="flex gap-2 items-center">
              <ImageIcon className="h-4 w-4" /> Kids' Uploads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            {userUploads.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="bg-kidgreen text-white px-4 py-2 rounded-full disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {userUploads.length}
                  </span>
                  
                  <button 
                    onClick={() => currentIndex < userUploads.length - 1 && setCurrentIndex(currentIndex + 1)}
                    disabled={currentIndex === userUploads.length - 1}
                    className="bg-kidgreen text-white px-4 py-2 rounded-full disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                
                <ContentCard
                  title={currentPicture.title}
                  type="picture"
                  points={currentPicture.points}
                  content={
                    <div>
                      <img 
                        src={currentPicture.imageUrl} 
                        alt={currentPicture.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <p>{currentPicture.description}</p>
                    </div>
                  }
                />
              </>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">You haven't uploaded any pictures yet. Upload your first picture below!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="kids">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="bg-kidgreen text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-500">
                {kidsUploads.length > 0 ? `${currentIndex + 1} of ${kidsUploads.length}` : "No uploads yet"}
              </span>
              
              <button 
                onClick={() => currentIndex < kidsUploads.length - 1 && setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex === kidsUploads.length - 1 || kidsUploads.length === 0}
                className="bg-kidgreen text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
            
            {kidsUploads.length > 0 ? (
              <ContentCard
                title={currentPicture.title}
                type="picture"
                points={currentPicture.points}
                content={
                  <div>
                    <img 
                      src={currentPicture.imageUrl} 
                      alt={currentPicture.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p>{currentPicture.description}</p>
                  </div>
                }
              />
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No pictures uploaded yet. Be the first!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="h-5 w-5 text-kidgreen" />
            <h2 className="text-xl font-bold text-kidgreen">Upload Your Picture</h2>
          </div>
          
          <p className="mb-4 text-gray-600">Share your favorite picture and earn 10 points!</p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input 
              type="file" 
              id="picture-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label 
              htmlFor="picture-upload" 
              className="cursor-pointer block"
            >
              <div className="py-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm font-medium">Click to upload a picture</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or GIF (max 5MB)</p>
              </div>
              
              <Button 
                className="mt-4 bg-kidgreen hover:bg-kidgreen/90"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Select Picture"}
              </Button>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pictures;
