import {MathFunction} from "../Function/MathFunction";
import {MathLevel} from "../Function/MathLevel";
import {MathExistenceCondition} from "../Domain/MathExistenceCondition";
import {MathReducer} from "./MathReducer";

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
                    // if (true) {
                        if (Number.isInteger(firstValue / secondValue)) {
                            return firstValue / secondValue;
                        }
                        return new MathFunction(String(firstValue) + String(operator) + String(secondValue)).expression;
                    // } else {
                    //     return firstValue / secondValue;
                    // }
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

    static getXValue(expression: string | MathFunction | MathLevel | MathExistenceCondition): number | MathLevel | undefined {
        let mathLevelExpression: MathLevel;

        if (typeof expression === "string") {
            mathLevelExpression = new MathFunction(expression).expression;
        }
        else if (expression instanceof MathFunction) {
            mathLevelExpression = expression.expression;
        }
        else if (expression instanceof MathLevel) {
            mathLevelExpression = expression;
        }
        else {
            mathLevelExpression = new MathFunction(expression.value).expression;
        }

        mathLevelExpression = MathReducer.analyse(mathLevelExpression);
        const hierarchyGroups = mathLevelExpression.getHierarchyGroups();

        return this.solveBasicOperation(hierarchyGroups[1].level[0], "/", hierarchyGroups[0].level[0]);
    }

    static getValue(expression: string | MathFunction | MathLevel | MathExistenceCondition, value: number) {
        // To-Do: Risolvere equazione dato un numero da sostiuire a x.
    }

    static solveEquation(variableValue: string | number, numericValue: string | number) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }

    static solveDisequation(variableValue: string | number, numericValue: string | number) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }
}