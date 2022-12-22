import {Symbol} from '../../Other/Symbol.js';
import {MathSolver} from './MathSolver.js';
import {MathLevel} from "./MathLevel.js";

export class MathReducer {
    static getSolvedMathLevel(mathLevel) {
        let reducedMathLevel = new MathLevel();
        let jumpNextValue = false;

        MathReducer.getSolvedPriorityOperationsMathLevel(mathLevel).level.forEach((value, index) => {
            if (!jumpNextValue) {
                if (value.level != null) {
                    reducedMathLevel[index] = MathReducer.getSolvedMathLevel(value);
                } else {
                    if (Symbol.isOperation(value)) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1), value, mathLevel.safelyGetNumberAt(index + 1));
                        if (solvedOperation !== undefined) {
                            reducedMathLevel.level.pop();
                            reducedMathLevel.level.push(solvedOperation);
                            jumpNextValue = true;
                        } else {
                            reducedMathLevel.level.push(value);
                        }
                    } else {
                        reducedMathLevel.level.push(value);
                    }
                }
            }
            else {
                jumpNextValue = false;
            }
        });

        return reducedMathLevel;
    }

    static getSolvedPriorityOperationsMathLevel(mathLevel) {
        let reducedMathLevel = new MathLevel();
        let jumpNextValue = false

        mathLevel.getLevel().forEach((value, index) => {
            if (!jumpNextValue) {
                if (value.level != null) {
                    reducedMathLevel[index] = MathReducer.getSolvedMathLevel(value);
                } else {
                    if (Symbol.isPriorityOperation(value)) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1), value, mathLevel.safelyGetNumberAt(index + 1));
                        if (solvedOperation !== undefined) {
                            reducedMathLevel.level.pop();
                            reducedMathLevel.level.push(solvedOperation);
                            jumpNextValue = true;
                        } else {
                            reducedMathLevel.level.push(value);
                        }
                    } else {
                        reducedMathLevel.level.push(value);
                    }
                }
            }
            else {
                jumpNextValue = false;
            }
        });

        return reducedMathLevel;
    }
}