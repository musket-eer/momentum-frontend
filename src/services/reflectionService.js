// Fetch reflection questions based on defined goals
const BASE_URL = "russel.com"

export const fetchReflectionQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/reflection/questions`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch reflection questions");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching reflection questions:", error);
      throw error;
    }
  };
  
  // Submit reflection answers
  export const submitReflection = async (reflectionData) => {
    try {
      const response = await fetch(`${BASE_URL}/reflection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reflectionData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit reflection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error submitting reflection:", error);
      throw error;
    }
  };
  