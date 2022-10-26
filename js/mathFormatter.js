const operations = ["+", "-", "*", "/", "^"];
const openingBrackets = ["("];
const closingBrackets = [")"];

function getTree(expression) {
    let tree = [""]
    let actualDepthIndex = 0;
    let lastCharIsBracket = false;

    for (let charIndex = 0; charIndex < expression.length; charIndex++) {
        let isOperationSymbol = operations.indexOf(expression[charIndex]) !== -1;
        let isOpeningBracket = openingBrackets.indexOf(expression[charIndex]) !== -1;
        let isClosingBracket = closingBrackets.indexOf(expression[charIndex]) !== -1;

        if (isOperationSymbol) {
            append(tree, expression[charIndex], lastCharIsBracket)
            lastCharIsBracket = false;
        } else if (isOpeningBracket) {
            if (operations.indexOf(expression[charIndex - 1]) === -1) {
                append(tree, "*");
            }
            append(tree, [expression[charIndex]], lastCharIsBracket)
            lastCharIsBracket = false;
        } else if (isClosingBracket) {
            append(tree, expression[charIndex], lastCharIsBracket)
            lastCharIsBracket = true;
        } else {
            if (operations.indexOf(expression[charIndex - 1]) !== -1) {
                append(tree, "");
            }
            appendInLast(tree, expression[charIndex])
            lastCharIsBracket = false;
        }
    }

    return tree;
}

function appendInLast(array, value) {
    let actualArray = array;
    while (Array.isArray(actualArray[actualArray.length - 1])) {
        actualArray = actualArray[actualArray.length - 1];
    }
    actualArray[actualArray.length - 1] += value;
}

function append(array, value, back = false) {
    let actualArray = array;
    while (back ? Array.isArray(actualArray[actualArray.length - 1][actualArray[actualArray.length - 1].length - 1]) : Array.isArray(actualArray[actualArray.length - 1])) {
        actualArray = actualArray[actualArray.length - 1];
    }
    actualArray.push(value);
}