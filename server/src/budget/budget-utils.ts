import { Response } from "express";

// Function to get the budget
export function getBudget(res: Response, budget: number) {
  res.status(200).send({ data: budget });
}

// Function to update the budget
export function updateBudget(
  res: Response,
  body: any,
  budget: { amount: number }
) {
  const { amount } = body; // Extract the new budget amount from the request body

  // Check if amount is a valid number
  if (typeof amount !== "number") {
    return res.status(400).send({
      message: "Invalid budget amount. It must be a positive number.",
    });
  }

  // Update the budget
  budget.amount = amount;

  // Send a success response
  res.status(200).send({
    message: "Budget updated successfully.",
    budget: budget.amount,
  });
}
