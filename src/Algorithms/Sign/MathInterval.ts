export class MathInterval {
    private _interval: [string, string][] ;

    get interval(): [string, string][] {
        return this._interval;
    }

    set interval(value: [string, string][]) {
        this._interval = value;
    }

    constructor() {
        this._interval = [];
    }

    addInterval(firstValue: string | number, secondValue: string | number): void {
        this._interval.push([String(firstValue), String(secondValue)]);
    }

    getInvertedInterval(): MathInterval {
        let invertedInterval = new MathInterval();

        let nextValue = "";
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

            LaTeX += "\\left[" + firstValue + ", " + secondValue + "\\right]";

            if (index != this.interval.length - 1) {
                LaTeX += "\\cup";
            }
        });

        return LaTeX;
    }
}