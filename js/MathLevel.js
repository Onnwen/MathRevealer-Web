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
            if (isNaN(char)) {
                if (this.level.length > 0 && operations.indexOf(this.getLastChar()) === -1) {
                    this.level.push("*");
                }
                this.level.push(char);
            }
            else {
                this.level.length < 1 || isNaN(this.level[this.level.length-1]) ? this.level.push(char) : this.level[this.level.length-1] += char;
            }
        }
    }

    closeBrackets(closingBracket) {
        if (this.brackets === "" || this.brackets === undefined) {
            this.addError("È presente una parentesi '" + closingBrackets + "' che non viene mai aperta.");
        }
        else if (openingBrackets.indexOf(closingBracket) !== closingBrackets.indexOf(openingBrackets[closingBracket.indexOf(closingBracket)])) {
            this.addError("La parentesi di apertura '" + this.brackets[0] + "' non combacia con quella di chiusura '" + stringExpression[charIndex] + "'");
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
        this.error !== undefined || this.error === "" ? this.error = errorString : this.error += "\n" + errorString;
    }
}

module.exports = MathLevel;