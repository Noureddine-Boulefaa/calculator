
let currentDisplayValue = 0;

const screen = document.querySelector(".screen");
const digits = document.querySelectorAll(".digit");

digits.forEach(button => {
    button.addEventListener('click',() => {
        screen.textContent += button.dataset.value;
    });
});

function add(num1,num2)
{
    return num1 + num2;
}

function subtract(num1,num2)
{
    return num1 - num2;
}

function multiply(num1,num2)
{
    return num1 * num2;
}

function divide(num1,num2)
{
    return num1 / num2;
}

function operate(operator,num1,num2)
{
    switch(operator)
    {
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
       case "*":
            return multiply(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
    }            
    
}