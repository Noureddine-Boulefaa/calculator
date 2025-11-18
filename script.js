// =========================
// Global state variables
// =========================
let firstOperand = null;
let secondOperand = null;
let operator = null;
let currentDisplayValue = "";

// DOM elements
const screen = document.querySelector(".screen");
const digits = document.querySelectorAll(".digit");
const ops = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

// =========================
// Basic math functions
// =========================
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    return b === 0 ? "Error" : a / b;
}

// Main operate function: executes the correct operation
function operate(operator, a, b) {
    switch(operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

// =========================
// Update screen and auto resize text
// =========================
function updateDisplay(value) {
    screen.textContent = value;
    autoResizeFont();
}

// Automatically shrink text if it overflows
function autoResizeFont() {
    const maxFont = 48;
    const minFont = 14;

    // Start with maximum font size
    let fontSize = maxFont;
    screen.style.fontSize = fontSize + "px";

    // Reduce font size until the text fits inside the screen
    while (screen.scrollWidth > screen.clientWidth && fontSize > minFont) {
        fontSize -= 1;
        screen.style.fontSize = fontSize + "px";
    }
}

// =========================
// Handle number button clicks
// =========================
digits.forEach(btn => {
    btn.addEventListener("click", () => appendDigit(btn.dataset.value));
});

// Append a digit to the current display value
function appendDigit(value) {
    // Limit input to 5 digits maximum
    if (currentDisplayValue.length >= 5) return;

    currentDisplayValue += value;
    updateDisplay(currentDisplayValue);
}


// =========================
// Handle operator button clicks
// =========================
ops.forEach(btn => {
    btn.addEventListener("click", () => chooseOperator(btn.dataset.value));
});

// Save first operand and selected operator
function chooseOperator(op) {
    firstOperand = Number(currentDisplayValue);

    // Convert symbols (× and ÷) to JS operators (* and /)
    if (op === "×") operator = "*";
    else if (op === "÷") operator = "/";
    else operator = op;

    // Prepare for next number input
    currentDisplayValue = "";
    updateDisplay("");
}

// =========================
// Handle "=" button (calculate result)
// =========================
equalBtn.addEventListener("click", evaluate);

function evaluate() {
    // Prevent evaluation if data is missing
    if (firstOperand === null || operator === null || currentDisplayValue === "") return;

    secondOperand = Number(currentDisplayValue);
    const result = operate(operator, firstOperand, secondOperand);

    updateDisplay(result);

    // Prepare for next calculation
    currentDisplayValue = result.toString();
    firstOperand = null;
    operator = null;
}

// =========================
// Handle "Clear" button
// =========================
clearBtn.addEventListener("click", clearAll);

// Reset calculator state
function clearAll() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    currentDisplayValue = "";
    updateDisplay("");
}

// =========================
// Keyboard support
// =========================
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Numbers (0–9)
    if (!isNaN(key)) {
        appendDigit(key);
        return;
    }

    // Basic operators (+, -, *, /)
    if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
        return;
    }

    // Enter or "=" triggers evaluation
    if (key === "Enter" || key === "=") {
        evaluate();
        return;
    }

    // Backspace deletes the last digit
    if (key === "Backspace") {
        currentDisplayValue = currentDisplayValue.slice(0, -1);
        updateDisplay(currentDisplayValue);
        return;
    }

    // Escape or "c" clears the calculator
    if (key === "Escape" || key.toLowerCase() === "c") {
        clearAll();
        return;
    }
});
