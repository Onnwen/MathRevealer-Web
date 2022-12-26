import {MathLevel} from './MathLevel';
import {HtmlFormatter} from '../../Formatters/HtmlFormatter';
import {Symbol} from '../../Other/Symbol';
import {UIMathCard} from "../../UI/UIMathCard";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";
import {MathDomain} from "../Domain/MathDomain";

export class MathFunction {
    private _expression: MathLevel;

    get expression(): MathLevel {
        if (this._expression) {
            return this._expression;
        }
        return new MathLevel();
    }

    set expression(value: MathLevel) {
        this._expression = value;
    }

    private _domain: MathDomain | undefined;

    get domain(): MathDomain {
        if (this._domain !== undefined) {
            return this._domain;
        } else {
            return new MathDomain();
        }
    }

    set domain(value: MathDomain) {
        this._domain = value;
    }

    constructor(expression: string | MathLevel | number) {
        if (expression instanceof MathLevel) {
            this._expression = expression;
        }
        else {
            this._expression = new MathLevel();
            this.parse(String(expression));
        }
    }

    parse(expression: string): void {
        expression += "";
        this.expression = new MathLevel();
        let workingLevels: MathLevel[] = [this.expression];

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            if (expression[charIndex] !== " ") {
                let currentLevel = workingLevels[workingLevels.length - 1];
                if (Symbol.isClosingBracket(expression[charIndex])) {
                    currentLevel.closeBrackets(expression[charIndex]);
                    workingLevels.pop();
                }
                else if (Symbol.isOpeningBracket(expression[charIndex])) {
                    if (Symbol.isValue(currentLevel.getLastChar())) {
                        currentLevel.level.push("*");
                    }
                    workingLevels.push(new MathLevel());
                    currentLevel.brackets = expression[charIndex];
                    workingLevels.at(-2)?.level.push(currentLevel);
                }
                else if (charIndex > 0 && !Symbol.isValid(expression[charIndex-1])) {
                    (workingLevels.at(-2) !== undefined ? workingLevels.at(-2) : currentLevel)?.addChar(expression[charIndex])
                }
                else {
                    currentLevel.addChar(expression[charIndex]);
                }
            }
        }
    }


    getHtml(): string {
        return HtmlFormatter.parseMathLevel(this.expression);
    }

    getLaTeX(): string {
        return LaTeXFormatter.parseMathLevel(this.expression);
    }

    getJson(): string {
        return JSON.stringify(this);
    }

    getResults(): UIMathCard[] {
        let results = ["Parità", "Segno", "Intersezioni", "Limiti", "Derivata", "Grafico"];
        let UIResults = [];

        // Domain
        this.calculateDomain();
        if (this._expression.checkIfHaveVariable()) {
            if (this.domain.getLastDoaminExistenceCondition().getJson() === "{\"value\":\"x\",\"sign\":\"=\",\"set\":\"R\"}") {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione appartiene all'insieme dei numeri reali.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.",  this.domain.getHtml()));
            }
            else {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione possiede " + (this.domain.domain.length > 1 ? this.domain.domain.length : "una") + " condizion" + (this.domain.domain.length > 1 ? "i" : "e") + " di esistenza.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.", this.domain.getHtml()));
            }
        }
        else {
            UIResults.push(new UIMathCard("Dominio", "La funzione è costante e non presenta variabili.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati dalla funzione. In questo caso, la funzione non presenta variabili, quindi il dominio è costante e non presenta condizioni di esistenza."));
        }

        results.forEach(result => {
            UIResults.push(new UIMathCard(result, "Questa funzionalità non è attualmente supporta in questa versione di MathRevealer."));
        })

        return UIResults;
    }

    calculateDomain(): void {
        this._domain = new MathDomain();
        this._domain.addExistenceCondition(this._expression.getExistenceConditions());
        this._domain.calculateDomain();
    }
}