import {MathFunction} from "../Function/MathFunction";

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
    }

    checkParity(): void {
        const randomXValue = Math.floor(Math.random() * 100) + 2;


    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = ""
        return LaTeX;
    }
}