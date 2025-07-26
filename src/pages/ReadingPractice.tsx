import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Play, Pause, RotateCcw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReadingPractice = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  const stories = [
    {
      id: 1,
      title: "The Adventure of Max the Dog",
      level: "Beginner",
      emoji: "🐕",
      text: "Max was a golden retriever who lived in a small town with his family. Every morning, he would wake up when the sun came through his window. He loved to stretch his legs and wag his tail because he knew it was time for his morning walk. Max's favorite thing was to explore the park near his house. There were tall trees, colorful flowers, and a small pond where ducks liked to swim. When Max saw other dogs, he would run over to say hello and play. His owner, Sarah, always brought a red ball to throw. Max could catch the ball in the air and bring it back to Sarah. After their walk, Max would drink cool water from his bowl and take a nap in his cozy bed.",
      words: ["Max", "was", "a", "golden", "retriever", "who", "lived", "in", "a", "small", "town", "with", "his", "family.", "Every", "morning,", "he", "would", "wake", "up", "when", "the", "sun", "came", "through", "his", "window.", "He", "loved", "to", "stretch", "his", "legs", "and", "wag", "his", "tail", "because", "he", "knew", "it", "was", "time", "for", "his", "morning", "walk.", "Max's", "favorite", "thing", "was", "to", "explore", "the", "park", "near", "his", "house.", "There", "were", "tall", "trees,", "colorful", "flowers,", "and", "a", "small", "pond", "where", "ducks", "liked", "to", "swim.", "When", "Max", "saw", "other", "dogs,", "he", "would", "run", "over", "to", "say", "hello", "and", "play.", "His", "owner,", "Sarah,", "always", "brought", "a", "red", "ball", "to", "throw.", "Max", "could", "catch", "the", "ball", "in", "the", "air", "and", "bring", "it", "back", "to", "Sarah.", "After", "their", "walk,", "Max", "would", "drink", "cool", "water", "from", "his", "bowl", "and", "take", "a", "nap", "in", "his", "cozy", "bed."],
      comprehension: [
        {
          question: "What kind of dog is Max?",
          options: ["German Shepherd", "Golden Retriever", "Poodle"],
          correct: 1
        },
        {
          question: "What is Max's owner's name?",
          options: ["Sarah", "Emma", "Lucy"],
          correct: 0
        },
        {
          question: "Where does Max like to explore?",
          options: ["The beach", "The park", "The school"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Emma's Magical Garden",
      level: "Intermediate",
      emoji: "🌱",
      text: "Emma discovered something amazing in her grandmother's backyard. Behind the old oak tree, there was a hidden garden that seemed to sparkle in the sunlight. The garden was full of the most beautiful plants Emma had ever seen. There were roses that changed colors from red to pink to yellow as she watched. Sunflowers grew as tall as Emma herself, and their faces followed the sun across the sky. In the center of the garden was a small fountain with crystal clear water. Emma noticed that when she made a wish and threw a penny into the fountain, something magical would happen. The first time she wished for butterflies, dozens of colorful butterflies appeared and danced around the flowers. When she wished for music, the wind began to play a gentle melody through the leaves. Emma's grandmother later told her that this was a special garden that had been in their family for many generations. It only showed its magic to those who truly loved nature and believed in wonder.",
      words: ["Emma", "discovered", "something", "amazing", "in", "her", "grandmother's", "backyard.", "Behind", "the", "old", "oak", "tree,", "there", "was", "a", "hidden", "garden", "that", "seemed", "to", "sparkle", "in", "the", "sunlight.", "The", "garden", "was", "full", "of", "the", "most", "beautiful", "plants", "Emma", "had", "ever", "seen.", "There", "were", "roses", "that", "changed", "colors", "from", "red", "to", "pink", "to", "yellow", "as", "she", "watched.", "Sunflowers", "grew", "as", "tall", "as", "Emma", "herself,", "and", "their", "faces", "followed", "the", "sun", "across", "the", "sky.", "In", "the", "center", "of", "the", "garden", "was", "a", "small", "fountain", "with", "crystal", "clear", "water.", "Emma", "noticed", "that", "when", "she", "made", "a", "wish", "and", "threw", "a", "penny", "into", "the", "fountain,", "something", "magical", "would", "happen.", "The", "first", "time", "she", "wished", "for", "butterflies,", "dozens", "of", "colorful", "butterflies", "appeared", "and", "danced", "around", "the", "flowers.", "When", "she", "wished", "for", "music,", "the", "wind", "began", "to", "play", "a", "gentle", "melody", "through", "the", "leaves.", "Emma's", "grandmother", "later", "told", "her", "that", "this", "was", "a", "special", "garden", "that", "had", "been", "in", "their", "family", "for", "many", "generations.", "It", "only", "showed", "its", "magic", "to", "those", "who", "truly", "loved", "nature", "and", "believed", "in", "wonder."],
      comprehension: [
        {
          question: "Where did Emma find the magical garden?",
          options: ["In the front yard", "Behind the oak tree", "At school"],
          correct: 1
        },
        {
          question: "What happened when Emma threw a penny in the fountain?",
          options: ["Nothing", "Something magical", "The water disappeared"],
          correct: 1
        },
        {
          question: "Who told Emma about the garden's history?",
          options: ["Her mother", "Her grandmother", "Her friend"],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "The Friendship of Lily and Sam",
      level: "Intermediate",
      emoji: "👫",
      text: "Lily and Sam had been best friends since they were very young. They lived on the same street and went to the same school together every day. Lily was great at drawing and loved to create colorful pictures of animals and nature. Sam was excellent at building things with blocks and always came up with creative inventions. One day, their teacher announced that the class would have a special project where students could work in pairs. Lily and Sam were excited to work together, but they couldn't decide whether to do an art project or a building project. At first, they disagreed and felt a little upset with each other. Then Lily had a wonderful idea. What if they combined their talents? They could build a model town and Lily could paint beautiful backgrounds and signs for it. Sam loved this idea! They worked together for many days, and their project turned out to be the most amazing one in the class. Their teacher was so impressed that she displayed it in the school's main hallway. Lily and Sam learned that when friends work together and combine their different skills, they can create something even more wonderful than they could alone.",
      words: ["Lily", "and", "Sam", "had", "been", "best", "friends", "since", "they", "were", "very", "young.", "They", "lived", "on", "the", "same", "street", "and", "went", "to", "the", "same", "school", "together", "every", "day.", "Lily", "was", "great", "at", "drawing", "and", "loved", "to", "create", "colorful", "pictures", "of", "animals", "and", "nature.", "Sam", "was", "excellent", "at", "building", "things", "with", "blocks", "and", "always", "came", "up", "with", "creative", "inventions.", "One", "day,", "their", "teacher", "announced", "that", "the", "class", "would", "have", "a", "special", "project", "where", "students", "could", "work", "in", "pairs.", "Lily", "and", "Sam", "were", "excited", "to", "work", "together,", "but", "they", "couldn't", "decide", "whether", "to", "do", "an", "art", "project", "or", "a", "building", "project.", "At", "first,", "they", "disagreed", "and", "felt", "a", "little", "upset", "with", "each", "other.", "Then", "Lily", "had", "a", "wonderful", "idea.", "What", "if", "they", "combined", "their", "talents?", "They", "could", "build", "a", "model", "town", "and", "Lily", "could", "paint", "beautiful", "backgrounds", "and", "signs", "for", "it.", "Sam", "loved", "this", "idea!", "They", "worked", "together", "for", "many", "days,", "and", "their", "project", "turned", "out", "to", "be", "the", "most", "amazing", "one", "in", "the", "class.", "Their", "teacher", "was", "so", "impressed", "that", "she", "displayed", "it", "in", "the", "school's", "main", "hallway.", "Lily", "and", "Sam", "learned", "that", "when", "friends", "work", "together", "and", "combine", "their", "different", "skills,", "they", "can", "create", "something", "even", "more", "wonderful", "than", "they", "could", "alone."],
      comprehension: [
        {
          question: "What was Lily good at?",
          options: ["Building", "Drawing", "Singing"],
          correct: 1
        },
        {
          question: "What did they create together?",
          options: ["A painting", "A model town", "A song"],
          correct: 1
        },
        {
          question: "Where was their project displayed?",
          options: ["In the classroom", "In the main hallway", "At home"],
          correct: 1
        }
      ]
    }
  ];

  const startReading = (story: any) => {
    setSelectedStory(story);
    setCurrentWordIndex(0);
    setIsPlaying(false);
  };

  const playPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      autoAdvanceWords();
    }
  };

  const autoAdvanceWords = () => {
    if (!isPlaying || !selectedStory) return;
    
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= selectedStory.words.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  };

  const resetReading = () => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
  };

  const completeStory = () => {
    setPoints(points + 20);
    toast({
      title: "Story Complete! +20 points",
      description: "Great job reading the whole story!"
    });
  };

  const handleComprehension = (questionIndex: number, selectedAnswer: number) => {
    const question = selectedStory.comprehension[questionIndex];
    if (selectedAnswer === question.correct) {
      setPoints(points + 10);
      toast({
        title: "Correct! +10 points",
        description: "You understood the story well!"
      });
    } else {
      toast({
        title: "Try again!",
        description: "Read the story again to find the answer."
      });
    }
  };

  useEffect(() => {
    if (isPlaying) {
      autoAdvanceWords();
    }
  }, [isPlaying]);

  const renderStoryList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <Card
          key={story.id}
          className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl border-2 hover:border-blue-300"
          onClick={() => startReading(story)}
        >
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{story.emoji}</div>
            <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              story.level === 'Beginner' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {story.level}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 text-sm">
              {story.text.slice(0, 80)}...
            </p>
            <div className="mt-4 text-center">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Book className="w-4 h-4 mr-2" />
                Start Reading
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStory = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setSelectedStory(null)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Button>
        <div className="text-6xl">{selectedStory.emoji}</div>
      </div>

      <Card className="shadow-xl mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardTitle className="text-2xl text-center">{selectedStory.title}</CardTitle>
          <p className="text-center text-blue-100">{selectedStory.level} Level</p>
        </CardHeader>
        <CardContent className="p-8">
          {/* Reading Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={playPause} className="bg-green-600 hover:bg-green-700">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={resetReading} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            {currentWordIndex >= selectedStory.words.length - 1 && (
              <Button onClick={completeStory} className="bg-purple-600 hover:bg-purple-700">
                <Star className="w-4 h-4 mr-2" />
                Complete
              </Button>
            )}
          </div>

          {/* Story Text */}
          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <div className="text-xl leading-relaxed text-justify">
              {selectedStory.words.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mx-1 my-1 px-2 py-1 rounded transition-all duration-300 ${
                    index === currentWordIndex
                      ? 'bg-yellow-300 text-black font-bold scale-110'
                      : index < currentWordIndex
                      ? 'bg-green-200 text-green-800'
                      : 'text-gray-600'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / selectedStory.words.length) * 100}%` }}
            ></div>
          </div>

          {/* Comprehension Questions */}
          {currentWordIndex >= selectedStory.words.length - 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-purple-800 mb-6">
                📚 Understanding Check
              </h3>
              {selectedStory.comprehension.map((question, qIndex) => (
                <Card key={qIndex} className="bg-purple-50 border-2 border-purple-200">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-4 text-purple-800">
                      {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <Button
                          key={oIndex}
                          onClick={() => handleComprehension(qIndex, oIndex)}
                          variant="outline"
                          className="w-full text-left justify-start hover:bg-purple-100"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            📖 Reading Practice
          </h1>
          <p className="text-xl text-gray-700">
            Practice reading with fun stories and improve your skills!
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-4">
            <span className="text-lg font-semibold text-blue-600">
              Points Earned: {points} ⭐
            </span>
          </div>
        </div>

        {selectedStory ? renderStory() : renderStoryList()}

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 mx-auto text-lg px-6 py-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ReadingPractice;
