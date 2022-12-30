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
            return [];
        }
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = "\\displaylines{";
        LaTeX += "x = " + this.x.map(point => "(0; " + point.x + ")").join(", ") + " \\\\ ";
        LaTeX += "y = " + this.y.map(point => "(" + point.y + "; 0)").join(", ") + " }";
        return LaTeX;
    }

    getTotalIntersections(): number {
        return this.x.length + this.y.length;
    }
}