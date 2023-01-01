import {MathFunction} from "../Function/MathFunction";
import {MathDomain} from "../Domain/MathDomain";
import {MathInterval} from "./MathInterval";

export class MathSign {
    private _positivityInterval: MathInterval;

    get positivityInterval(): MathInterval {
        return this._positivityInterval;
    }

    set positivityInterval(value: MathInterval) {
        this._positivityInterval = value;
    }

    private _negativityInterval: MathInterval;

    get negativityInterval(): MathInterval {
        return this._negativityInterval;
    }

    set negativityInterval(value: MathInterval) {
        this._negativityInterval = value;
    }

    constructor(mathFunction: MathFunction) {
        this._positivityInterval = new MathInterval();
        this._negativityInterval = new MathInterval();

        this.calculateSign(mathFunction);
    }

    calculateSign(mathFunction: MathFunction): void {
        const xValue = mathFunction.expression.getX();
        if (typeof xValue == "number") {
            const yValue = mathFunction.expression.getY(xValue);

            if (yValue > 0) {
                this.positivityInterval.addInterval(xValue, "Infinity");
                this.negativityInterval = this.positivityInterval.getInvertedInterval();
            } else if (yValue < 0) {
                this.negativityInterval.addInterval("-Infinity", xValue);
                this.positivityInterval = this.negativityInterval.getInvertedInterval();
            }
        }
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = "\\displaylines{"
        LaTeX += "I.P. = " + this.positivityInterval.getLaTeX() + " \\\\ ";
        LaTeX += "I.N. = " + this.negativityInterval.getLaTeX() + "}";
        return LaTeX;
    }
}