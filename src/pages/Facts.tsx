
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";

const Facts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const facts = [
    {
      id: 1,
      title: "Space Facts",
      content: "Did you know that one day on Venus is longer than one year on Venus? It takes Venus 243 Earth days to rotate once on its axis, but only 225 Earth days to go around the Sun!",
      points: 7
    },
    {
      id: 2,
      title: "Animal Facts",
      content: "Octopuses have three hearts! Two hearts pump blood through the gills, while the third pumps it through the body. They also have blue blood and can change the color of their skin!",
      points: 8
    },
    {
      id: 3,
      title: "Human Body Facts",
      content: "Your fingernails grow about 3.5 millimeters per month. That means a complete nail takes about 6 months to grow from the base to the tip!",
      points: 6
    },
    {
      id: 4,
      title: "Dinosaur Facts",
      content: "Not all dinosaurs lived at the same time! The time between when Stegosaurus lived and when Tyrannosaurus rex lived is greater than the time between Tyrannosaurus rex and today.",
      points: 9
    },
    {
      id: 5,
      title: "Science Facts",
      content: "A teaspoonful of a neutron star would weigh about 6 billion tons! Neutron stars are incredibly dense stars formed when massive stars explode at the end of their life cycle.",
      points: 10
    }
  ];

  const currentFact = facts[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="bg-kidorange text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          
          <h1 className="text-3xl font-bold text-kidorange">Facts</h1>
          
          <button 
            onClick={() => currentIndex < facts.length - 1 && setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === facts.length - 1}
            className="bg-kidorange text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
        <ContentCard
          title={currentFact.title}
          type="fact"
          points={currentFact.points}
          content={
            <div className="text-lg">
              {currentFact.content}
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Facts;
