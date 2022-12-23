import {Symbol} from '../../Other/Symbol.js';
import {MathExistenceCondition} from "../Domain/MathExistenceCondition.js";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter.js";

export class MathLevel {
    constructor() {
        this.level = [];
        this.brackets = "";
        this.error = "";
        this.haveVariable = false;
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

    safelyGetNumberAt(index) {
        if (index < 0 || index >= this.level.length) {
            return undefined;
        }
        if (Symbol.isNumber(this.level[index]) && (!Symbol.isPriorityOperation(this.level[index+1]) && !Symbol.isPriorityOperation(this.level[index-1]) || !Symbol.isVariable(this.level[index+1]) && !Symbol.isVariable(this.level[index-1]))) {
            return this.level[index];
        }
        return undefined;
    }

    getLaTeX() {
        return LaTeXFormatter.parseMathLevel(this);
    }

    getExistenceConditions() {
        let existenceConditions = []
        this.level.forEach((value, index) => {
            if (value.level != null) {
                Array.prototype.push.apply(existenceConditions, value.getExistenceConditions());
            }
            else if (!Symbol.isExistenceGuaranteedByOperation(value)) {
                switch (value) {
                    case "/":
                        existenceConditions.push(new MathExistenceCondition(this.level[index+1], "!=", 0));
                        break;
                    case "#":
                        existenceConditions.push(new MathExistenceCondition(this.level[index+1], ">=", 0));
                        break;
                }
            }
        })
        return existenceConditions;
    }

    addChar(char) {
        if (Symbol.isOperation(char)) {
            this.level.push(char);
        }
        else {
            if (Symbol.isVariable(char)) {
                this.haveVariable = true;
                if (this.level.length > 0 && !Symbol.isOperation(this.getLastChar())) {
                    this.level.push("*");
                }
                this.level.push(char);
            }
            else if (Symbol.isDecimalSeparator(char)) {
                this.level[this.level.length-1] += ",";
            }
            else if (isNaN(char)) {
                let invalidCharLevel = new MathLevel();
                invalidCharLevel.getLevel().push(char);
                invalidCharLevel.addError("Il carattere '" + char + "' non è riconosciuto.");
                this.level.push(invalidCharLevel);
            }
            else {
                this.level.length < 1 || !Symbol.isNumber(this.level[this.level.length-1]) ? this.level.push(char) : this.level[this.level.length-1] += char;
                if (Symbol.isInvalidNumber(this.level[this.level.length-1])) {
                    let invalidNumberLevel = new MathLevel();
                    invalidNumberLevel.getLevel().push(this.level[this.level.length-1]);
                    invalidNumberLevel.addError("Il valore '" + this.level[this.level.length-1] + "' presenta errori.");
                    this.level.pop();
                    this.level.push(invalidNumberLevel);
                }
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

    checkIfHaveVariable() {
        if (this.haveVariable) {
            return true;
        }
        this.level.forEach(element => {
            if (typeof element === 'object') {
                if (element.checkIfHaveVariable()) {
                    return true;
                }
            }
        })
        return false;
    }

    toString() {
        let string = "";
        this.level.forEach(value => {
            if (typeof value === 'object') {
                string += value.toString();
            }
            else {
                string += value;
            }
        });
    }
}