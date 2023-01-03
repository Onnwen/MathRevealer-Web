import {MathFunction} from "../Function/MathFunction";
import {MathReducer} from "../Calculator/MathReducer";
import {MathPoint} from "../MathGraph/MathPoint";

export class MathIntersections {
    private _y: MathPoint[];

    get y(): MathPoint[] {
        return this._y;
    }

    set y(value: MathPoint[]) {
        this._y = value;
    }

    private _x: MathPoint[];

    get x(): MathPoint[] {
        return this._x;
    }

    set x(value: MathPoint[]) {
        this._x = value;
    }

    constructor(mathFunction: MathFunction) {
        this._y = this.calculateIntersectionsY(mathFunction);
        this._x = this.calculateIntersectionsX(mathFunction);
    }

    calculateIntersectionsY(mathFunction: MathFunction): MathPoint[] {
        const intersection = mathFunction.expression.getMathLevelWithSubstituedVariable("x", 0);
        const mathPoint = new MathPoint(0, MathReducer.analyse(intersection).getAsNumber());
        return [mathPoint];
    }

    calculateIntersectionsX(mathFunction: MathFunction): MathPoint[] {
        const x = mathFunction.expression.getX();
        if (typeof x === "number") {
            const mathPoint = new MathPoint(x, 0);
            return [mathPoint];
        }
        else {
            if (x) {
                if (x.level.at(0) == "-") {
                    if (x.level.at(3) == "0") {
                        return [];
                    }
                    return [new MathPoint(x.level.at(1) / x.level.at(3) * -1, 0)];
                } else {
                    if (x.level.at(2) == "0") {
                        return [];
                    }
                    return [new MathPoint(x.level.at(0) / x.level.at(2), 0)];
                }
            }
            return [];
        }
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = "\\displaylines{";
        if (this.x.length > 0) {
            LaTeX += "x = " + this.x.map(point => point.getLaTeX()).join(", ") + " \\\\ ";
        }
        if (this.y.length > 0) {
            LaTeX += "y = " + this.y.map(point => point.getLaTeX()).join(", ") + " }";
        }
        return LaTeX;
    }

    getTotalIntersections(): number {
        return this.x.length + this.y.length;
    }

    getTheory(): string {
        return "Le intersezioni con gli assi di una funzione sono i punti in cui la funzione incontra l'asse delle x o l'asse delle y.<br><br>" +
            "Considerando la seguente funzione:" +
            "$$f(x) = x^2 - 2x + 1$$" +
            "Le intersezioni con l'asse delle x sono:" +
            "$$ \\begin{align}" +
            "f(x) = 0 \\\\" +
            "x^2 - 2x + 1 = 0 \\\\" +
            "(x-1)^2 = 0 \\\\" +
            "x = 1" +
            "\\end{align} $$" +
            "Le intersezioni con l'asse delle y sono:" +
            "$$f(0) = 0^2 - 2*0 + 1 = 1$$" +
            "Quindi, le intersezioni con gli assi di questa funzione sono \\( (1,0) \\) e \\( (0,1) \\)."
    }

    getDebugString(): string {
        return "x: " + this.x.map(point => point.getDebugString()).join(", ") + " - y: " + this.y.map(point => point.getDebugString()).join(", ");
    }
}