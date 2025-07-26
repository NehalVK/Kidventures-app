
import { Brush, Palette, PencilLine, Image as ImageIcon, Shirt, Sticker } from "lucide-react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import ColoringCanvas from "../components/ColoringCanvas";
import ColorByNumber from "../components/ColorByNumber";
import { useAge } from "../context/AgeContext";
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Arts = () => {
  const { ageGroup } = useAge();
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const { toast } = useToast();
  
  const artsCategories = {
    "5-7": ["Coloring & Drawing", "Stickers & Collages", "Dress Up Games"],
    "8-10": ["Coloring & Drawing", "Stickers & Collages", "Dress Up Games"],
    "11-15": ["Coloring & Drawing", "Stickers & Collages", "Dress Up Games"]
  };

  const currentCategories = artsCategories[ageGroup] || [];

  // Interactive stickers activity
  const StickersActivity = () => {
    const [placedStickers, setPlacedStickers] = useState([]);
    const stickers = ["🌸", "🦋", "🌈", "⭐", "🎈", "🎨", "🎭", "🎪"];
    
    const addSticker = (sticker) => {
      const newSticker = {
        emoji: sticker,
        x: Math.random() * 200,
        y: Math.random() * 100,
        id: Date.now()
      };
      setPlacedStickers([...placedStickers, newSticker]);
    };

    return (
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-bold mb-3">Create Your Scene</h4>
        <div className="flex gap-2 mb-3 flex-wrap">
          {stickers.map(sticker => (
            <button
              key={sticker}
              className="text-2xl p-2 hover:bg-gray-100 rounded"
              onClick={() => addSticker(sticker)}
            >
              {sticker}
            </button>
          ))}
        </div>
        <div className="w-full h-40 border-2 border-gray-300 rounded bg-gradient-to-b from-blue-200 to-green-200 relative mb-3">
          {placedStickers.map(sticker => (
            <span
              key={sticker.id}
              className="absolute text-2xl cursor-move"
              style={{ left: sticker.x, top: sticker.y }}
            >
              {sticker.emoji}
            </span>
          ))}
        </div>
        <Button onClick={() => toast({ title: "Beautiful scene! +15 points" })}>
          Save Scene
        </Button>
      </div>
    );
  };

  // Interactive dress up activity
  const DressUpActivity = () => {
    const [character, setCharacter] = useState({
      hat: "👤",
      shirt: "",
      accessory: ""
    });
    
    const hats = ["🎩", "👑", "🧢", "🎀"];
    const shirts = ["👕", "👗", "🥼", "👔"];
    const accessories = ["👓", "🎒", "⌚", "🧤"];

    return (
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-bold mb-3">Dress Up Your Character</h4>
        <div className="text-center mb-4">
          <div className="text-6xl">
            {character.hat}
            {character.shirt}
            {character.accessory}
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-medium mb-2">Hats:</p>
            <div className="flex gap-2">
              {hats.map(hat => (
                <button
                  key={hat}
                  className="text-2xl p-2 hover:bg-gray-100 rounded"
                  onClick={() => setCharacter({...character, hat})}
                >
                  {hat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Clothes:</p>
            <div className="flex gap-2">
              {shirts.map(shirt => (
                <button
                  key={shirt}
                  className="text-2xl p-2 hover:bg-gray-100 rounded"
                  onClick={() => setCharacter({...character, shirt})}
                >
                  {shirt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Accessories:</p>
            <div className="flex gap-2">
              {accessories.map(accessory => (
                <button
                  key={accessory}
                  className="text-2xl p-2 hover:bg-gray-100 rounded"
                  onClick={() => setCharacter({...character, accessory})}
                >
                  {accessory}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button className="mt-3" onClick={() => toast({ title: "Stylish character! +12 points" })}>
          Save Outfit
        </Button>
      </div>
    );
  };
  
  const artsContent = {
    "5-7": {
      "Coloring & Drawing": [
        { 
          title: "Digital Coloring Studio", 
          content: <ColoringCanvas ageGroup={ageGroup} template="butterfly" />
        },
        { 
          title: "Color by Number - Easy", 
          content: <ColorByNumber difficulty="easy" />
        },
        { title: "Animal Coloring Pages", content: "Beautiful animal coloring pages with big spaces for young artists to color." },
        { title: "Shape Drawing", content: "Learn to draw basic shapes and combine them into fun pictures!" }
      ],
      "Stickers & Collages": [
        { 
          title: "Scene Creator", 
          content: <StickersActivity />
        },
        { title: "Story Stickers", content: "Use stickers to create your own story scenes with characters and backgrounds." },
        { title: "Seasonal Collages", content: "Create beautiful collages for different seasons using themed stickers." }
      ],
      "Dress Up Games": [
        { 
          title: "Character Customizer", 
          content: <DressUpActivity />
        },
        { title: "Pet Dress Up", content: "Dress up cute pets with fun accessories and outfits!" },
        { title: "Superhero Creator", content: "Design your own superhero with special costumes and powers." }
      ]
    },
    "8-10": {
      "Coloring & Drawing": [
        { 
          title: "Advanced Digital Studio", 
          content: <ColoringCanvas ageGroup={ageGroup} template="flower" />
        },
        { 
          title: "Color by Number - Medium", 
          content: <ColorByNumber difficulty="medium" />
        },
        { title: "Portrait Drawing", content: "Learn techniques for drawing faces and expressions." },
        { title: "Landscape Art", content: "Create beautiful landscape drawings with perspective and detail." }
      ],
      "Stickers & Collages": [
        { 
          title: "Interactive Scene Builder", 
          content: <StickersActivity />
        },
        { title: "Magazine Collages", content: "Cut and arrange magazine pieces to create artistic collages." },
        { title: "Digital Scrapbooking", content: "Create digital scrapbook pages with photos and decorative elements." }
      ],
      "Dress Up Games": [
        { 
          title: "Fashion Designer", 
          content: <DressUpActivity />
        },
        { title: "Historical Costumes", content: "Dress characters in clothing from different time periods." },
        { title: "Cultural Fashion", content: "Explore traditional clothing from around the world." }
      ]
    },
    "11-15": {
      "Coloring & Drawing": [
        { 
          title: "Professional Art Studio", 
          content: <ColoringCanvas ageGroup={ageGroup} template="car" />
        },
        { 
          title: "Color by Number - Hard", 
          content: <ColorByNumber difficulty="hard" />
        },
        { title: "Anime Character Design", content: "Learn to draw anime-style characters with proper proportions." },
        { title: "Realistic Shading", content: "Master advanced shading techniques for realistic artwork." }
      ],
      "Stickers & Collages": [
        { 
          title: "Mixed Media Art", 
          content: <StickersActivity />
        },
        { title: "Photo Manipulation", content: "Learn basic photo editing and digital collage techniques." },
        { title: "Abstract Compositions", content: "Create modern abstract art using various digital elements." }
      ],
      "Dress Up Games": [
        { 
          title: "Fashion Portfolio", 
          content: <DressUpActivity />
        },
        { title: "Runway Designer", content: "Design complete fashion collections for virtual runway shows." },
        { title: "Costume Design", content: "Create costumes for theater, movies, and special events." }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Brush className="text-kidpink text-3xl" />
          <h1 className="text-4xl font-bold text-kidpink">Creativity & Arts</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveSubcategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all" className="flex gap-2 items-center">
                <Palette className="h-4 w-4" /> All
              </TabsTrigger>
              {currentCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex gap-2 items-center">
                  {category === "Coloring & Drawing" && <PencilLine className="h-4 w-4" />}
                  {category === "Stickers & Collages" && <ImageIcon className="h-4 w-4" />}
                  {category === "Dress Up Games" && <Shirt className="h-4 w-4" />}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              {currentCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-semibold text-kidpink mb-4">{category}</h2>
                  {artsContent[ageGroup][category].map((item, index) => (
                    <ContentCard
                      key={index}
                      title={item.title}
                      content={item.content}
                      type="art"
                    />
                  ))}
                </div>
              ))}
            </TabsContent>

            {currentCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <h2 className="text-2xl font-semibold text-kidpink mb-4">{category}</h2>
                {artsContent[ageGroup][category].map((item, index) => (
                  <ContentCard
                    key={index}
                    title={item.title}
                    content={item.content}
                    type="art"
                  />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Arts;
