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
                    return firstValue / secondValue;
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
}