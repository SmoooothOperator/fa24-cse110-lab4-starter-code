import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching budget: ${response.statusText}`);
    }

    if (typeof data.budget !== "number") {
      throw new Error("Invalid budget format from API");
    }

    return data.budget;
  } catch (error) {
    console.error("Failed to fetch budget:", error);
    throw error; // Re-throw to handle this error where the function is called
  }
};

export const updateBudget = async (budget: number): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: budget }),
    });

    if (!response.ok) {
      throw new Error(`Error updating budget: ${response.statusText}`);
    }

    const data = await response.json();

    if (typeof data.amount !== "number") {
      throw new Error("Invalid response format from API");
    }

    return data.amount; // Return the updated budget amount
  } catch (error) {
    console.error("Failed to update budget:", error);
    throw error; // Re-throw the error to handle it in calling code
  }
};
