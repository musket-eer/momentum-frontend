import React, { useState, useEffect } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const [goals, setGoals] = useState([]);

  // Fetch data from the backend when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate trend (positive, negative, or flat) based on the 7-day scores
  const calculateTrend = (scores) => {
    if (!scores || scores.length < 2) return 0;
    const first = scores[0].score; // First day score
    const last = scores[scores.length - 1].score; // Last day score
    return last - first; // Positive for rising, negative for falling
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {goals.map((goal) => {
          const trend = calculateTrend(goal.scores);
          const lineColor = trend > 0 ? "#82ca9d" : trend < 0 ? "#ff6b6b" : "#8884d8"; // Green for rising, red for falling, blue for flat

          return (
            <div
              key={goal.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "350px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{goal.name}</h3>
              <p>
                <strong>Description:</strong> {goal.description}
              </p>
              <p>
                <strong>Current Trend:</strong>{" "}
                {trend > 0 ? "Improving" : trend < 0 ? "Declining" : "Stable"}
              </p>
              <div style={{ height: "200px", width: "100%" }}>
                <ResponsiveContainer>
                  <LineChart data={goal.scores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={lineColor}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
