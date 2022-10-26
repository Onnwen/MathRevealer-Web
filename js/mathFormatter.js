const operations = ["+", "-", "*", "/", "^"];
const openingBrackets = ["(", "{", "["];
const closingBrackets = [")", "}", "]"];

class MathExpression {
    constructor(expression) {
        this.expression = new MathFormatter(expression).getResult();
    }

    getHtml() {
        return new HtmlFormatter(this.expression).getResult();
    }
}

class MathFormatter {
    constructor(expression) {
        let tree = [""]
        let lastCharIsBracket = false;

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            let isOperationSymbol = operations.indexOf(expression[charIndex]) !== -1;
            let isOpeningBracket = openingBrackets.indexOf(expression[charIndex]) !== -1;
            let isClosingBracket = closingBrackets.indexOf(expression[charIndex]) !== -1;

            if (isOperationSymbol) {
                this.append(tree, expression[charIndex], lastCharIsBracket)
                lastCharIsBracket = false;
            } else if (isOpeningBracket) {
                if (operations.indexOf(expression[charIndex - 1]) === -1 && charIndex > 0 && openingBrackets.indexOf(expression[charIndex - 1]) === -1) {
                    console.log(openingBrackets.indexOf(expression[charIndex - 1]))
                    this.append(tree, "*");
                }
                this.append(tree, [expression[charIndex]], lastCharIsBracket)
                this.append(tree, "");
                lastCharIsBracket = false;
            } else if (isClosingBracket) {
                this.append(tree, expression[charIndex], lastCharIsBracket)
                lastCharIsBracket = true;
            } else {
                if (operations.indexOf(expression[charIndex - 1]) !== -1) {
                    this.append(tree, "");
                }
                this.appendInLast(tree, expression[charIndex])
                lastCharIsBracket = false;
            }
        }

        this.tree=tree;
    }

    getResult() {
        return this.tree
    }

    appendInLast(array, value) {
        let actualArray = array;
        while (Array.isArray(actualArray[actualArray.length - 1])) {
            actualArray = actualArray[actualArray.length - 1];
        }
        actualArray[actualArray.length - 1] += value;
    }

    append(array, value, back = false) {
        let actualArray = array;
        while (back ? Array.isArray(actualArray[actualArray.length - 1][actualArray[actualArray.length - 1].length - 1]) : Array.isArray(actualArray[actualArray.length - 1])) {
            actualArray = actualArray[actualArray.length - 1];
        }
        actualArray.push(value);
    }
}