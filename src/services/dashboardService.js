const BASE_URL = "http://localhost:8080/api";

export const fetchDashboardData = async () => {
  try {
    // Fetch the response from the backend
    const response = await fetch(`${BASE_URL}/dashboard`);

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Validate the structure of the response
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format: Expected an array of goals.");
    }

    // Check if all goals have the expected structure
    data.forEach((goal) => {
      if (
        !goal.name ||
        !goal.description ||
        !Array.isArray(goal.scores) ||
        goal.scores.some((score) => typeof score.score !== "number" || !score.day)
      ) {
        throw new Error(
          `Invalid data structure for goal: ${JSON.stringify(goal)}`
        );
      }
    });

    // If everything is fine, return the data
    return data;
  } catch (error) {
    // Log and throw a meaningful error message
    console.error("Error fetching dashboard data:", error.message);
    throw new Error("Failed to fetch dashboard data. Please try again later.");
  }
};
