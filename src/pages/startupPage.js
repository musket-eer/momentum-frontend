import React, { useState } from "react";
import { submitStartupGoals } from "../services/startupService";

const StartupPage = () => {
  const [goals, setGoals] = useState([{ goal: "", criteria: "" }]);

  const handleAddGoal = () => {
    setGoals([...goals, { goal: "", criteria: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][field] = value;
    setGoals(updatedGoals);
  };

  const handleSubmit = async () => {
    try {
      const response = await submitStartupGoals(goals);
      console.log("Goals submitted successfully:", response);
    } catch (error) {
      console.error("Failed to submit goals:", error);
    }
  };

  return (
    <div>
      <h1>Define Your Goals</h1>
      {goals.map((goal, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder={`Goal ${index + 1}`}
            value={goal.goal}
            onChange={(e) => handleChange(index, "goal", e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          <input
            type="text"
            placeholder="Criteria for success"
            value={goal.criteria}
            onChange={(e) => handleChange(index, "criteria", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddGoal}>Add Another Goal</button>
      <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>
        Submit Goals
      </button>
    </div>
  );
};

export default StartupPage;
