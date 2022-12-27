import {Symbol} from '../../Other/Symbol';
import {MathSolver} from './MathSolver';
import {MathLevel} from "../Function/MathLevel";
import {MathFunction} from "../Function/MathFunction";

export class MathReducer {
    static analyse(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = MathReducer.analyseInnerParentheses(mathLevel);
        reducedMathLevel = MathReducer.getMathLevelGroupedByVariables(reducedMathLevel);
        reducedMathLevel = MathReducer.getSolvedPriorityOperationsMathLevel(reducedMathLevel);
        reducedMathLevel = MathReducer.getSolvedSecondaryOperationsMathLevel(reducedMathLevel);
        reducedMathLevel = MathReducer.getSolvedVariablesOperationsMathLevel(reducedMathLevel);
        reducedMathLevel = MathReducer.clear(reducedMathLevel);
        return reducedMathLevel
    }

    private static analyseInnerParentheses(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = new MathLevel();

        mathLevel.level.forEach((value: string | MathLevel) => {
            if (value instanceof MathLevel) {
                Array.prototype.push.apply(reducedMathLevel.level, MathReducer.analyse(value).level);
            } else {
                reducedMathLevel.level.push(value);
            }
        });

        return reducedMathLevel;
    }

    private static getSolvedSecondaryOperationsMathLevel(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = new MathLevel();
        let jumpNextValue = false;

        mathLevel.level.forEach((value: string | MathLevel, index: number) => {
            if (!jumpNextValue) {
                if (value instanceof MathLevel) {
                    reducedMathLevel.level.concat(MathReducer.analyse(value).level);
                } else {
                    if (!Symbol.isPriorityOperation(value) && Symbol.isOperation(value) && !Symbol.isVariable(mathLevel.level[index + 3])) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1) * (reducedMathLevel.level.at(-2) === "-" ? -1 : 1), value, mathLevel.level.at(index + 1));
                        if (solvedOperation !== undefined && (!Number.isNaN(solvedOperation) || solvedOperation instanceof MathLevel)) {
                            reducedMathLevel.level.pop();
                            if (solvedOperation instanceof MathLevel) {
                                solvedOperation.level.forEach((value) => {
                                    reducedMathLevel.level.push(value);
                                });
                            } else if (solvedOperation !== 0) {
                                if (solvedOperation < 0) {
                                    reducedMathLevel.level[reducedMathLevel.getLevelLength() - 1] = "-";
                                    reducedMathLevel.level.push(solvedOperation * -1);
                                }
                                else {
                                    reducedMathLevel.level.push(Math.abs(solvedOperation));
                                }
                            }
                            jumpNextValue = true;
                        } else {
                            reducedMathLevel.level.push(value);
                        }
                    }
                    else {
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

    private static getSolvedPriorityOperationsMathLevel(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = new MathLevel();
        let removedElement = 0;

        mathLevel.level.forEach((value: string | MathLevel, index: number) => {
            if (removedElement === 0) {
                if (value instanceof MathLevel) {
                    reducedMathLevel.level[index] = MathReducer.getSolvedPriorityOperationsMathLevel(value);
                } else {
                    if (Symbol.isPriorityOperation(value)) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-1) * (reducedMathLevel.level.at(-2) === "-" ? -1 : 1), value, mathLevel.level.at(index + 1));
                        if (solvedOperation !== undefined && (!Number.isNaN(solvedOperation) || solvedOperation instanceof MathLevel)) {
                            reducedMathLevel.level.pop();
                            if (solvedOperation instanceof MathLevel) {
                                solvedOperation.level.forEach((value) => {
                                    reducedMathLevel.level.push(value);
                                });
                                removedElement += solvedOperation.getLevelLength() - 1;
                            } else if (solvedOperation !== 0) {
                                if (solvedOperation < 0) {
                                    reducedMathLevel.level[reducedMathLevel.getLevelLength() - 1] = "-";
                                    reducedMathLevel.level.push(solvedOperation * -1);
                                }
                                else {
                                    reducedMathLevel.level.push(Math.abs(solvedOperation));
                                }
                                removedElement += 1;
                            }
                        } else {
                            reducedMathLevel.level.push(value);
                        }
                    } else {
                        reducedMathLevel.level.push(value);
                    }
                }
            }
            else {
                removedElement--;
            }
        });

        return reducedMathLevel;
    }

    private static getSolvedVariablesOperationsMathLevel(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = new MathLevel();
        let removedElement = 0;

        mathLevel.level.forEach((value: string | MathLevel, index: number) => {
            if (removedElement === 0) {
                if (value instanceof MathLevel) {
                    reducedMathLevel.level[index] = MathReducer.getSolvedVariablesOperationsMathLevel(value);
                } else {
                    if (Symbol.isOperation(value) && Symbol.isVariable(mathLevel.level[index - 1]) && Symbol.isVariable(mathLevel.level[index + 3])) {
                        const solvedOperation = MathSolver.solveBasicOperation(reducedMathLevel.level.at(-3) * (reducedMathLevel.level.at(-4) === "-" ? -1 : 1), value, mathLevel.safelyGetNumberAt(index + 1));
                        if (solvedOperation !== undefined && (!Number.isNaN(solvedOperation) || solvedOperation instanceof MathLevel)) {
                            reducedMathLevel.level.pop();
                            reducedMathLevel.level.pop();
                            reducedMathLevel.level.pop();
                            if (solvedOperation > 0 ) {
                                reducedMathLevel.level.pop();
                            }
                            if (solvedOperation instanceof MathLevel) {
                                solvedOperation.level.forEach((value) => {
                                    reducedMathLevel.level.push(value);
                                });
                            } else if (solvedOperation !== 0) {
                                if (solvedOperation < 0) {
                                    reducedMathLevel.level[reducedMathLevel.getLevelLength() - 1] = "-";
                                    reducedMathLevel.level.push(solvedOperation * -1);
                                }
                                else {
                                    reducedMathLevel.level.push(Math.abs(solvedOperation));
                                }
                                reducedMathLevel.level.push("*");
                                reducedMathLevel.level.push(mathLevel.level[index + 3]);
                            }
                            removedElement += 3;
                        } else {
                            reducedMathLevel.level.push(value);
                        }
                    } else {
                        reducedMathLevel.level.push(value);
                    }
                }
            }
            else {
                removedElement--;
            }
        });

        return reducedMathLevel;
    }

    private static getMathLevelGroupedByVariables(mathLevel: MathLevel): MathLevel {
        let priorityElements = [];
        let secondaryElements = [];

        for(let i = 0; i < mathLevel.getLevelLength(); i++) {
            if (Symbol.isVariable(mathLevel.level[i + 3])) {
                if (i === 0 && mathLevel.level[i] === "-") {
                    priorityElements.push(mathLevel.level[i + 1] * -1);
                }
                else {
                    priorityElements.push(mathLevel.level[i]);
                    priorityElements.push(mathLevel.level[i + 1]);
                }
                priorityElements.push(mathLevel.level[i + 2]);
                priorityElements.push(mathLevel.level[i + 3]);
                i+=3;
            } else {
                if (i === 0 && mathLevel.level[i-1] !== "-") {
                    secondaryElements.push("+");
                }
                secondaryElements.push(mathLevel.level[i]);
            }
        }

        let groupedMathLevel = new MathLevel();
        groupedMathLevel.level = priorityElements.concat(secondaryElements);
        return groupedMathLevel;
    }

    static clear(mathLevel: MathLevel): MathLevel {
        let reducedMathLevel = new MathLevel();
        let numberCount = 0;

        mathLevel.level.forEach((value: string | MathLevel, index: number) => {
            if (value instanceof MathLevel) {
                reducedMathLevel.level.push(MathReducer.clear(value));
            } else {
                if (Symbol.isNumber(value)) {
                    numberCount++;
                }
                if (Symbol.isOperation(mathLevel.level.at(index-1)) && Symbol.isOperation(value)) {
                    reducedMathLevel.level.pop();
                }
                reducedMathLevel.level.push(value);
            }
        });

        if (mathLevel.level.at(0) == "+") {
            reducedMathLevel.level.shift();
        }

        if (numberCount > 0) {
            return reducedMathLevel;
        } else {
            return new MathFunction("0").expression;
        }
    }
}