import {MathLevel} from "./MathLevel";

export class MathSolver {
    static solveBasicOperation(firstValue: string | number, operator: string, secondValue: string | number): number | undefined | any[] {
        if (typeof firstValue === "string") {
            firstValue = Number.parseFloat(firstValue);
        }
        if (typeof secondValue === "string") {
            secondValue = Number.parseFloat(secondValue);
        }
        try {
            switch (operator) {
                case "+":
                    return firstValue + secondValue;
                case "-":
                    return firstValue - secondValue;
                case "*":
                    return firstValue * secondValue;
                case "/":
                    // if (true) {
                        return firstValue / secondValue;
                    // }
                    // if (Number.isInteger(firstValue / secondValue)) {
                    //     return firstValue / secondValue;
                    // }
                    // return [firstValue, operator, secondValue];
                case "^":
                    return firstValue ** secondValue;
                case "#":
                    return Math.sqrt(secondValue);
            }
        }
        catch (error) {
            return undefined;
        }
    }

    static solveEquation(variableValue: string | number, numericValue: string | number) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }
}