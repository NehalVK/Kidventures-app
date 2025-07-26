
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface TopicDetailProps {
  topic: {
    title: string;
    content: string;
    detailedContent: string;
    image: string;
    quiz: {
      question: string;
      options: string[];
      correct: string;
      explanation: string;
    }[];
  };
  onBack: () => void;
  onPointsEarned: (points: number) => void;
}

const TopicDetail = ({ topic, onBack, onPointsEarned }: TopicDetailProps) => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === topic.quiz[currentQuiz].correct) {
      const newScore = score + 5;
      setScore(newScore);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < topic.quiz.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setAnswered(false);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
      onPointsEarned(score);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer("");
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Topics
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-kidblue">{topic.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl mb-4 text-center">{topic.image}</div>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              {topic.detailedContent}
            </p>
          </div>
        </CardContent>
      </Card>

      {!quizStarted ? (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-kidblue mb-4">
              Test Your Knowledge!
            </h3>
            <p className="mb-4 text-gray-600">
              Ready to take a quiz about {topic.title}? You can earn up to {topic.quiz.length * 5} points!
            </p>
            <Button
              onClick={() => setQuizStarted(true)}
              className="bg-kidblue hover:bg-blue-600"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      ) : !quizCompleted ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-kidblue text-center">
              Quiz: Question {currentQuiz + 1} of {topic.quiz.length}
            </CardTitle>
            <div className="text-center">
              <span className="bg-kidblue text-white px-3 py-1 rounded-full text-sm">
                Score: {score} points
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-4">
              {topic.quiz[currentQuiz].question}
            </p>
            
            <div className="grid gap-2 mb-4">
              {topic.quiz[currentQuiz].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  variant={
                    answered
                      ? option === topic.quiz[currentQuiz].correct
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
                <p className="text-sm text-gray-700 mb-3">
                  {topic.quiz[currentQuiz].explanation}
                </p>
                <Button 
                  onClick={nextQuestion}
                  className="bg-kidblue hover:bg-blue-600"
                >
                  {currentQuiz < topic.quiz.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-kidblue mb-4">
              🎉 Quiz Complete!
            </h3>
            <p className="text-lg mb-4">
              You scored {score} out of {topic.quiz.length * 5} points!
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={resetQuiz}
                variant="outline"
              >
                Retake Quiz
              </Button>
              <Button 
                onClick={onBack}
                className="bg-kidblue hover:bg-blue-600"
              >
                Back to Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopicDetail;
