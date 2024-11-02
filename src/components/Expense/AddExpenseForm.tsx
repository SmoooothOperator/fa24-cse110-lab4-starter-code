import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import exp from "constants";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);
  // Exercise: Create name and cost to state variables

  const emptyExpense = {
    id: "",
    name: "",
    cost: 0,
  };
  const [createEntry, setCreateEntry] = useState(emptyExpense);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newEntry: Expense = {
      ...createEntry,
      id: `${createEntry.name}${expenses.length + 1}`,
    };
    setExpenses([...expenses, newEntry]);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            placeholder="Expense Name"
            className="form-control"
            id="name"
            value={createEntry.name}
            onChange={(event) =>
              setCreateEntry({ ...createEntry, name: event.target.value })
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={createEntry.cost}
            onChange={(event) =>
              setCreateEntry({
                ...createEntry,
                cost: Number(event.target.value),
              })
            }
          ></input>
        </div>
        <div className="col-sm">
          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
