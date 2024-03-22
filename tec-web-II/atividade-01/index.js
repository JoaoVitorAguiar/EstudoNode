const { add, divide, logarithm, multiply, power, sine, squareRoot, subtract } = require('./calculator');

const num1 = process.argv[2];
const operation = process.argv[3];
const num2 = process.argv[4];

function callFunction(num1, operation, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operation) {
        case add.name:
            return add(num1, num2);
        case subtract.name:
            return subtract(num1, num2);
        case multiply.name:
            return multiply(num1, num2);
        case divide.name:
            return divide(num1, num2);
        case power.name:
            return power(num1, num2);
        case squareRoot.name:
            return squareRoot(num1);
        case logarithm.name:
            return logarithm(num1);
        case sine.name:
            return sine(num1);
        default:
            return 'Operação não suportada.';
    }
}

console.log(`Result: ${callFunction(num1, operation, num2)}`);
