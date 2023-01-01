import {MathFunction} from "../Function/MathFunction";
import {MathLimit} from "./MathLimit";

export class MathLimits {
    limits: MathLimit[];

    constructor(mathFunction: MathFunction) {
        this.limits = [];

        this.calculateLimits(mathFunction);
    }

    calculateLimits(mathFunction: MathFunction): void {

    }
}