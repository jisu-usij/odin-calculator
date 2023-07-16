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
    alert("Hey! No dividing by zero allowed!\nCleared the calculator.");
    handleClear();
    return;
  }
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
  if (numberBeingBuilt === "") {
    // If equal button was the last button pressed, then
    // when an operator button is pressed, the calculation
    // has already been done, and there is no second operand
    // to perform an operation on, so just store the operator.
    if (wasEqualPressed) {
      wasEqualPressed = !wasEqualPressed;
    }

    else {
      if (x === undefined) {
        alert("There is no operand to perform an operation on.");
        return;
      }
      // If the first operand exists, just store the operator
      // (and overwrite any existing operator).
    }
  }

  else {
    // No operand has been stored, so just store the number
    // that has been built as the first operand. There is no second
    // operand to perform an operation on.
    if (x === undefined) {
      x = +numberBeingBuilt;
    }

    // There is an existing operand, so store the number that has
    // been built as the second operand, and perform the operation.
    else {
      y = +numberBeingBuilt;
      x = operate(operator, x, y);
      display.textContent = x;
    }
  }

  numberBeingBuilt = "";
  operator = this.textContent;
}

function handleEqual() {
  if (operator !== undefined && numberBeingBuilt !== "") {
    y = +numberBeingBuilt;
    x = operate(operator, x, y);
    display.textContent = x;
    operator = undefined;
    numberBeingBuilt = "";
    wasEqualPressed = !wasEqualPressed;
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

function handleClear() {
  x = undefined;
  y = undefined;
  operator = undefined;
  numberBeingBuilt = "";
  display.textContent = "";
  wasEqualPressed = false;
}

function handleNumber() {
  if (wasEqualPressed) {
    handleClear();
  }

  if (numberBeingBuilt === '0') {
    // Don't show more than one zero to represent 0.
    if (this.textContent === '0') {
      return;
    }
    else {
      numberBeingBuilt = this.textContent;
      display.textContent = numberBeingBuilt;
    }
  }

  else {
    numberBeingBuilt += this.textContent;
    display.textContent = numberBeingBuilt;
  }
}

let x, y, operator;
let numberBeingBuilt = "";
// Is there a better way to get operators to work after pressing the
// equal button without using this boolean?
// Maybe try just setting the operator to "=" and checking
// for that operator value in the operator handler?
// But that's probably not too clear because "=" shouldn't really be
// an operator...
let wasEqualPressed = false;

const display = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', handleNumber);
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', handleOperator)
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', handleEqual);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', handleClear);