import {MathFunction} from "../Function/MathFunction";
import {MathLevel} from "../Function/MathLevel";
import {MathFraction} from "../Calculator/MathFraction";

export class MathPoint {
    private _x: number;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _y: number;

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    getXAsMathLevel(): MathLevel {
        if (this.x % 1 !== 0) {
            const fraction = MathFraction.getFraction(this.x);
            return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
        }
        return new MathFunction(this.x).expression;
    }

    getYAsMathLevel(): MathLevel {
        if (this.y % 1 !== 0) {
            const fraction = MathFraction.getFraction(this.y);
            return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
        }
        return new MathFunction(this.y).expression;
    }

    getLaTeX(): string {
        return "\\left(" + this.getXAsMathLevel().getLaTeX() + "; " + this.getYAsMathLevel().getLaTeX() + "\\right)";
    }

    getDebugString(): string {
        return "(" + this.getXAsMathLevel().getDebugString() + "; " + this.getYAsMathLevel().getDebugString() + ")";
    }
}