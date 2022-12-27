import {Symbol} from '../../Other/Symbol';
import {MathExistenceCondition} from "../Domain/MathExistenceCondition";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";
import {MathReducer} from "../Calculator/MathReducer";
import {MathSolver} from "../Calculator/MathSolver";

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
        if (this._haveVariable) {
            return true;
        }
        else {
            this.level.forEach(value => {
                if (value instanceof MathLevel) {
                    if (value.haveVariable) {
                        this._haveVariable = value.haveVariable;
                    }
                }
            })
            return this._haveVariable;
        }
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
        return <string>this.level.at(-1);
    }

    safelyGetNumberAt(index: number): number | undefined {
        if (index < 0 || index >= this.getLevelLength()) {
            return undefined;
        }
        if (Symbol.isNumber(this.level[index]) && (!Symbol.isPriorityOperation(this.level[index+1]) && !Symbol.isPriorityOperation(this.level[index-1]) || !Symbol.isVariable(this.level[index+1]) && !Symbol.isVariable(this.level[index-1]))) {
            return this.level[index];
        }
        return undefined;
    }

    getLaTeX(): string {
        return LaTeXFormatter.parseMathLevel(this);
    }

    getExistenceConditions(): MathExistenceCondition[] {
        let existenceConditions: MathExistenceCondition[] = []
        this.level.forEach((value, index) => {
            if (value instanceof MathLevel) {
                Array.prototype.push.apply(existenceConditions, value.getExistenceConditions());
            }
            else if (!Symbol.isExistenceGuaranteedByOperation(value)) {
                switch (value) {
                    case "/":
                        existenceConditions.push(new MathExistenceCondition(this.level[index+1], "!=", "0"));
                        break;
                    case "#":
                        existenceConditions.push(new MathExistenceCondition(this.level[index+1], ">=", "0"));
                        break;
                }
            }
        })
        return existenceConditions;
    }

    addChar(char: string): void {
        if (Symbol.isOperation(char)) {
            this.level.push(char);
        }
        else {
            if (Symbol.isVariable(char)) {
                this.haveVariable = true;
                if (this.getLevelLength() > 0 && !Symbol.isOperation(this.getLastChar())) {
                    this.level.push("*");
                }
                this.level.push(char);
            }
            else if (Symbol.isDecimalSeparator(char)) {
                this.level[this.getLevelLength() - 1] += ",";
            }
            else if (isNaN(Number(char))) {
                let invalidCharLevel = new MathLevel();
                invalidCharLevel.level.push(char);
                invalidCharLevel.addError("Il carattere '" + char + "' non è riconosciuto.");
                this.level.push(invalidCharLevel);
            }
            else {
                this.getLevelLength() < 1 || !Symbol.isNumber(this.level[this.getLevelLength()-1]) ? this.level.push(char) : this.level[this.getLevelLength() - 1] += char;
                if (Symbol.isInvalidNumber(this.level.at(-1))) {
                    let invalidNumberLevel = new MathLevel();
                    invalidNumberLevel.level.push(this.level.at(-1));
                    invalidNumberLevel.addError("Il valore '" + this.level.at(-1) + "' presenta errori.");
                    this.level.pop();
                    this.level.push(invalidNumberLevel);
                }
            }
        }
    }

    closeBrackets(closingBracket: string): void {
        if (this.brackets === "" || this.brackets === undefined) {
            this.addError("È necessaria inserire una parentesi '" + Symbol.getRespectiveBracket(closingBracket) + "' perché la parentesi '" + closingBracket + "' non viene mai aperta.");
        }
        else if (!Symbol.bracketsMatch(this.brackets[0], closingBracket)) {
            this.addError("La parentesi di apertura '" + this.brackets[0] + "' non combacia con la parentesi di chiusura '" + closingBracket + "'");
        }
        this.brackets += closingBracket;
    }

    addError(errorString: string): void {
        if (this.error !== undefined || this.error === "") {
            this.error = errorString;
        } else {
            this.error = this.error + "\n" + errorString;
        }
    }

    printDebug(showSeparator: boolean = false): void {
        console.log(this.getDebugString(showSeparator));
    }

    getDebugString(showSeparator: boolean = false): string {
        let string = "";
        this.level.forEach(value => {
            if (value instanceof MathLevel) {
                string += value.brackets.at(0);
                if (showSeparator && value.brackets.at(0) !== undefined) {
                    string += "|";
                }
                string += value.getDebugString(showSeparator);
                string += value.brackets.at(-1);
            }
            else {
                string += value;
            }
            string += showSeparator ? "|" : "";
        });
        return string;
    }

    getLevelLength(): number {
        return this.level.length;
    }

    getHierarchyGroups(): MathLevel[] {
        let variablesMathLevel = new MathLevel();
        let numericalValuesMathLevel = new MathLevel();

        for(let i = 0; i < this.getLevelLength(); i++) {
            if ((i === 0 && Symbol.isVariable(this.level[i + 2])) || Symbol.isVariable(this.level[i + 3])) {
                if (i === 0 && this.level[i] === "-") {
                    variablesMathLevel.level.push(this.level[i + 1] * -1);
                }
                else {
                    variablesMathLevel.level.push(this.level[i]);
                    variablesMathLevel.level.push(this.level[i + 1]);
                }
                variablesMathLevel.level.push(this.level[i + 2]);
                if (!(i === 0 && Symbol.isVariable(this.level[i + 2]))) {
                    variablesMathLevel.level.push(this.level[i + 3]);
                }
                i+=3;
            } else {
                if (i === 0 && this.level[i-1] !== "-") {
                    numericalValuesMathLevel.level.push("+");
                }
                numericalValuesMathLevel.level.push(this.level[i]);
            }
        }

        return [variablesMathLevel.getClearedLevel(), numericalValuesMathLevel.getClearedLevel()];
    }

    getClearedLevel(): MathLevel {
        return MathReducer.clear(this);
    }

    getX() {
        return MathSolver.getXValue(this);
    }
}