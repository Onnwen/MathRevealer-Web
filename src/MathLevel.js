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

    getBrackets() {
        return this.brackets;
    }

    addChar(char) {
        if (Symbol.isOperation(char)) {
            this.level.push(char);
        }
        else {
            if (Symbol.isVariable(char)) {
                if (this.level.length > 0 && !Symbol.isOperation(this.getLastChar())) {
                    this.level.push("*");
                }
                this.level.push(char);
            }
            else if (isNaN(char)) {
                let invalidCharLevel = new MathLevel();
                invalidCharLevel.getLevel().push(char);
                invalidCharLevel.addError("Il carattere '" + char + "' non è riconosciuto.");
                this.level.push(invalidCharLevel);
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

    addError(errorString) {
        this.error !== undefined || this.error === "" ? this.error = errorString : this.error += "\n" + errorString;
    }
}