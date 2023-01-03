import {MathFunction} from "../Function/MathFunction";
import {MathLimit} from "./MathLimit";

export class MathLimits {
    limits: MathLimit[];

    constructor(mathFunction: MathFunction) {
        this.limits = [];

        this.calculateLimits(mathFunction);
    }

    calculateLimits(mathFunction: MathFunction): void {
        this.limits.push(new MathLimit(-Infinity, mathFunction));
        this.limits.push(new MathLimit(Infinity, mathFunction));
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let result = "\\displaylines{";

        this.limits.forEach((limit) => {
            result += limit.getLaTeX() + " \\\\ ";
        });

        result += "}";

        return result;
    }

    getDebugString(): string {
        let result = "";

        this.limits.forEach((limit) => {
            result += limit.getDebugString() + "; ";
        });

        return result;
    }

    getTheory(): string {
        return "I limiti di una funzione indicano il comportamento della funzione quando ci si avvicina a un determinato punto o infinito. In altre parole, il limite di una funzione in un certo punto ci dice qual è il valore che la funzione tende a assumere man mano che ci si avvicina a quel punto.<br><br>" +
            "Supponiamo di avere la funzione seguente:" +
            "$$f(x) = \\frac{x^2 - 4x + 3}{x - 3}$$" +
            "Il limite di questa funzione quando x tende a \\( 3 \\) può essere calcolato come segue:" +
            "$$\\lim_{x \\to 3} f(x) = \\lim_{x \\to 3} \\frac{x^2 - 4x + 3}{x - 3}$$" +
            "Utilizzando il teorema di L'Hopital, possiamo ottenere:" +
            "$$\\lim_{x \\to 3} f(x) = \\lim_{x \\to 3} \\frac{2x - 4}{1} = \\frac{2(3) - 4}{1} = \\frac{2}{1} = 2$$\n" +
            "Quindi, il limite di \\( f(x) \\) quando \\( x \\) tende a \\( 3 \\) è \\( 2 \\)."
    }
}