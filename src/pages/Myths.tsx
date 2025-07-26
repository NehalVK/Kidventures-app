
import { useState } from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";

const Myths = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const myths = [
    {
      id: 1,
      title: "The Loch Ness Monster",
      content: "The Loch Ness Monster is a legendary creature believed to live in Loch Ness, a large freshwater lake in Scotland. People claim to have seen a large, long-necked creature swimming in the lake. However, scientists have found no reliable evidence that such a creature exists!"
    },
    {
      id: 2,
      title: "Thor's Hammer",
      content: "In Norse mythology, Thor was the god of thunder who carried a magical hammer called Mjölnir. The hammer was so heavy that only Thor could lift it, and he used it to protect both gods and humans against evil forces."
    },
    {
      id: 3,
      title: "The Minotaur",
      content: "In Greek mythology, the Minotaur was a creature with the head of a bull and the body of a man. It lived at the center of a maze called the Labyrinth, built by King Minos of Crete to contain the monster."
    },
    {
      id: 4,
      title: "Dragons",
      content: "Dragons are legendary creatures that appear in myths and stories from cultures around the world. They are often described as giant, fire-breathing, scaly creatures with wings. In Western stories, dragons are usually dangerous and evil, but in Eastern stories, especially Chinese myths, dragons are wise and bring good luck."
    }
  ];

  const currentMyth = myths[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="bg-kidpink text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          
          <h1 className="text-3xl font-bold text-kidpink">Myths</h1>
          
          <button 
            onClick={() => currentIndex < myths.length - 1 && setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === myths.length - 1}
            className="bg-kidpink text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
        <ContentCard
          title={currentMyth.title}
          type="myth"
          showPoints={false}
          content={
            <div className="text-lg">
              {currentMyth.content}
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Myths;
