const BASE_URL = "http://localhost:8080/api";

export const submitStartupGoals = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/startup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit goals: ${response.status}`);
    }

    const result = await response.json();
    console.log("Goals submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error submitting goals:", error);
    throw new Error("Failed to submit goals. Please try again later.");
  }
};
