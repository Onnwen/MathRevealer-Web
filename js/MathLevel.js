const constants = require('./constant.js');
const operations = constants.operations;
const priorityOperations = constants.priorityOperations;
const closingBrackets = constants.closingBrackets;
const openingBrackets = constants.openingBrackets;

class MathLevel {
    constructor() {
        this.level = [];
        this.brackets = "";
        this.error = "";
    }

    getHtml() {
        return new HtmlFormatter(this.expression).getResult();
    }

    getLevel() {
        return this.level;
    }

    getLastChar() {
        return this.level[this.level.length-1];
    }

    addChar(char) {
        if (operations.indexOf(char) !== -1) {
            this.level.push(char);
        }
        else if (openingBrackets.indexOf(char) !== -1) {
            if (!isNaN(this.getLastChar())) {
                this.level.push("*");
            }
            this.level.push(new MathLevel());
            this.getLastLevel().brackets = char;
        }
        else {
            this.level.length < 1 || isNaN(this.level[this.level.length-1]) ? this.level.push(char) : this.level[this.level.length-1] += char;
        }
    }

    closeBrackets(closingBracket) {
        if (this.brackets === "" || this.brackets === undefined) {
            this.error += "È presente una parentesi '" + closingBrackets + "' che non viene mai aperta.\n";
        }
        else if (openingBrackets.indexOf(closingBracket) !== closingBrackets.indexOf(openingBrackets[closingBracket.indexOf(closingBracket)])) {
            this.error += "La parentesi di apertura '" + this.brackets[0] + "' non combacia con quella di chiusura '" + stringExpression[charIndex] + "'.\n";
        }
        this.brackets += closingBracket;
    }

    getLastLevel() {
        let actualLevel = this;
        while (actualLevel.getLevel()[actualLevel.getLevel().length - 1] !== undefined && operations.indexOf(actualLevel.getLevel()[actualLevel.getLevel().length - 1]) === -1 && isNaN(actualLevel.getLevel()[actualLevel.getLevel().length - 1])) {
            actualLevel = actualLevel.getLevel()[actualLevel.getLevel().length - 1];
        }
        return actualLevel;
    }

    getPenultimateLevel() {
        let actualLevel = this;
        while (actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1] !== undefined && operations.indexOf(actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1]) === -1 && isNaN(actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1])) {
            actualLevel = actualLevel[actualLevel.length - 1];
        }
        return actualLevel;
    }

    addError(errorString) {
    }
}

module.exports = MathLevel;