import { Globe } from "lucide-react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import TopicDetail from "../components/geography/TopicDetail";
import { useAge } from "../context/AgeContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Geography = () => {
  const { ageGroup } = useAge();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  const detailedTopics = {
    "5-7": [
      {
        title: "World Map",
        content: "Let's explore the continents and oceans of our planet!",
        detailedContent: "Our Earth is divided into 7 big pieces of land called continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia. Between these continents are huge bodies of water called oceans. The biggest ocean is the Pacific Ocean! Each continent has different countries, animals, and weather. North America is where we live, and it has countries like the United States, Canada, and Mexico. People all over the world speak different languages and have different traditions, but we all share the same beautiful planet Earth!",
        image: "🗺️",
        quiz: [
          {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: "7",
            explanation: "There are 7 continents on Earth: Asia, Africa, North America, South America, Antarctica, Europe, and Australia!"
          },
          {
            question: "What is the biggest ocean?",
            options: ["Atlantic", "Pacific", "Indian", "Arctic"],
            correct: "Pacific",
            explanation: "The Pacific Ocean is the largest ocean on Earth!"
          }
        ]
      },
      {
        title: "Weather Watch",
        content: "Learn about different types of weather and seasons.",
        detailedContent: "Weather is what's happening outside right now - is it sunny, rainy, snowy, or cloudy? We have four seasons: Spring (when flowers bloom), Summer (hot and sunny), Fall/Autumn (leaves change colors), and Winter (cold and sometimes snowy). Different places around the world have different weather. Some places are always hot like deserts, some are always cold like the North Pole, and some places have all four seasons like where we live! Weather helps plants grow and gives animals water to drink.",
        image: "🌤️",
        quiz: [
          {
            question: "How many seasons are there?",
            options: ["3", "4", "5", "6"],
            correct: "4",
            explanation: "There are 4 seasons: Spring, Summer, Fall (Autumn), and Winter!"
          },
          {
            question: "What season comes after winter?",
            options: ["Summer", "Fall", "Spring", "Autumn"],
            correct: "Spring",
            explanation: "Spring comes after winter, when flowers start to bloom and it gets warmer!"
          }
        ]
      }
    ],
    "8-10": [
      {
        title: "Countries & Capitals",
        content: "Learn about different countries and their capital cities.",
        detailedContent: "Every country has a special city called its capital. This is usually where the government works and makes important decisions. For example, Washington D.C. is the capital of the United States, Ottawa is the capital of Canada, and Paris is the capital of France. Some capitals are also the biggest cities in their countries, but not always! Did you know that New York is the biggest city in the US, but Washington D.C. is the capital? Learning about capitals helps us understand how countries are organized and where important decisions are made.",
        image: "🏛️",
        quiz: [
          {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: "Paris",
            explanation: "Paris is the capital of France and home to the famous Eiffel Tower!"
          },
          {
            question: "What is the capital of the United States?",
            options: ["New York", "Los Angeles", "Chicago", "Washington D.C."],
            correct: "Washington D.C.",
            explanation: "Washington D.C. is the capital of the United States, even though New York is bigger!"
          }
        ]
      },
      {
        title: "Natural Wonders",
        content: "Explore amazing natural features like mountains and rivers.",
        detailedContent: "Our planet has incredible natural features that took millions of years to form! Mountains are created when the Earth's surface pushes up, and the tallest mountain is Mount Everest in Asia. Rivers are flowing water that starts from mountains or lakes and flows to the ocean - the longest river is the Nile in Africa. We also have amazing waterfalls like Niagara Falls, deep canyons like the Grand Canyon, and vast deserts like the Sahara. These natural wonders show us how powerful and beautiful nature can be!",
        image: "🏔️",
        quiz: [
          {
            question: "What is the tallest mountain in the world?",
            options: ["Mount Kilimanjaro", "Mount Everest", "Mount McKinley", "Mount Fuji"],
            correct: "Mount Everest",
            explanation: "Mount Everest in the Himalayas is the tallest mountain in the world!"
          },
          {
            question: "What is the longest river in the world?",
            options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
            correct: "Nile",
            explanation: "The Nile River in Africa is the longest river in the world!"
          }
        ]
      }
    ],
    "11-15": [
      {
        title: "Geography Challenge",
        content: "Test your knowledge of maps, locations, and geographical features.",
        detailedContent: "Geography is the study of Earth's features, places, and the relationships between people and their environments. It includes physical geography (mountains, rivers, climate) and human geography (cities, countries, cultures). Understanding geography helps us learn about different climates, from tropical rainforests near the equator to polar ice caps at the poles. We study latitude and longitude to locate places precisely, learn about tectonic plates that cause earthquakes and create mountains, and understand how geography affects human settlements and trade routes throughout history.",
        image: "🌍",
        quiz: [
          {
            question: "Which line divides the Earth into Northern and Southern hemispheres?",
            options: ["Prime Meridian", "Tropic of Cancer", "Equator", "Arctic Circle"],
            correct: "Equator",
            explanation: "The Equator is the imaginary line that divides Earth into Northern and Southern hemispheres!"
          },
          {
            question: "What causes earthquakes?",
            options: ["Ocean waves", "Tectonic plate movement", "Wind patterns", "Volcanic ash"],
            correct: "Tectonic plate movement",
            explanation: "Earthquakes are caused by the movement of tectonic plates beneath Earth's surface!"
          }
        ]
      },
      {
        title: "Historical Events",
        content: "Important moments that shaped our world.",
        detailedContent: "History is full of fascinating events that changed the world! The Ancient Egyptians built amazing pyramids over 4,000 years ago that still stand today. Explorers like Christopher Columbus discovered new lands, connecting different parts of the world. The Industrial Revolution in the 1700s-1800s brought us machines and factories. Important leaders like Abraham Lincoln fought to end slavery, and movements for civil rights have helped make society more fair for everyone. Understanding history helps us learn from the past and make better decisions for the future.",
        image: "📜",
        quiz: [
          {
            question: "Who was the first person to walk on the moon?",
            options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
            correct: "Neil Armstrong",
            explanation: "Neil Armstrong was the first person to walk on the moon in 1969!"
          },
          {
            question: "Which ancient civilization built the pyramids?",
            options: ["Romans", "Greeks", "Egyptians", "Babylonians"],
            correct: "Egyptians",
            explanation: "The ancient Egyptians built the pyramids as tombs for their pharaohs!"
          }
        ]
      }
    ]
  };

  const quizzes = {
    "5-7": [
      {
        question: "Which continent do we live on?",
        options: ["Africa", "Europe", "North America", "Asia"],
        correct: "North America",
        explanation: "We live in North America! It's a big continent with many countries."
      },
      {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Pacific", "Indian", "Arctic"],
        correct: "Pacific",
        explanation: "The Pacific Ocean is the biggest ocean in the world!"
      }
    ],
    "8-10": [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: "Paris",
        explanation: "Paris is the capital of France and home to the Eiffel Tower!"
      },
      {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correct: "Nile",
        explanation: "The Nile River in Africa is the longest river in the world!"
      }
    ],
    "11-15": [
      {
        question: "Which mountain range contains Mount Everest?",
        options: ["Andes", "Rocky Mountains", "Himalayas", "Alps"],
        correct: "Himalayas",
        explanation: "Mount Everest is in the Himalayas, the highest mountain range on Earth!"
      },
      {
        question: "What caused the Ice Age?",
        options: ["Volcanic eruptions", "Climate changes", "Asteroid impact", "Solar activity"],
        correct: "Climate changes",
        explanation: "The Ice Age was caused by long-term climate changes that cooled the Earth!"
      }
    ]
  };

  const currentQuizData = quizzes[ageGroup] || quizzes["8-10"];
  const currentTopics = detailedTopics[ageGroup] || detailedTopics["8-10"];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === currentQuizData[currentQuiz].correct) {
      setScore(score + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < currentQuizData.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setAnswered(false);
      setSelectedAnswer("");
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer("");
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handlePointsEarned = (points) => {
    setTotalPoints(totalPoints + points);
  };

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <TopicDetail
            topic={selectedTopic}
            onBack={() => setSelectedTopic(null)}
            onPointsEarned={handlePointsEarned}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Globe className="text-kidblue text-3xl" />
          <h1 className="text-4xl font-bold text-kidblue">Geography & History</h1>
        </div>

        {totalPoints > 0 && (
          <div className="text-center mb-6">
            <span className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold text-lg">
              Total Points Earned: {totalPoints}
            </span>
          </div>
        )}

        {/* Topics Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-kidblue text-center mb-6">Explore Topics</h2>
          <div className="grid gap-6">
            {currentTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{topic.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-kidblue mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-4">{topic.content}</p>
                      <Button
                        onClick={() => handleTopicSelect(topic)}
                        className="bg-kidblue hover:bg-blue-600"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Quiz Section */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-kidblue text-center">
              🌍 Quick Geography Quiz
            </CardTitle>
            <div className="text-center">
              <span className="bg-kidblue text-white px-3 py-1 rounded-full text-sm">
                Score: {score} points
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {currentQuiz < currentQuizData.length ? (
              <div>
                <div className="mb-4">
                  <p className="text-lg font-semibold mb-4">
                    Question {currentQuiz + 1}: {currentQuizData[currentQuiz].question}
                  </p>
                  
                  <div className="grid gap-2">
                    {currentQuizData[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={answered}
                        variant={
                          answered
                            ? option === currentQuizData[currentQuiz].correct
                              ? "default"
                              : option === selectedAnswer
                              ? "destructive"
                              : "outline"
                            : "outline"
                        }
                        className="justify-start"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {answered && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {currentQuizData[currentQuiz].explanation}
                      </p>
                      {currentQuiz < currentQuizData.length - 1 ? (
                        <Button 
                          onClick={nextQuestion}
                          className="mt-2 bg-kidblue hover:bg-blue-600"
                        >
                          Next Question
                        </Button>
                      ) : (
                        <div className="mt-2">
                          <p className="font-bold text-kidblue">Quiz Complete!</p>
                          <Button 
                            onClick={resetQuiz}
                            className="mt-2 bg-kidblue hover:bg-blue-600"
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl font-bold text-kidblue mb-4">Quiz Complete!</p>
                <p className="mb-4">Final Score: {score} points</p>
                <Button 
                  onClick={resetQuiz}
                  className="bg-kidblue hover:bg-blue-600"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Geography;
