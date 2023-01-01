import {MathFunction} from "../Function/MathFunction";
import {MathPoint} from "./MathPoint";

export class MathGraph {
    points: MathPoint[];

    constructor(mathFunction: MathFunction) {
        this.points = [];
    }

    generateGraph(): void {

    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        return "";
    }
}