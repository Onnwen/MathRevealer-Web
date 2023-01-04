import {MathFunction} from "../Function/MathFunction";
import {MathLevel} from "../Function/MathLevel";
import {MathExistenceCondition} from "../Domain/MathExistenceCondition";
import {MathReducer} from "./MathReducer";
import {MathFraction} from "./MathFraction";
import {Symbol} from "../../Other/Symbol";

export class MathSolver {
    static solveBasicOperation(firstValue: string | number | undefined | MathLevel, operator: string, secondValue: string | number | undefined | MathLevel): number | undefined | MathLevel {
        if (firstValue === undefined || secondValue === undefined) {
            return undefined;
        }

        if (typeof firstValue === "string") {
            firstValue = Number.parseFloat(firstValue);
        }
        if (typeof secondValue === "string") {
            secondValue = Number.parseFloat(secondValue);
        }

        if (firstValue instanceof MathLevel) {
            firstValue = firstValue.tryToGetAsNumber();
        }
        if (secondValue instanceof MathLevel) {
            secondValue = secondValue.tryToGetAsNumber();
        }

        if (firstValue instanceof MathLevel || secondValue instanceof MathLevel) {
            return this.solveComplexOperation(firstValue, operator, secondValue);
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

    static solveComplexOperation(firstValue: MathLevel | number, operator: string, secondValue: MathLevel | number): number | MathLevel | undefined {
        // To-Do: Da compleare.
        return undefined;
        // if (firstValue instanceof MathLevel && secondValue instanceof MathLevel) {
        //     try {
        //         switch (operator) {
        //             case "+":
        //                 if (!firstValue.containPriorityOperations() !== !secondValue.containPriorityOperations()) {
        //                     return new MathFunction(firstValue.getDebugString() + "+" + secondValue.getDebugString()).expression.getAnalysis();
        //                 }
        //                 else {
        //                     return undefined;
        //                 }
        //             case "-":
        //                 if (!firstValue.containPriorityOperations() !== !secondValue.containPriorityOperations()) {
        //                     return new MathFunction(firstValue.getDebugString() + "-" + secondValue.getInvertedSignsLevel().getDebugString()).expression.getAnalysis();
        //                 }
        //                 else {
        //                     return undefined;
        //                 }
        //             case "*":
        //                 if (!firstValue.containPriorityOperations() !== !secondValue.containPriorityOperations()) {
        //                     firstValue.level.forEach((value, index) => {
        //                         if (value instanceof MathFunction) {
        //                             return undefined;
        //                         }
        //                         if (Symbol.isNumber(value) && firstValue.at) {
        //                             return undefined;
        //                         }
        //                     })
        //                 }
        //             case "/":
        //                 if (Number.isInteger(firstValue / secondValue)) {
        //                     return firstValue / secondValue;
        //                 }
        //
        //                 const fraction = MathFraction.reduceFraction(firstValue, secondValue);
        //                 if (fraction.denominator > 0 && fraction.numerator > 0) {
        //                     return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
        //                 } else if (fraction.denominator > 0) {
        //                     return new MathFunction("-" + fraction.numerator * -1 + "/" + fraction.denominator).expression;
        //                 } else if (fraction.numerator > 0) {
        //                     return new MathFunction("-" + fraction.numerator + "/" + fraction.denominator * -1).expression;
        //                 } else {
        //                     return new MathFunction(fraction.numerator + "/" + fraction.denominator).expression;
        //                 }
        //             case "^":
        //                 return firstValue ** secondValue;
        //             case "#":
        //                 return Math.sqrt(secondValue);
        //         }
        //     }
        //     catch (error) {
        //         return undefined;
        //     }
        // }
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

    static inequality(variableValue: number | MathLevel, numericValue: number | MathLevel): { result: number | MathLevel | undefined; sign: string } {
        if (variableValue instanceof MathLevel) {
            variableValue = variableValue.getAsNumber();
        }
        if (numericValue instanceof MathLevel) {
            numericValue = numericValue.getAsNumber();
        }

        if (variableValue > 0) {
            return {sign: ">", result: this.solveBasicOperation(numericValue * -1, "/", variableValue)};
        }
        else if (variableValue < 0) {
            return {sign: "<", result: this.solveBasicOperation(numericValue * -1, "/", variableValue)};
        }
        else if (variableValue == 0 && numericValue < 0) {
            return {sign: "R", result: undefined};
        }
        else {
            return {sign: "!=", result: undefined};
        }
    }

    static inequalityFromMathLevel(mathLevel: MathLevel): { result: number | MathLevel | undefined; sign: string } {
        const mathLevelExpression = MathReducer.analyse(mathLevel);
        const hierarchyGroups = mathLevelExpression.getHierarchyGroups();

        return this.inequality(hierarchyGroups[0].level[0], hierarchyGroups[1].level[0]);
    }


    // To-Do: Da completare.
    static multiplyNumberByMathLevel(number: number, mathLevel: MathLevel): MathLevel {
        const newMathLevel = new MathLevel();
        mathLevel.level.forEach((value) => {
            if (value instanceof MathLevel) {
                newMathLevel.level.push(this.multiplyNumberByMathLevel(number, value));
            }
            else if (Symbol.isNumber(value)) {
                newMathLevel.level.push(value);
            }
        });

        return newMathLevel;
    }
}