import { render, screen, fireEvent } from "@testing-library/react";
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import { AppProvider } from "./context/AppContext";
describe("Create Budget Tracker", () => {
  test("CreateExpense", () => {
    render(
      <AppProvider>
        <MyBudgetTracker />;
      </AppProvider>
    );

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Apple" } });
    const costInput = screen.getByLabelText("Cost");
    fireEvent.change(costInput, { target: { value: 5 } });
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument;

    fireEvent.click(saveButton);

    const apple = screen.getByText("Apple");
    const appleCost = apple.nextElementSibling;

    expect(apple).toBeInTheDocument;
    expect(appleCost).toHaveTextContent("$5");

    const spent = screen.getByText("Spent so far: $5");
    expect(spent).toBeInTheDocument;

    const remaining = screen.getByText("Remaining: $995");
    expect(remaining).toBeInTheDocument;
  });

  test("DeleteExpense", () => {
    render(
      <AppProvider>
        <MyBudgetTracker />;
      </AppProvider>
    );

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Banana" } });
    const costInput = screen.getByLabelText("Cost");
    fireEvent.change(costInput, { target: { value: 25 } });
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument;

    fireEvent.click(saveButton);

    const banana = screen.getByText("Banana");
    const bananaCost = banana.nextElementSibling;

    expect(banana).toBeInTheDocument;
    expect(bananaCost).toHaveTextContent("$25");

    const spent = screen.getByText("Spent so far: $25");
    expect(spent).toBeInTheDocument;

    const remaining = screen.getByText("Remaining: $975");
    expect(remaining).toBeInTheDocument;

    const deleteButton = screen.getByText("x");
    expect(deleteButton).toBeInTheDocument;
    fireEvent.click(deleteButton);
    expect(banana).not.toBeInTheDocument;

    const spent2 = screen.getByText("Spent so far: $0");
    expect(spent2).toBeInTheDocument;

    const remaining2 = screen.getByText("Remaining: $1000");
    expect(remaining2).toBeInTheDocument;
  });

  test("budgetBalanceVerify", () => {
    render(
      <AppProvider>
        <MyBudgetTracker />;
      </AppProvider>
    );

    let nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Banana" } });
    let costInput = screen.getByLabelText("Cost");
    fireEvent.change(costInput, { target: { value: 25 } });
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument;

    fireEvent.click(saveButton);

    const banana = screen.getByText("Banana");
    const bananaCost = banana.nextElementSibling;

    expect(banana).toBeInTheDocument;
    expect(bananaCost).toHaveTextContent("$25");

    const spent = screen.getByText("Spent so far: $25");
    expect(spent).toBeInTheDocument;

    const remaining = screen.getByText("Remaining: $975");
    expect(remaining).toBeInTheDocument;

    const deleteButton = screen.getByText("x");
    expect(deleteButton).toBeInTheDocument;
    fireEvent.click(deleteButton);
    expect(banana).not.toBeInTheDocument;

    const spent2 = screen.getByText("Spent so far: $0");
    expect(spent2).toBeInTheDocument;

    const remaining2 = screen.getByText("Remaining: $1000");
    expect(remaining2).toBeInTheDocument;

    fireEvent.change(nameInput, { target: { value: "Apple" } });
    fireEvent.change(costInput, { target: { value: 5 } });
    fireEvent.click(saveButton);

    fireEvent.change(nameInput, { target: { value: "Pear" } });
    fireEvent.change(costInput, { target: { value: 20 } });
    fireEvent.click(saveButton);

    const spentTot = screen.getByText("Spent so far: $25");
    expect(spentTot).toBeInTheDocument;

    const remainingTot = screen.getByText("Remaining: $975");
    expect(remainingTot).toBeInTheDocument;
  });
});
