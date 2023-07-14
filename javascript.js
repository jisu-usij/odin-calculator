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

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function handleOperator() {
  if (wasEqualPressed) {
    operator = this.textContent;
    wasEqualPressed = !wasEqualPressed;
    return;
  }

  if (x === undefined) {
    x = +numberBeingBuilt;
  }

  else {
    y = +numberBeingBuilt;
    x = operate(operator, x, y);
    display.textContent = x;
  }

  numberBeingBuilt = "";
  operator = this.textContent;
}

function handleEqual() {
  if (operator !== undefined) {
    if (numberBeingBuilt !== "") {
      y = +numberBeingBuilt;
      x = operate(operator, x, y);
      display.textContent = x;
      operator = undefined;
      numberBeingBuilt = "";
      wasEqualPressed = !wasEqualPressed;
    }
  }
}

/*
Build up the number as user presses number buttons.
When operator button is pressed and x is undefined:
  Store in x the number that has been built up so far.
  Set numberBeingBuilt to "".
  Store the operator.

Build up the number as user presses number buttons.
When operator button is pressed and x is defined:
  Store in y the number that has been built up so far.
  Set numberBeingBuilt to "".
  Operate on x and y using the existing operator and store the result in x.
  Display the result.
  Store the operator.

When equal button is pressed:
  if operator is not defined, do nothing.
  if operator is defined:
    if numberBeingBuilt === ""
      Do nothing???? Or...
      Show error message that an operand is missing.
    else
      Store in y the number that has been built up so far.
      Operate on x and y using the operator and display that result.
      Set operator to undefined.
*/

let x, y, operator;
let numberBeingBuilt = "";
let wasEqualPressed = false;

const display = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    numberBeingBuilt += button.textContent;
    display.textContent = numberBeingBuilt;
  });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', handleOperator)
})

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', handleEqual);