let num1 = null;
let num2 = null;
let operator = null;
let displayText = '0';
let currentSelect = 'num';

let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');


buttons.forEach(function (button) {
    button.addEventListener('click', printDisplay);
});


function printDisplay() {
    if (this.classList.contains('num')) {
        if (currentSelect !== 'num' || displayText === '0') {
            if (currentSelect === 'equals' || displayText === 'NO NO NO') {
                num1 = null;
                num2 = null;
                operator = null;
            }
            displayText = this.textContent;
        } else {
            if (displayText.length < 8) {
                console.log("TEST");
                displayText += this.textContent;
            }
        }
        display.textContent = displayText;
        currentSelect = 'num';
    } else if (this.classList.contains('operator')) {
        if (currentSelect === 'operator' || currentSelect === 'equals') {
            operator = this.textContent;
        } else {
            if (num1 === null) {
                num1 = parseFloat(displayText);
                // console.log('Num1: ' + num1);
                operator = this.textContent;
            } else {
                num2 = parseFloat(displayText);
                // console.log('Num2: ' + num2);
                displayText = operate(num1, num2, operator);
                display.textContent = displayText;
                num1 = displayText;
                operator = this.textContent;
                num2 = null;
            }
        }
        currentSelect = 'operator';
    } else if (this.classList.contains('equals')) {
        if (num1 !== null && operator) {
            num2 = parseFloat(displayText);
            // console.log('Num2: ' + num2);
            displayText = operate(num1, num2, operator);
            display.textContent = displayText;
            num1 = parseFloat(displayText);
            // console.log('Num1: ' + num1);
            operator = null;
            num2 = null;
            currentSelect = 'equals';
        }
    } else if (this.classList.contains('clear')) {
        displayText = '0';
        display.textContent = displayText;
        num1 = null;
        num2 = null;
        operator = null;
        currentSelect = 'clear';
        buttons.forEach(function (button) {
            button.addEventListener('click', printDisplay);
        });
    } else if (this.classList.contains('dot')) {
        if (displayText.indexOf('.') === -1) {
            displayText += this.textContent;
            display.textContent = displayText;
        }
    }
    console.log('Current Select: ' + currentSelect);
}

const add = (a, b) => {
    let value = a + b;
    if (value > 99999999) {
        value = value.toExponential(2);
        console.log('Value: ' + value);
    }
    return value;
};

const subtract = (a, b) => {
    let value = a - b;
    if (value > 99999999) {
        value = value.toExponential(2);
        console.log('Value: ' + value);
    }
    return value;
}

const multiply = (a, b) => {
    let value = a * b;
    if (value > 99999999) {
        value = value.toExponential(2);
        console.log('Value: ' + value);
    }

    if (value % 1 !== 0) {
        value = Math.round(value * 100) / 100;
    }

    return value;
}

const divide = (a, b) => {
    let value = a / b;
    if (value > 99999999) {
        value = value.toExponential(2);
        console.log('Value: ' + value);
    }
    if (value % 1 !== 0) {
        value = Math.round(value * 100) / 100;
    }

    return value;
}

function operate(num1, num2, operator) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        if (num2 === 0) {
            return 'NO NO NO'
        }
        return divide(num1, num2);
    }
}
