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
  return x / y;
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

function updateNumberDisplay(str) {
  if (currentNumbers.length <= 15) {
    if (currentNumbers === "0" || currentOperator === "=") {
      currentNumbers = str;
      numberDisplay.innerHTML = currentNumbers;
    } else {
      currentNumbers += str;
      numberDisplay.innerHTML = currentNumbers;
    }
  }
}

function updateOperatorDisplay(operator) {
  currentOperator = operator;
  operatorDisplay.innerHTML = currentOperator;
}

function operatorPress(operator) {
  updateOperatorDisplay(operator);
  if (stack.length === 2) {
    if (operator === "=") {
      stack.push(currentNumbers);
      currentNumbers = String(operate(stack));
      numberDisplay.innerHTML = currentNumbers;
      stack = [];
    } else {
      stack.push(currentNumbers);
      currentNumbers = String(operate(stack));
      numberDisplay.innerHTML = currentNumbers;
      stack = [];
      stack.push(currentNumbers);
      currentNumbers = "0";
      stack.push(operator);
    }
  } else {
    stack.push(currentNumbers);
    currentNumbers = "0";
    stack.push(operator);
  }
}

const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let currentOperator = "";
let currentNumbers = "0";
let stack = [];

numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    updateNumberDisplay(e.target.id);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    operatorPress(e.target.id);
  });
});
