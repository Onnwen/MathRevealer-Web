import {MathFraction} from "../Calculator/MathFraction";
import {MathLevel} from "../Function/MathLevel";

export class MathInterval {
    private _interval: [string | MathLevel, string | MathLevel][] ;

    get interval(): [string | MathLevel, string | MathLevel][] {
        return this._interval;
    }

    set interval(value: [string | MathLevel, string | MathLevel][]) {
        this._interval = value;
    }

    constructor() {
        this._interval = [];
    }

    addInterval(firstValue: string | number | MathLevel, secondValue: string | number | MathLevel): void {
        if (typeof firstValue == "number") {
            firstValue = String(firstValue);
        }
        if (typeof secondValue == "number") {
            secondValue = String(secondValue);
        }
        this._interval.push([firstValue, secondValue]);
    }

    getInvertedInterval(): MathInterval {
        let invertedInterval = new MathInterval();

        let nextValue: string | MathLevel = "";
        this.interval.forEach((interval, index) => {
            if (index == 0 && interval[0] != "-Infinity") {
                invertedInterval.addInterval("-Infinity", interval[0]);
            }
            else if (index == 0) {
                nextValue = interval[1];
            }

            if (index != 0) {
                invertedInterval.addInterval(nextValue, interval[0]);
            }

            if (index == this.interval.length - 1 && interval[1] != "Infinity") {
                invertedInterval.addInterval(interval[1], "Infinity");
            }
            nextValue = interval[1];
        });

        return invertedInterval;
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = ""

        this.interval.forEach((interval, index) => {
            let firstValue = interval[0];
            let secondValue = interval[1];

            if (firstValue instanceof MathLevel) {
                firstValue = firstValue.getLaTeX();
            }

            if (secondValue instanceof MathLevel) {
                secondValue = secondValue.getLaTeX();
            }

            if (firstValue == "-Infinity") {
                firstValue = "-\\infty";
            }
            else if (firstValue == "Infinity") {
                firstValue = "\\infty";
            }

            if (secondValue == "-Infinity") {
                secondValue =  "-\\infty";
            }
            else if (secondValue == "Infinity") {
                secondValue =  "\\infty";
            }

            if (firstValue.indexOf(".") != -1) {
                const fraction = MathFraction.getFraction(Number(firstValue));
                firstValue = fraction.numerator + "/" + fraction.denominator;
            }
            if (secondValue.indexOf(".") != -1) {
                const fraction = MathFraction.getFraction(Number(secondValue));
                secondValue = fraction.numerator + "/" + fraction.denominator;
            }

            LaTeX += "\\left]" + firstValue + ", " + secondValue + "\\right[";

            if (index != this.interval.length - 1) {
                LaTeX += "\\cup";
            }
        });

        return LaTeX;
    }

    getDebugString(): string {
        let debugString = "";

        this.interval.forEach((interval, index) => {
            let firstValue = interval[0];
            let secondValue = interval[1];

            if (interval[0] instanceof MathLevel) {
                firstValue = interval[0].getDebugString();
            }
            if (interval[1] instanceof MathLevel) {
                secondValue = interval[1].getDebugString();
            }

            if (!(firstValue instanceof MathLevel) && firstValue.indexOf(".") != -1) {
                const fraction = MathFraction.getFraction(Number(interval[0]));
                firstValue = fraction.numerator + "/" + fraction.denominator;
            }
            if (!(secondValue instanceof MathLevel) && secondValue.indexOf(".") != -1) {
                const fraction = MathFraction.getFraction(Number(interval[1]));
                secondValue= fraction.numerator + "/" + fraction.denominator;
            }
            debugString += "]" + firstValue + ", " + secondValue + "[";

            if (index != this.interval.length - 1) {
                debugString += " U ";
            }
        });

        return debugString;
    }
}