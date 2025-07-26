
import { useState } from "react";
import { Languages, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import { useAge } from "../context/AgeContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Language = () => {
  const { ageGroup } = useAge();
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState("Spanish");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExercise, setShowExercise] = useState(false);
  const [progress, setProgress] = useState({
    Spanish: 10,
    French: 5,
    Japanese: 0,
    German: 20,
  });
  
  // Language content based on age group
  const languageOptions = {
    "5-7": ["Spanish", "French"],
    "8-10": ["Spanish", "French", "German"],
    "11-15": ["Spanish", "French", "German", "Japanese"],
  };

  // Comprehensive lesson data structure
  const lessons = {
    Spanish: [
      {
        title: "Basic Greetings",
        exercises: [
          { type: "translate", question: "How do you say 'Hello' in Spanish?", answer: "Hola", options: ["Hola", "Adiós", "Gracias", "Por favor"] },
          { type: "translate", question: "How do you say 'Good morning' in Spanish?", answer: "Buenos días", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta luego"] },
          { type: "translate", question: "How do you say 'Good afternoon' in Spanish?", answer: "Buenas tardes", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta mañana"] },
          { type: "translate", question: "How do you say 'Good evening' in Spanish?", answer: "Buenas noches", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta pronto"] },
          { type: "translate", question: "How do you say 'Goodbye' in Spanish?", answer: "Adiós", options: ["Hola", "Adiós", "Gracias", "De nada"] },
          { type: "translate", question: "How do you say 'See you later' in Spanish?", answer: "Hasta luego", options: ["Hasta luego", "Hasta mañana", "Hasta pronto", "Nos vemos"] },
          { type: "translate", question: "How do you say 'See you tomorrow' in Spanish?", answer: "Hasta mañana", options: ["Hasta luego", "Hasta mañana", "Hasta pronto", "Adiós"] },
          { type: "translate", question: "How do you say 'Please' in Spanish?", answer: "Por favor", options: ["Por favor", "Gracias", "De nada", "Perdón"] },
          { type: "translate", question: "How do you say 'Thank you' in Spanish?", answer: "Gracias", options: ["Gracias", "De nada", "Por favor", "Perdón"] },
          { type: "translate", question: "How do you say 'You're welcome' in Spanish?", answer: "De nada", options: ["De nada", "Gracias", "Por favor", "Perdón"] }
        ]
      },
      {
        title: "Numbers 1-20",
        exercises: [
          { type: "translate", question: "How do you say 'One' in Spanish?", answer: "Uno", options: ["Uno", "Dos", "Tres", "Cuatro"] },
          { type: "translate", question: "How do you say 'Two' in Spanish?", answer: "Dos", options: ["Uno", "Dos", "Tres", "Cuatro"] },
          { type: "translate", question: "How do you say 'Three' in Spanish?", answer: "Tres", options: ["Tres", "Cuatro", "Cinco", "Seis"] },
          { type: "translate", question: "How do you say 'Four' in Spanish?", answer: "Cuatro", options: ["Tres", "Cuatro", "Cinco", "Seis"] },
          { type: "translate", question: "How do you say 'Five' in Spanish?", answer: "Cinco", options: ["Cuatro", "Cinco", "Seis", "Siete"] },
          { type: "translate", question: "How do you say 'Six' in Spanish?", answer: "Seis", options: ["Cinco", "Seis", "Siete", "Ocho"] },
          { type: "translate", question: "How do you say 'Seven' in Spanish?", answer: "Siete", options: ["Seis", "Siete", "Ocho", "Nueve"] },
          { type: "translate", question: "How do you say 'Eight' in Spanish?", answer: "Ocho", options: ["Siete", "Ocho", "Nueve", "Diez"] },
          { type: "translate", question: "How do you say 'Nine' in Spanish?", answer: "Nueve", options: ["Ocho", "Nueve", "Diez", "Once"] },
          { type: "translate", question: "How do you say 'Ten' in Spanish?", answer: "Diez", options: ["Nueve", "Diez", "Once", "Doce"] }
        ]
      },
      {
        title: "Colors",
        exercises: [
          { type: "translate", question: "How do you say 'Red' in Spanish?", answer: "Rojo", options: ["Rojo", "Azul", "Verde", "Amarillo"] },
          { type: "translate", question: "How do you say 'Blue' in Spanish?", answer: "Azul", options: ["Rojo", "Azul", "Verde", "Amarillo"] },
          { type: "translate", question: "How do you say 'Green' in Spanish?", answer: "Verde", options: ["Verde", "Amarillo", "Negro", "Blanco"] },
          { type: "translate", question: "How do you say 'Yellow' in Spanish?", answer: "Amarillo", options: ["Verde", "Amarillo", "Negro", "Blanco"] },
          { type: "translate", question: "How do you say 'Black' in Spanish?", answer: "Negro", options: ["Negro", "Blanco", "Rosa", "Morado"] },
          { type: "translate", question: "How do you say 'White' in Spanish?", answer: "Blanco", options: ["Negro", "Blanco", "Rosa", "Morado"] },
          { type: "translate", question: "How do you say 'Pink' in Spanish?", answer: "Rosa", options: ["Rosa", "Morado", "Naranja", "Gris"] },
          { type: "translate", question: "How do you say 'Purple' in Spanish?", answer: "Morado", options: ["Rosa", "Morado", "Naranja", "Gris"] },
          { type: "translate", question: "How do you say 'Orange' in Spanish?", answer: "Naranja", options: ["Naranja", "Gris", "Marrón", "Rojo"] },
          { type: "translate", question: "How do you say 'Gray' in Spanish?", answer: "Gris", options: ["Naranja", "Gris", "Marrón", "Azul"] }
        ]
      },
      {
        title: "Family Members",
        exercises: [
          { type: "translate", question: "How do you say 'Father' in Spanish?", answer: "Padre", options: ["Padre", "Madre", "Hermano", "Hermana"] },
          { type: "translate", question: "How do you say 'Mother' in Spanish?", answer: "Madre", options: ["Padre", "Madre", "Hermano", "Hermana"] },
          { type: "translate", question: "How do you say 'Brother' in Spanish?", answer: "Hermano", options: ["Hermano", "Hermana", "Hijo", "Hija"] },
          { type: "translate", question: "How do you say 'Sister' in Spanish?", answer: "Hermana", options: ["Hermano", "Hermana", "Hijo", "Hija"] },
          { type: "translate", question: "How do you say 'Son' in Spanish?", answer: "Hijo", options: ["Hijo", "Hija", "Abuelo", "Abuela"] },
          { type: "translate", question: "How do you say 'Daughter' in Spanish?", answer: "Hija", options: ["Hijo", "Hija", "Abuelo", "Abuela"] },
          { type: "translate", question: "How do you say 'Grandfather' in Spanish?", answer: "Abuelo", options: ["Abuelo", "Abuela", "Tío", "Tía"] },
          { type: "translate", question: "How do you say 'Grandmother' in Spanish?", answer: "Abuela", options: ["Abuelo", "Abuela", "Tío", "Tía"] },
          { type: "translate", question: "How do you say 'Uncle' in Spanish?", answer: "Tío", options: ["Tío", "Tía", "Primo", "Prima"] },
          { type: "translate", question: "How do you say 'Aunt' in Spanish?", answer: "Tía", options: ["Tío", "Tía", "Primo", "Prima"] }
        ]
      },
      {
        title: "Common Animals",
        exercises: [
          { type: "translate", question: "How do you say 'Dog' in Spanish?", answer: "Perro", options: ["Perro", "Gato", "Pájaro", "Pez"] },
          { type: "translate", question: "How do you say 'Cat' in Spanish?", answer: "Gato", options: ["Perro", "Gato", "Pájaro", "Pez"] },
          { type: "translate", question: "How do you say 'Bird' in Spanish?", answer: "Pájaro", options: ["Pájaro", "Pez", "Caballo", "Vaca"] },
          { type: "translate", question: "How do you say 'Fish' in Spanish?", answer: "Pez", options: ["Pájaro", "Pez", "Caballo", "Vaca"] },
          { type: "translate", question: "How do you say 'Horse' in Spanish?", answer: "Caballo", options: ["Caballo", "Vaca", "Cerdo", "Oveja"] },
          { type: "translate", question: "How do you say 'Cow' in Spanish?", answer: "Vaca", options: ["Caballo", "Vaca", "Cerdo", "Oveja"] },
          { type: "translate", question: "How do you say 'Pig' in Spanish?", answer: "Cerdo", options: ["Cerdo", "Oveja", "Pollo", "Ratón"] },
          { type: "translate", question: "How do you say 'Sheep' in Spanish?", answer: "Oveja", options: ["Cerdo", "Oveja", "Pollo", "Ratón"] },
          { type: "translate", question: "How do you say 'Chicken' in Spanish?", answer: "Pollo", options: ["Pollo", "Ratón", "León", "Elefante"] },
          { type: "translate", question: "How do you say 'Mouse' in Spanish?", answer: "Ratón", options: ["Pollo", "Ratón", "León", "Elefante"] }
        ]
      }
    ],
    French: [
      {
        title: "Basic Greetings",
        exercises: [
          { type: "translate", question: "How do you say 'Hello' in French?", answer: "Bonjour", options: ["Bonjour", "Bonsoir", "Salut", "Au revoir"] },
          { type: "translate", question: "How do you say 'Good evening' in French?", answer: "Bonsoir", options: ["Bonjour", "Bonsoir", "Salut", "Bonne nuit"] },
          { type: "translate", question: "How do you say 'Hi' in French?", answer: "Salut", options: ["Salut", "Bonjour", "Au revoir", "Merci"] },
          { type: "translate", question: "How do you say 'Goodbye' in French?", answer: "Au revoir", options: ["Au revoir", "À bientôt", "Salut", "Bonne nuit"] },
          { type: "translate", question: "How do you say 'Good night' in French?", answer: "Bonne nuit", options: ["Bonne nuit", "Bonsoir", "Au revoir", "À demain"] },
          { type: "translate", question: "How do you say 'See you tomorrow' in French?", answer: "À demain", options: ["À demain", "À bientôt", "Au revoir", "Salut"] },
          { type: "translate", question: "How do you say 'Please' in French?", answer: "S'il vous plaît", options: ["S'il vous plaît", "Merci", "De rien", "Excusez-moi"] },
          { type: "translate", question: "How do you say 'Thank you' in French?", answer: "Merci", options: ["Merci", "De rien", "S'il vous plaît", "Pardon"] },
          { type: "translate", question: "How do you say 'You're welcome' in French?", answer: "De rien", options: ["De rien", "Merci", "S'il vous plaît", "Excusez-moi"] },
          { type: "translate", question: "How do you say 'Excuse me' in French?", answer: "Excusez-moi", options: ["Excusez-moi", "Pardon", "Désolé", "Merci"] }
        ]
      }
    ],
    German: [
      {
        title: "Basic Greetings",
        exercises: [
          { type: "translate", question: "How do you say 'Hello' in German?", answer: "Hallo", options: ["Hallo", "Guten Tag", "Guten Abend", "Auf Wiedersehen"] },
          { type: "translate", question: "How do you say 'Good morning' in German?", answer: "Guten Morgen", options: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"] },
          { type: "translate", question: "How do you say 'Good day' in German?", answer: "Guten Tag", options: ["Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht"] },
          { type: "translate", question: "How do you say 'Good evening' in German?", answer: "Guten Abend", options: ["Guten Tag", "Guten Abend", "Gute Nacht", "Auf Wiedersehen"] },
          { type: "translate", question: "How do you say 'Good night' in German?", answer: "Gute Nacht", options: ["Guten Abend", "Gute Nacht", "Auf Wiedersehen", "Bis morgen"] },
          { type: "translate", question: "How do you say 'Goodbye' in German?", answer: "Auf Wiedersehen", options: ["Auf Wiedersehen", "Bis bald", "Tschüss", "Bis morgen"] },
          { type: "translate", question: "How do you say 'See you soon' in German?", answer: "Bis bald", options: ["Bis bald", "Bis morgen", "Tschüss", "Auf Wiedersehen"] },
          { type: "translate", question: "How do you say 'Please' in German?", answer: "Bitte", options: ["Bitte", "Danke", "Entschuldigung", "Verzeihung"] },
          { type: "translate", question: "How do you say 'Thank you' in German?", answer: "Danke", options: ["Danke", "Bitte", "Entschuldigung", "Gern geschehen"] },
          { type: "translate", question: "How do you say 'You're welcome' in German?", answer: "Gern geschehen", options: ["Gern geschehen", "Bitte", "Danke", "Entschuldigung"] }
        ]
      }
    ],
    Japanese: [
      {
        title: "Basic Greetings",
        exercises: [
          { type: "translate", question: "How do you say 'Hello' in Japanese?", answer: "こんにちは", options: ["こんにちは", "こんばんは", "おはよう", "さようなら"] },
          { type: "translate", question: "How do you say 'Good morning' in Japanese?", answer: "おはよう", options: ["おはよう", "こんにちは", "こんばんは", "おやすみ"] },
          { type: "translate", question: "How do you say 'Good evening' in Japanese?", answer: "こんばんは", options: ["こんにちは", "こんばんは", "おやすみ", "さようなら"] },
          { type: "translate", question: "How do you say 'Good night' in Japanese?", answer: "おやすみ", options: ["おやすみ", "こんばんは", "さようなら", "また明日"] },
          { type: "translate", question: "How do you say 'Goodbye' in Japanese?", answer: "さようなら", options: ["さようなら", "また明日", "また今度", "バイバイ"] },
          { type: "translate", question: "How do you say 'See you tomorrow' in Japanese?", answer: "また明日", options: ["また明日", "また今度", "さようなら", "バイバイ"] },
          { type: "translate", question: "How do you say 'Please' in Japanese?", answer: "お願いします", options: ["お願いします", "ありがとう", "どういたしまして", "すみません"] },
          { type: "translate", question: "How do you say 'Thank you' in Japanese?", answer: "ありがとう", options: ["ありがとう", "どういたしまして", "お願いします", "すみません"] },
          { type: "translate", question: "How do you say 'You're welcome' in Japanese?", answer: "どういたしまして", options: ["どういたしまして", "ありがとう", "お願いします", "すみません"] },
          { type: "translate", question: "How do you say 'Excuse me' in Japanese?", answer: "すみません", options: ["すみません", "ごめんなさい", "失礼します", "お疲れ様"] }
        ]
      }
    ]
  };

  // Current available languages based on age group
  const availableLanguages = languageOptions[ageGroup] || [];

  // Get current exercise
  const currentExerciseData = 
    lessons[currentLanguage] && 
    lessons[currentLanguage][currentLesson] && 
    lessons[currentLanguage][currentLesson].exercises[currentExerciseIndex];

  // Handle starting a lesson
  const handleStartLesson = (language, lessonIndex) => {
    setCurrentLanguage(language);
    setCurrentLesson(lessonIndex);
    setCurrentExerciseIndex(0);
    setShowExercise(true);
    setIsAnswerCorrect(null);
    setUserAnswer("");
    setSelectedOption(null);
  };

  // Handle next exercise
  const handleNextExercise = () => {
    const currentLessonData = lessons[currentLanguage][currentLesson];
    if (currentExerciseIndex < currentLessonData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsAnswerCorrect(null);
      setUserAnswer("");
      setSelectedOption(null);
    } else {
      handleBackToLessons();
    }
  };

  // Handle previous exercise
  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setIsAnswerCorrect(null);
      setUserAnswer("");
      setSelectedOption(null);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (currentExerciseData.type === "translate") {
      let correct;
      
      if (selectedOption !== null) {
        correct = currentExerciseData.options[selectedOption] === currentExerciseData.answer;
      } else {
        correct = userAnswer.toLowerCase().trim() === currentExerciseData.answer.toLowerCase();
      }
      
      setIsAnswerCorrect(correct);
      
      if (correct) {
        toast({
          title: "Correct! Great job! 🎉",
          description: `You've earned 5 points!`,
        });
        
        // Update progress
        setProgress(prev => ({
          ...prev,
          [currentLanguage]: Math.min(100, prev[currentLanguage] + 1)
        }));
      } else {
        toast({
          title: "Not quite right",
          description: `The correct answer is: ${currentExerciseData.answer}`,
        });
      }
    }
  };

  // Back to lessons
  const handleBackToLessons = () => {
    setShowExercise(false);
    setCurrentExerciseIndex(0);
  };

  // Render language cards for selection
  const renderLanguageCards = () => {
    return availableLanguages.map(language => (
      <Card key={language} className="mb-4 hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-xl flex items-center justify-between">
            {language}
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {lessons[language]?.reduce((total, lesson) => total + lesson.exercises.length, 0)} exercises
            </span>
          </CardTitle>
          <CardDescription className="text-white text-opacity-90">
            {progress[language] >= 100 ? "Completed!" : `${progress[language]}% complete`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Progress value={progress[language]} className="mb-4" />
          
          <Collapsible className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full mb-2">
                View {lessons[language]?.length || 0} Lessons
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                {lessons[language]?.map((lesson, index) => (
                  <Button 
                    key={index}
                    variant="ghost"
                    className="w-full justify-between text-left border-l-4 border-blue-500 pl-3 py-3"
                    onClick={() => handleStartLesson(language, index)}
                  >
                    <span>{index + 1}. {lesson.title}</span>
                    <span className="text-xs text-gray-500">{lesson.exercises.length} exercises</span>
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    ));
  };

  // Render exercise
  const renderExercise = () => {
    if (!currentExerciseData) return null;
    
    const currentLessonData = lessons[currentLanguage][currentLesson];
    const totalExercises = currentLessonData.exercises.length;
    const exerciseProgress = ((currentExerciseIndex + 1) / totalExercises) * 100;
    
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {/* Progress Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Button 
                variant="ghost" 
                onClick={handleBackToLessons} 
                className="text-white hover:text-white hover:bg-white hover:bg-opacity-20"
              >
                ← Back to Lessons
              </Button>
              <span className="text-sm">
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">
              {currentLanguage}: {currentLessonData.title}
            </h2>
            <Progress value={exerciseProgress} className="bg-white/20" />
          </CardContent>
        </Card>

        {/* Exercise Content */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {currentExerciseData.question}
              </h3>
              
              {currentExerciseData.type === "translate" && (
                <div className="space-y-4">
                  {currentExerciseData.options ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentExerciseData.options.map((option, index) => (
                        <div 
                          key={index} 
                          className={`
                            p-6 border-2 rounded-xl cursor-pointer transition-all font-medium text-lg
                            ${selectedOption === index ? 'bg-blue-50 border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
                            ${isAnswerCorrect === true && selectedOption === index ? 'bg-green-50 border-green-500' : ''}
                            ${isAnswerCorrect === false && selectedOption === index ? 'bg-red-50 border-red-500' : ''}
                          `}
                          onClick={() => setSelectedOption(index)}
                        >
                          <div className="flex items-center gap-4">
                            <Checkbox 
                              checked={selectedOption === index} 
                              onCheckedChange={() => setSelectedOption(index)}
                              className="w-5 h-5"
                            />
                            <span className="text-lg">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Input
                      placeholder="Type your answer..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full text-lg p-4"
                    />
                  )}
                </div>
              )}
            </div>
            
            {isAnswerCorrect === null ? (
              <Button 
                onClick={handleSubmitAnswer} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                disabled={selectedOption === null && !userAnswer}
              >
                Check Answer
              </Button>
            ) : (
              <div className="text-center space-y-4">
                <p className={`text-2xl font-bold ${isAnswerCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isAnswerCorrect ? "Correct! 🎉" : `Not quite right. The answer is: ${currentExerciseData.answer}`}
                </p>
                
                <div className="flex gap-3 justify-center">
                  {currentExerciseIndex > 0 && (
                    <Button 
                      onClick={handlePreviousExercise} 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleNextExercise} 
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    {currentExerciseIndex < totalExercises - 1 ? (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      "Finish Lesson"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="text-blue-600 text-4xl" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Language Learning
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn new languages through fun, interactive lessons and exercises! Start with any language below.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {!showExercise ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderLanguageCards()}
            </div>
          ) : (
            renderExercise()
          )}
        </div>
      </main>
    </div>
  );
};

export default Language;
