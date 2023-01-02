import {MathFunction} from "../Function/MathFunction";
import {MathLevel} from "../Function/MathLevel";
import {MathExistenceCondition} from "../Domain/MathExistenceCondition";
import {MathReducer} from "./MathReducer";
import {MathFraction} from "./MathFraction";

export class MathSolver {
    static solveBasicOperation(firstValue: string | number | undefined, operator: string, secondValue: string | number | undefined): number | undefined | MathLevel {
        if (firstValue === undefined || secondValue === undefined) {
            return undefined;
        }

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
                    if (Number.isInteger(firstValue / secondValue)) {
                        return firstValue / secondValue;
                    }

                    const fraction = MathFraction.reduceFraction(firstValue, secondValue);
                    if (fraction.denominator > 0 && fraction.numerator > 0) {
                        return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
                    }
                    else if (fraction.denominator > 0) {
                        return new MathFunction("-" + fraction.numerator * -1 + "/" + fraction.denominator).expression;
                    }
                    else if (fraction.numerator > 0) {
                        return new MathFunction("-" + fraction.numerator + "/" + fraction.denominator * -1).expression;
                    }
                    else {
                        return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
                    }
                case "^":
                    return firstValue ** secondValue;
                case "#":
                    return Math.sqrt(secondValue);
            }
        } catch (error) {
            return undefined;
        }
    }

    static getXValue(expression: string | MathFunction | MathLevel | MathExistenceCondition): number | MathLevel | undefined {
        let mathLevelExpression: MathLevel;

        if (typeof expression === "string") {
            mathLevelExpression = new MathFunction(expression).expression;
        } else if (expression instanceof MathFunction) {
            mathLevelExpression = expression.expression;
        } else if (expression instanceof MathLevel) {
            mathLevelExpression = expression;
        } else {
            mathLevelExpression = new MathFunction(expression.value).expression;
        }

        mathLevelExpression = MathReducer.analyse(mathLevelExpression);
        const hierarchyGroups = mathLevelExpression.getHierarchyGroups();

        return this.solveBasicOperation(hierarchyGroups[1].level[0], "/", hierarchyGroups[0].level[0] * -1);
    }

    static solveEquation(variableValue: string | number, numericValue: string | number) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }

    static solveDisequation(variableValue: string | number, numericValue: string | number) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }
}