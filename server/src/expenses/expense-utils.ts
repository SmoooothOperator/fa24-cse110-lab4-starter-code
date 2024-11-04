import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

  try {
      // Type casting the request body to the expected format.
      const { id, cost, description } = req.body as { id: string, cost: number, description: string };

      if (!description || !id || !cost) {
          return res.status(400).send({ error: "Missing required fields" });
      }

      await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
      res.status(201).send({ id, description, cost });

  } catch (error) {

      return res.status(400).send({ error: `Expense could not be created, + ${error}` });
  };

}

export async function deleteExpense(req: Request, res: Response, db: Database) {
  const { id } = req.params; // Get the ID from request parameters

  try {
    // Check if the expense exists
    const expense = await db.get('SELECT * FROM expenses WHERE id = ?', [id]);

    if (!expense) {
      // Expense not found
      return res.status(404).json({ message: "Expense not found" });
    }

    // Delete the expense
    await db.run('DELETE FROM expenses WHERE id = ?', [id]);
    res.status(200).json({ message: "Expense deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
  try {
    // Retrieve all expenses from the database
    const expenses = await db.all('SELECT * FROM expenses');
    res.status(200).send({ data: expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving expenses" });
  }
}
