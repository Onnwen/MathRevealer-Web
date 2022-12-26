import {Symbol} from '../../Other/Symbol';
import {MathExistenceCondition} from "../Domain/MathExistenceCondition";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";

export class MathLevel {
    private _level: any[];

    get level(): any[] {
        return this._level;
    }

    set level(value: any[]) {
        this._level = value;
    }

    private _brackets: string;

    get brackets(): string {
        return this._brackets;
    }

    set brackets(value: string) {
        this._brackets = value;
    }

    private _error: string;

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }

    private _haveVariable: boolean;

    get haveVariable(): boolean {
        return this._haveVariable;
    }

    set haveVariable(value: boolean) {
        this._haveVariable = value;
    }

    constructor() {
        this._level = [];
        this._brackets = "";
        this._error = "";
        this._haveVariable = false;
    }


    getLastChar(): string {
        return <string>this._level[this._level.length - 1];
    }

    safelyGetNumberAt(index: number): number | undefined {
        if (index < 0 || index >= this._level.length) {
            return undefined;
        }
        if (Symbol.isNumber(this._level[index]) && (!Symbol.isPriorityOperation(this._level[index+1]) && !Symbol.isPriorityOperation(this._level[index-1]) || !Symbol.isVariable(this._level[index+1]) && !Symbol.isVariable(this._level[index-1]))) {
            return this._level[index];
        }
        return undefined;
    }

    getLaTeX(): string {
        return LaTeXFormatter.parseMathLevel(this);
    }

    getExistenceConditions(): MathExistenceCondition[] {
        let existenceConditions: MathExistenceCondition[] = []
        this._level.forEach((value, index) => {
            if (value instanceof MathLevel) {
                Array.prototype.push.apply(existenceConditions, value.getExistenceConditions());
            }
            else if (!Symbol.isExistenceGuaranteedByOperation(value)) {
                switch (value) {
                    case "/":
                        existenceConditions.push(new MathExistenceCondition(this._level[index+1], "!=", "0"));
                        break;
                    case "#":
                        existenceConditions.push(new MathExistenceCondition(this._level[index+1], ">=", "0"));
                        break;
                }
            }
        })
        return existenceConditions;
    }

    addChar(char: string): void {
        if (Symbol.isOperation(char)) {
            this._level.push(char);
        }
        else {
            if (Symbol.isVariable(char)) {
                this._haveVariable = true;
                if (this._level.length > 0 && !Symbol.isOperation(this.getLastChar())) {
                    this._level.push("*");
                }
                this._level.push(char);
            }
            else if (Symbol.isDecimalSeparator(char)) {
                this._level[this._level.length-1] += ",";
            }
            else if (isNaN(Number(char))) {
                let invalidCharLevel = new MathLevel();
                invalidCharLevel.level.push(char);
                invalidCharLevel.addError("Il carattere '" + char + "' non è riconosciuto.");
                this._level.push(invalidCharLevel);
            }
            else {
                this._level.length < 1 || !Symbol.isNumber(this._level[this._level.length-1]) ? this._level.push(char) : this._level[this._level.length-1] += char;
                if (Symbol.isInvalidNumber(this._level[this._level.length-1])) {
                    let invalidNumberLevel = new MathLevel();
                    invalidNumberLevel.level.push(this._level[this._level.length-1]);
                    invalidNumberLevel.addError("Il valore '" + this._level[this._level.length-1] + "' presenta errori.");
                    this._level.pop();
                    this._level.push(invalidNumberLevel);
                }
            }
        }
    }

    closeBrackets(closingBracket: string): void {
        if (this._brackets === "" || this._brackets === undefined) {
            this.addError("È necessaria inserire una parentesi '" + Symbol.getRespectiveBracket(closingBracket) + "' perché la parentesi '" + closingBracket + "' non viene mai aperta.");
        }
        else if (!Symbol.bracketsMatch(this._brackets[0], closingBracket)) {
            this.addError("La parentesi di apertura '" + this._brackets[0] + "' non combacia con la parentesi di chiusura '" + closingBracket + "'");
        }
        this._brackets += closingBracket;
    }

    addError(errorString: string): void {
        if (this._error !== undefined || this._error === "") {
            this._error = errorString;
        } else {
            this._error = this._error + "\n" + errorString;
        }
    }

    checkIfHaveVariable(): boolean {
        if (this._haveVariable) {
            return true;
        }
        this._level.forEach(element => {
            if (typeof element === 'object') {
                if (element.checkIfHaveVariable()) {
                    return true;
                }
            }
        })
        return false;
    }

    printDebug(): void {
        let string = "";
        this._level.forEach(value => {
            if (typeof value === 'object') {
                string += value.toString();
            }
            else {
                string += value;
            }
            // string += "|";
        });
        console.log(string);
    }

    getDebugString(): string {
        let string = "";
        this._level.forEach(value => {
            if (typeof value === 'object') {
                string += value.toString();
            }
            else {
                string += value;
            }
            // string += "|";
        });
        return string;
    }

    getLevelLength(): number {
        return this._level.length;
    }
}