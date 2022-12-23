import {Symbol} from '../../Other/Symbol.js';
import {MathSolver} from './MathSolver.js';
import {MathLevel} from "./MathLevel.js";

export class MathReducer {
    static analyse(mathLevel) {
        let reducedMathLevel = new MathLevel();
        let jumpNextValue = false;
        let reducedPriorityOperations = this.getSolvedPriorityOperationsMathLevel(mathLevel);

        reducedPriorityOperations.level.forEach((value, index) => {
            if (!jumpNextValue) {
                if (value.level != null) {
                    reducedMathLevel[index] = MathReducer.analyse(value);
                } else {
                    if (Symbol.isOperation(value)) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1), value, reducedPriorityOperations.level.at(index + 1));
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
        let removedElement = 0;

        mathLevel.getLevel().forEach((value, index) => {
            if (!jumpNextValue) {
                if (value.level != null) {
                    reducedMathLevel[index] = MathReducer.analyse(value);
                } else {
                    if (Symbol.isPriorityOperation(value)) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1 - removedElement), value, mathLevel.safelyGetNumberAt(index + 1));
                        if (solvedOperation !== undefined) {
                            reducedMathLevel.level.pop();
                            reducedMathLevel.level.push(solvedOperation);
                            jumpNextValue = true;
                            removedElement += 2;
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

        console.log(reducedMathLevel.getLevel());
        return reducedMathLevel;
    }
}