import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { id } = useParams(); // course id
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        const quiz = res.data.quiz || [];
        setQuestions(quiz);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to fetch quiz.");
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;

    questions.forEach((q) => {
      if (userAnswers[q._id] === q.answer) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount >= 3) {
      setTimeout(() => {
        navigate(`/certificate/${id}`);
      }, 2000); // wait 2s before redirecting
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setScore(null);
    setSubmitted(false);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Course Quiz</h2>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500">Loading quiz...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="mb-8 p-4 border border-gray-300 rounded-xl shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-4">
                {index + 1}. {question.question}
              </h3>
              <div className="grid gap-2">
                {question.options.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      onChange={() =>
                        handleOptionChange(question._id, option)
                      }
                      checked={userAnswers[question._id] === option}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="mt-6 text-center">
              <p
                className={`text-xl font-semibold ${
                  score >= 3 ? "text-green-600" : "text-red-500"
                }`}
              >
                {score >= 3
                  ? `You passed! Score: ${score}/${questions.length}`
                  : `You failed. Score: ${score}/${questions.length}`}
              </p>

              <div className="flex flex-col items-center gap-4 mt-4">
                {score < 3 && (
                  <button
                    onClick={handleRetake}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Take Test Again
                  </button>
                )}

                <button
                  onClick={() => navigate(`/certificate/${id}`)}
                  className="flex items-center gap-2 text-blue-600 underline hover:text-blue-800"
                >
                  📜 View Certificate Anyway
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default QuizPage;
