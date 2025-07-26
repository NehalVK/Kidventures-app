
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Video as VideoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Videos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("featured");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // This would be user's uploaded videos in a real app
  const userUploads = [
    {
      id: 201,
      title: "My Science Experiment",
      videoId: "XFYWazblaUA",
      description: "Watch me conduct an awesome science experiment!",
      points: 15
    },
    {
      id: 202,
      title: "My Basketball Game",
      videoId: "1TEfJLywD9I", 
      description: "Highlights from my basketball game last weekend",
      points: 15
    },
  ];

  const kidsUploads = [
    {
      id: 101,
      title: "My Science Project",
      videoId: "XhdUAzGlRzI",
      description: "By Michael, age 12 - Watch my volcano experiment!",
      author: "Michael",
      points: 15
    },
    {
      id: 102,
      title: "My Dance Routine",
      videoId: "PqMxqmspOu8",
      description: "By Sophia, age 9 - My first dance performance",
      author: "Sophia",
      points: 12
    },
    {
      id: 103,
      title: "Book Review",
      videoId: "ooe2KkM_hJQ",
      description: "By Daniel, age 11 - My favorite book review",
      author: "Daniel",
      points: 10
    }
  ];

  const currentVideo = selectedTab === "featured" 
    ? userUploads[currentIndex] 
    : kidsUploads[currentIndex];

  const videosArray = selectedTab === "featured" ? userUploads : kidsUploads;

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setCurrentIndex(0); // Reset to first video when changing tabs
  };

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Video Uploaded Successfully!",
          description: "Great job! You've earned 15 points for your video.",
        });
        
        // In a real app, we would add the new video to userUploads here
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <VideoIcon className="text-kidpurple text-3xl" />
          <h1 className="text-4xl font-bold text-kidpurple">Videos</h1>
        </div>
        
        <Tabs defaultValue="featured" className="mb-8" onValueChange={handleTabChange}>
          <TabsList className="w-full justify-center mb-6">
            <TabsTrigger value="featured" className="flex gap-2 items-center">
              <VideoIcon className="h-4 w-4" /> My Videos
            </TabsTrigger>
            <TabsTrigger value="kids" className="flex gap-2 items-center">
              <VideoIcon className="h-4 w-4" /> Kids' Uploads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            {userUploads.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="bg-kidpurple text-white px-4 py-2 rounded-full disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {userUploads.length}
                  </span>
                  
                  <button 
                    onClick={() => currentIndex < userUploads.length - 1 && setCurrentIndex(currentIndex + 1)}
                    disabled={currentIndex === userUploads.length - 1}
                    className="bg-kidpurple text-white px-4 py-2 rounded-full disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                
                <ContentCard
                  title={currentVideo.title}
                  type="video"
                  points={currentVideo.points}
                  content={
                    <div>
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe 
                          src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
                          className="w-full h-64 rounded-lg"
                          allowFullScreen
                          title={currentVideo.title}
                        ></iframe>
                      </div>
                      <p>{currentVideo.description}</p>
                    </div>
                  }
                />
              </>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">You haven't uploaded any videos yet. Upload your first video below!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="kids">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="bg-kidpurple text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-500">
                {kidsUploads.length > 0 ? `${currentIndex + 1} of ${kidsUploads.length}` : "No uploads yet"}
              </span>
              
              <button 
                onClick={() => currentIndex < kidsUploads.length - 1 && setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex === kidsUploads.length - 1 || kidsUploads.length === 0}
                className="bg-kidpurple text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
            
            {kidsUploads.length > 0 ? (
              <ContentCard
                title={currentVideo.title}
                type="video"
                points={currentVideo.points}
                content={
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe 
                        src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
                        className="w-full h-64 rounded-lg"
                        allowFullScreen
                        title={currentVideo.title}
                      ></iframe>
                    </div>
                    <p>{currentVideo.description}</p>
                  </div>
                }
              />
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No videos uploaded yet. Be the first!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="h-5 w-5 text-kidpurple" />
            <h2 className="text-xl font-bold text-kidpurple">Upload Your Video</h2>
          </div>
          
          <p className="mb-4 text-gray-600">Share your favorite video and earn 15 points!</p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input 
              type="file" 
              id="video-upload" 
              className="hidden" 
              accept="video/*"
              onChange={handleVideoUpload}
            />
            <label 
              htmlFor="video-upload" 
              className="cursor-pointer block"
            >
              <div className="py-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm font-medium">Click to upload a video</p>
                <p className="text-xs text-gray-500 mt-1">MP4, MOV or AVI (max 50MB)</p>
              </div>
              
              <Button 
                className="mt-4 bg-kidpurple hover:bg-kidpurple/90"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Select Video"}
              </Button>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;
