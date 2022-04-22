const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let opratorValue = '';
let awaitingNextValue = false;

const sendNUmberValue = (number) => {
    //replace current display value if first value enterr
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false
    } else {
        //if current value = 0, replace, if not -> add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    //if operator pressed, dont add decimal
    if (awaitingNextValue) return;
    //if no decimal, add 1
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// calculate first and second value on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (opratorValue && awaitingNextValue) {
        opratorValue = operator    
        return
    }
    // assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log('currentValue', currentValue)
        const calculation = calculate[opratorValue](firstValue, currentValue)
        calculatorDisplay.textContent =calculation
        firstValue = calculation;   
    }
    // ready for next value, store operator
    awaitingNextValue = true
    opratorValue = operator;
}

// add el for number, operator, decimal
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click',() => sendNUmberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click',() => addDecimal())
    }
});


// reset display, all value
function resetAll() {
    firstValue = 0;
    opratorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event listener
clearBtn.addEventListener('click', resetAll)