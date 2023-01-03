import {MathLevel} from "../Function/MathLevel";
import {MathFunction} from "../Function/MathFunction";

export class MathLimit {
    private _x: number;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _result: number | MathLevel;

    get result(): number | MathLevel {
        return this._result;
    }

    set result(value: number | MathLevel) {
        this._result = value;
    }

    constructor(x: number, mathFunction: MathFunction) {
        this._x = x;
        this._result = this.calculateLimit(mathFunction.expression);
    }

    calculateLimit(mathLevel: MathLevel): number | MathLevel {
        const substituted = mathLevel.getMathLevelWithSubstituedVariable("x", this.x);

        return substituted.getAnalysis();
    }

    getLaTeX(): string {
        let resultLaTeX = this.result instanceof MathLevel ? this.result.getLaTeX() : this.result;

        if (resultLaTeX == Infinity) {
            resultLaTeX = "\\infty";
        }
        else if (resultLaTeX == -Infinity) {
            resultLaTeX = "-\\infty";
        }

        const xResult = this.x == Infinity ? "\\infty" : this.x == -Infinity ? "-\\infty" : this.x;

        return "\\displaystyle{\\lim_{x\\to " + xResult + "} f(x) = " + resultLaTeX + "}";
    }

    getDebugString(): string {
        return "Limit -> " +  this.x + ": " + (this.result instanceof MathLevel ? this.result.getDebugString() : this.result);
    }
}