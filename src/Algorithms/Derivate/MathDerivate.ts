import {MathFunction} from "../Function/MathFunction";

export class MathDerivate {
    derivate: MathDerivate | undefined;

    constructor(mathFunction: MathFunction) {
        this.derivate = undefined;

        this.calculateDerivate(mathFunction);
    }

    calculateDerivate(mathFunction: MathFunction): void {

    }
}