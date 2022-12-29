import {MathFunction} from "../Function/MathFunction";
import {MathLevel} from "../Function/MathLevel";
import {MathReducer} from "../Calculator/MathReducer";

export class MathParity {
    private _isEven: boolean;

    get isEven(): boolean {
        return this._isEven;
    }

    set isEven(value: boolean) {
        this._isEven = value;
    }

    private _isOdd: boolean;

    get isOdd(): boolean {
        return this._isOdd;
    }

    set isOdd(value: boolean) {
        this._isOdd = value;
    }

    constructor(mathFunction: MathFunction) {
        this._isEven = false;
        this._isOdd = false;

        this.checkParity(mathFunction.expression);
    }

    checkParity(mathLevel: MathLevel): void {
        const randomXValue = Math.floor(Math.random() * 100) + 2;
        const expression = mathLevel.getMathLevelWithSubstituedVariable("x", randomXValue);
        const oppositeExpression = mathLevel.getMathLevelWithSubstituedVariable("x", randomXValue * -1);
        if (expression.getAsNumber() === oppositeExpression.getAsNumber()) {
            this._isEven = true;
        }
        else if (oppositeExpression.getAsNumber() === expression.getAsNumber() * -1) {
            this._isOdd = true;
        }
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = ""
        LaTeX += "f(x)" + this.isEven ? "=" : "\\neq" + "f(-x)";
        LaTeX += "\\newline";
        LaTeX += "f(-x)" + this.isOdd ? "=" : "\\neq" + "-f(x)";
        return LaTeX;
    }
}