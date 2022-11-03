const operations = ["+", "-", "*", "/", "^"];
const openingBrackets = ["(", "{", "["];
const closingBrackets = [")", "}", "]"];

class MathExpression {
    constructor() {
        this.firstValue = "";
        this.operator = "";
        this.secondValue = "";
        this.brackets = "";
        this.error = "";
    }

    format(expression) {
        this.expression = new MathFormatter(expression).getResult();
    }

    getHtml() {
        return new HtmlFormatter(this.expression).getResult();
    }
}

class MathLevel {
    constructor() {
        this.level = [];
        this.brackets = "";
        this.error = "";
    }

    getHtml() {
        return new HtmlFormatter(this.expression).getResult();
    }

    append(char) {
        if (operations.indexOf(string[charIndex]) !== -1) {
            this.level.push(char);
        }
        else {
            this.level[this.level.lenght] += char;
        }
    }
}

class MathFormatter {
    constructor(string) {
        this.formatStringTree(string);
    }

    getResult() {
        return this.stringsTree
    }

    formatStringTree(string) {
        let stringsTree = [""]
        let lastCharIsBracket = false;

        for (let charIndex = 0; charIndex < string.length; charIndex++) {
            if (isOperationSymbol) {
                if (lastCharIsBracket) {
                    this.append(stringsTree, [string[charIndex]], lastCharIsBracket);
                }
                else {
                    this.appendInLast(stringsTree, string[charIndex]);
                }
                lastCharIsBracket = false;
            } else if (isOpeningBracket) {
                if (operations.indexOf(string[charIndex - 1]) === -1 && charIndex > 0 && openingBrackets.indexOf(string[charIndex - 1]) === -1) {
                    this.appendInLast(stringsTree, "*");
                }
                this.append(stringsTree, [string[charIndex]], lastCharIsBracket);
                lastCharIsBracket = false;
            } else if (isClosingBracket) {
                this.appendInLast(stringsTree, string[charIndex]);
                lastCharIsBracket = true;
                this.append(stringsTree, "", lastCharIsBracket);
                lastCharIsBracket = false;
            } else {
                this.appendInLast(stringsTree, string[charIndex]);
                lastCharIsBracket = false;
            }
        }

        this.stringsTree=stringsTree;
    }

    formatExpression(stringExpression) {
        let expression = new MathExpression();

        /*
        this.firstValue = 0;
        this.operator = "+";
        this.secondValue = 2;
        - this.brackets = "";
        - this.error = "";
         */

        for (let charIndex = 0; charIndex < stringExpression.length; charIndex++) {
            if (openingBrackets.indexOf(string[charIndex]) !== -1 && charIndex === 0) {
                expression.brackets += stringExpression[0];
            }
            else if (charIndex === stringExpression.length) {
                if (closingBrackets.indexOf(string[charIndex]) !== -1) {
                    if (expression.brackets === "") {
                        expression.error += "È presente una parentesi '" + stringExpression[charIndex] + "' che non viene mai aperta.";
                    }
                    else if (!this.areEqualsBrackets(expression.brackets, stringExpression[charIndex])) {
                        expression.error += "La parentesi di apertura '" + expression.brackets + "' non combacia con quella di chiusura '" + stringExpression[charIndex] + "'.";
                    }
                    expression.brackets += stringExpression[charIndex];
                }
            }
            else if (operations.indexOf(string[charIndex]) !== -1) {
                if (expression.firstValue === "") {

                }
            }
        }
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

    areEqualsBrackets(openingBracket, closingBracket) {
        return openingBrackets.indexOf(firstBracket) === closingBrackets.indexOf(closingBracket)
    }
}

module.exports = MathFormatter;