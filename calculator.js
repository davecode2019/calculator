function add(x, y) {
  // Function to add two numbers and return the result.
  return x + y;
}

function subtract(x, y) {
  // Function to subtract two numbers and return the result.
  return x - y;
}

function multiply(x, y) {
  // Function to multiply two numbers and return the result.
  return x * y;
}

function divide(x, y) {
  // Function to divide two numbers and return the result.
  // Provides feedback to user and reloads app if user attempts to divide by 0.
  if (y === 0) {
    alert("Illegal operation, cannot divide by 0");
    location.reload();
  } else {
    return x / y;
  }
}

function operate(stack) {
  // Takes an array and performs appropriate calculation actions based on contents.
  let x = Number(stack[0]);
  let y = Number(stack[2]);
  switch (stack[1]) {
    case "+":
      return add(x, y);
      break;
    case "-":
      return subtract(x, y);
      break;
    case "*":
      return multiply(x, y);
      break;
    case "/":
      return divide(x, y);
      break;
    default:
      return "Invalid operator.";
  }
}

function updateCurrentNumbers(str) {
  // Updates the user entered nuber string.
  if (currentNumbers === "0" || currentOperator === "=") {
    currentNumbers = str;
    updateNumberDisplay();
    updateOperatorDisplay("");
  } else if (currentNumbers.length < 15) {
    currentNumbers += str;
    updateNumberDisplay();
  }
}

function updateNumberDisplay() {
  // Updates the number display of the app.
  numberDisplay.innerHTML = currentNumbers;
}

function expo(x, f) {
  // Converts calculation results to exponential format if too long for the app display.
  return Number.parseFloat(x).toExponential(f);
}

function updateOperatorDisplay(operator) {
  // Updates the operator display of the app.
  currentOperator = operator;
  operatorDisplay.innerHTML = currentOperator;
}

function operatorPress(operator) {
  // Processes user presses of operator buttons.
  updateOperatorDisplay(operator);
  if (stack.length === 2) {
    if (operator === "=") {
      performOperation();
    } else {
      performOperation();
      updateStack(operator);
    }
  } else {
    updateStack(operator);
  }
}

function performOperation() {
  // Performs operations once enough information has been provided and arranges display of results.
  stack.push(currentNumbers);
  currentNumbers = String(operate(stack));
  if (currentNumbers.length <= 15) {
    updateNumberDisplay();
  } else {
    currentNumbers = expo(currentNumbers, 10);
    updateNumberDisplay();
  }
  stack = [];
}

function updateStack(operator) {
  // Updates the stack array as required
  stack.push(currentNumbers);
  currentNumbers = "0";
  stack.push(operator);
}

function decimalPress() {
  // Allows the use of decimals in user entered numbers. Only one decimal can be added
  if (!currentNumbers.includes(".")) {
    currentNumbers += ".";
    updateNumberDisplay();
  }
}

function deletePress() {
  // Allows user to delete mistyped input.
  if (currentNumbers.length > 1) {
    currentNumbers = currentNumbers.slice(0, currentNumbers.length - 1);
    updateNumberDisplay();
  } else if (currentNumbers.length === 1) {
    currentNumbers = "0";
    updateNumberDisplay();
  }
}

const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const cancelButton = document.querySelector(".cancel");
const deleteButton = document.querySelector(".delete");

let currentOperator = "";
let currentNumbers = "0";
let stack = [];

updateNumberDisplay();

numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    updateCurrentNumbers(e.target.id);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    operatorPress(e.target.id);
  });
});

decimalButton.addEventListener("click", function (e) {
  decimalPress();
});

cancelButton.addEventListener("click", function (e) {
  location.reload();
});

deleteButton.addEventListener("click", function (e) {
  deletePress();
});
