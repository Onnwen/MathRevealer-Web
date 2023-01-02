import {MathFunction} from "../Function/MathFunction";
import {MathDomain} from "../Domain/MathDomain";
import {MathInterval} from "./MathInterval";
import {MathLevel} from "../Function/MathLevel";
import {MathFraction} from "../Calculator/MathFraction";

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
        let xValue = mathFunction.expression.getX();

        if (xValue instanceof MathLevel) {
            xValue = MathFraction.getNumberFromFraction(xValue.getDebugString());
        }

        if (xValue) {
            const yValue = mathFunction.expression.getY(xValue);
            console.log("function: " + mathFunction.expression.getDebugString() + " x: " + xValue + " - y: " + yValue);

            if (yValue >= 0) {
                this.positivityInterval.addInterval(xValue, "Infinity");
                this.negativityInterval = this.positivityInterval.getInvertedInterval();
            } else {
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

    getTheory(): string {
        return "Il segno di una funzione indica in quale parte del piano cartesiano la funzione si trova rispetto all'asse delle y.<br><br>" +
            "Una funzione ha segno positivo in un intervallo di valori della x se in quell'intervallo la funzione assume valori positivi. Una funzione ha invece segno negativo in un intervallo di valori della x in cui l'intervallo valori negativi. Infine, una funzione ha segno zero in un intervallo di valori della variabile indipendente se in quell'intervallo la funzione assume solo il valore zero.<br><br>" +
            "Ecco un esempio di come si può determinare il segno di una funzione:" +
            "$$ f(x) = x^2 - 4x + 3 $$" +
            "Per \\( x < -1 \\), \\( f(x) < 0 \\) quindi il segno di \\( f(x) \\) è negativo.<br>" +
            "Per \\( -1 < x < 1 \\), \\( f(x) > 0 \\) quindi il segno di \\( f(x) \\) è positivo.<br>" +
            "Per \\( x > 1 \\), \\( f(x) < 0 \\) quindi il segno di \\( f(x) \\) è negativo.<br><br>" +
            "Sono quindi stati ricavati gli insiemi di positività e di negatività della funzione:" +
            "$$ I.P. = [-1,1]$$" +
            "$$ I.N. = [-\\infty,-1] \\cup [1,\\infty]$$";
    }

    getDebugString(): string {
        return "I.P.: " + this.positivityInterval.getDebugString() + " - " + "I.N.: " + this.negativityInterval.getDebugString();
    }
}