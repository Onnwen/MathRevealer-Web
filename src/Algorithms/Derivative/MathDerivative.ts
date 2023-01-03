import {MathLevel} from "../Function/MathLevel";
import {Symbol} from "../../Other/Symbol";

export class MathDerivative {
    private _derivative: MathLevel | undefined;

    get derivative(): MathLevel | undefined {
        return this._derivative;
    }

    set derivative(value: MathLevel | undefined) {
        this._derivative = value;
    }

    constructor(mathLevel: MathLevel) {
        this._derivative = this.calculateDerivate(mathLevel);
    }

    calculateDerivate(mathLevel: MathLevel): MathLevel {
        const derivative = new MathLevel();
        derivative.brackets = mathLevel.brackets;
        let elementsToJump = 0;

        mathLevel.level.forEach((value, index) => {
            if (elementsToJump == 0) {
                if (value instanceof MathLevel) {
                    derivative.level.push(this.calculateDerivate(value));
                } else {
                    if (Symbol.isVariable(value)) {
                        if (mathLevel.level.at(index + 1) == "^") {
                            if (mathLevel.level.at(index + 2) == "2") {
                                derivative.level.push("*");
                                derivative.level.push("2");
                                derivative.level.push("*");
                                derivative.level.push(value);
                                elementsToJump += 2;
                            } else {
                                derivative.level.push("*");
                                derivative.level.push(mathLevel.level.at(index + 2));
                                derivative.level.push("*");
                                derivative.level.push(value);
                                derivative.level.push("^");
                                derivative.level.push(mathLevel.level.at(index + 2) - 1);
                                elementsToJump += 2;
                            }
                        } else if (mathLevel.level.at(index + 1) == "/") {
                            if (mathLevel.level.at(index + 2) == value) {
                                derivative.level.push("*");
                                derivative.level.push("0");
                                elementsToJump += 2;
                            } else {
                                derivative.level.push("*");
                                derivative.level.push(mathLevel.level.at(index + 2));
                                derivative.level.push("*");
                                derivative.level.push(value);
                                derivative.level.push("^");
                                derivative.level.push("-1");
                                elementsToJump += 2;
                            }
                        } else {
                            derivative.level.push("1");
                        }
                    } else if (Symbol.isNumber(value)) {
                        if (mathLevel.level.at(index+1) == "*" && Symbol.isVariable(mathLevel.level.at(index+2))) {
                            elementsToJump += 2;
                            derivative.level.push(value);
                        }
                        else {
                            derivative.level.push(0);
                        }
                    }
                    else {
                        derivative.level.push(value);
                    }
                }
            } else {
                elementsToJump--;
            }
        });

        return derivative.getAnalysis();
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        return this.derivative?.getLaTeX() ?? "";
    }

    getTheory(): string {
        return "La derivata di una funzione in un punto è il tasso di variazione della funzione in quel punto. Se la funzione è rappresentata da una curva, la derivata prima in un punto è l'inclinazione della tangente alla curva in quel punto.<br><br>" +
            "Le derivate di una funzione hanno diverse applicazioni. Ad esempio, possono essere utilizzate per trovare il massimo o il minimo di una funzione (cioè i punti in cui la curva ha il massimo o il minimo), per trovare il punto di inflessione di una curva (cioè il punto in cui la curva passa da concava a convessa o viceversa)";
    }

    getDebugString(): string {
        return this.derivative?.getDebugString() ?? "";
    }
}