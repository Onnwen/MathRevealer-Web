import {Symbol} from './Symbol.js';

export class MathLevel {
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
        if (Symbol.isOperation(char)) {
            this.level.push(char);
        }
        else if (Symbol.isOpeningBracket(char)) {
            if (!isNaN(this.getLastChar())) {
                this.level.push("*");
            }
            if (this.getLastChar() !== undefined) {
                this.level.push(new MathLevel());
            }
            this.getLastLevel().brackets = char;
        }
        else {
            if (isNaN(char)) {
                if (this.level.length > 0 && Symbol.isOperation(this.getLastChar())) {
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
            this.addError("È necessaria inserire una parentesi '" + Symbol.getRespectiveBracket(closingBracket) + "' perché la parentesi '" + closingBracket + "' non viene mai aperta.");
        }
        else if (!Symbol.bracketsMatch(this.brackets[0], closingBracket)) {
            this.addError("La parentesi di apertura '" + this.brackets[0] + "' non combacia con la parentesi di chiusura '" + closingBracket + "'");
        }
        this.brackets += closingBracket;
    }

    getLastLevel() {
        let actualLevel = this;
        console.log(typeof actualLevel.getLevel()[actualLevel.getLevel().length - 1]);
        while (actualLevel.getLevel()[actualLevel.getLevel().length - 1] !== undefined && typeof actualLevel.getLevel()[actualLevel.getLevel().length - 1] === 'object' && !Symbol.isOperation(actualLevel.getLevel()[actualLevel.getLevel().length - 1]) && isNaN(actualLevel.getLevel()[actualLevel.getLevel().length - 1])) {
            actualLevel = actualLevel.getLevel()[actualLevel.getLevel().length - 1];
        }
        return actualLevel;
    }

    getPenultimateLevel() {
        let actualLevel = this;
        while (actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1] !== undefined && typeof actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1] === 'object' && !Symbol.isOperation(actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1]) && isNaN(actualLevel.getLevel()[actualLevel.getLevel().length - 1][actualLevel.getLevel()[actualLevel.getLevel().length - 1].length - 1])) {
            actualLevel = actualLevel.getLevel()[actualLevel.getLevel().length - 1];
        }
        return actualLevel;
    }

    addError(errorString) {
        this.error !== undefined || this.error === "" ? this.error = errorString : this.error += "\n" + errorString;
    }
}