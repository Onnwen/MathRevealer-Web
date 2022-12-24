export class MathSolver {
    static solveBasicOperation(firstValue, operator, secondValue) {
        firstValue = Number.parseFloat(firstValue);
        secondValue = Number.parseFloat(secondValue);
        try {
            switch (operator) {
                case "+":
                    return firstValue + secondValue;
                case "-":
                    return firstValue - secondValue;
                case "*":
                    return firstValue * secondValue;
                case "/":
                    if (true) {
                        return firstValue / secondValue;
                    }
                    if (Number.isInteger(firstValue / secondValue)) {
                        return firstValue / secondValue;
                    }
                    return [firstValue, operator, secondValue];
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

    static solveEquation(variableValue, numericValue) {
        return this.solveBasicOperation(variableValue, "/", numericValue);
    }
}