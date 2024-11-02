import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleSave = () => {
    setBudget(newBudget);
    setIsEditing(false);
  };

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={(b) => setNewBudget(Number(b.target.value))}
            className="form-control me-2"
          />
          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          Budget: ${budget}{" "}
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;
