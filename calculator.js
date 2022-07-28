function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    alert("Illegal operation, cannot divide by 0");
    location.reload();
  } else {
    return x / y;
  }
}

function operate(stack) {
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
  numberDisplay.innerHTML = currentNumbers;
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function updateOperatorDisplay(operator) {
  currentOperator = operator;
  operatorDisplay.innerHTML = currentOperator;
}

function operatorPress(operator) {
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
  stack.push(currentNumbers);
  currentNumbers = "0";
  stack.push(operator);
}

function decimalPress() {
  if (!currentNumbers.includes(".")) {
    currentNumbers += ".";
    updateNumberDisplay();
  }
}

function deletePress() {
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
