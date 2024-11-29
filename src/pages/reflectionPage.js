import React, { useState, useEffect } from "react";
import { fetchReflectionQuestions, submitReflection } from "../services/reflectionService";

const ReflectionPage = () => {
  const [goals, setGoals] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await fetchReflectionQuestions();
        setGoals(questions);

        const initialAnswers = {};
        questions.forEach((goal) => {
          initialAnswers[goal.id] = goal.questions.map(() => null);
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Failed to fetch reflection questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (goalId, questionIndex, value) => {
    const newAnswers = { ...answers };
    newAnswers[goalId][questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const record = {
        date: new Date().toISOString(),
        answers,
      };
      const response = await submitReflection(record);
      console.log("Reflection submitted successfully:", response);
    } catch (error) {
      console.error("Failed to submit reflection:", error);
    }
  };

  return (
    <div>
      <h1>Reflection</h1>
      <form>
        {goals.map((goal) => (
          <div key={goal.id} style={{ marginBottom: "2rem" }}>
            <h2>{goal.goal}</h2>
            {goal.questions.map((question, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p>{question}</p>
                <div>
                  {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map(
                    (option, i) => (
                      <label key={i} style={{ marginRight: "1rem" }}>
                        <input
                          type="checkbox"
                          name={`goal-${goal.id}-question-${index}`}
                          value={option}
                          checked={answers[goal.id]?.[index] === option}
                          onChange={() => handleAnswerChange(goal.id, index, option)}
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit Reflection
        </button>
      </form>
    </div>
  );
};

export default ReflectionPage;
