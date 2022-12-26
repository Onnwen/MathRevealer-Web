import {MathLevel} from './MathLevel';
import {HtmlFormatter} from '../../Formatters/HtmlFormatter';
import {Symbol} from '../../Other/Symbol';
import {UIMathCard} from "../../UI/UIMathCard";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";
import {MathDomain} from "../Domain/MathDomain";

export class MathFunction {
    private _expression: MathLevel;
    private _domain: MathDomain;

    constructor(expression: string | MathLevel | number) {
        if (expression instanceof MathLevel) {
            this._expression = expression
            this._domain = new MathDomain();
        }
        else {
            this._expression = new MathLevel();
            this._domain = new MathDomain();
            this.parse(String(expression));
        }
    }

    parse(expression: string): void {
        expression += "";

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            if (expression[charIndex] !== " ") {
                if (Symbol.isClosingBracket(expression[charIndex])) {
                    this._expression.level.at(-1).closeBrackets(expression[charIndex]);
                    this._expression.level.pop();
                }
                else if (Symbol.isOpeningBracket(expression[charIndex])) {
                    if (Symbol.isValue(this._expression.level.at(-1).getLastChar())) {
                        this._expression.level.at(-1).getLevel().push("*");
                    }
                    this._expression.level.push(new MathLevel());
                    this._expression.level.at(-1).brackets = expression[charIndex];
                    this._expression.level.at(-2).getLevel().push(this._expression.level.at(-1));
                }
                else if (charIndex > 0 && !Symbol.isValid(expression[charIndex-1])) {
                    this._expression.level.at(this._expression.level.at(-2) !== undefined ? -2 : -1).addChar(expression[charIndex])
                }
                else {
                    this._expression.level.at(-1).addChar(expression[charIndex]);
                }
            }
        }
    }

    getHtml(): string {
        return HtmlFormatter.parseMathLevel(this.getExpression());
    }

    getLaTeX(): string {
        return LaTeXFormatter.parseMathLevel(this.getExpression());
    }

    getJson(): string {
        return JSON.stringify(this);
    }

    getExpression(): MathLevel {
        if (this._expression) {
            return this._expression;
        }
        return new MathLevel();
    }

    getResults(): UIMathCard[] {
        let results = ["Parità", "Segno", "Intersezioni", "Limiti", "Derivata", "Grafico"];
        let UIResults = [];

        // Domain
        this.calculateDomain();
        if (this._expression.checkIfHaveVariable()) {
            if (this.getDomain().getLastDoaminExistenceCondition().getJson() === "{\"value\":\"x\",\"sign\":\"=\",\"set\":\"R\"}") {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione appartiene all'insieme dei numeri reali.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.",  this.getDomain().getHtml()));
            }
            else {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione possiede " + (this.getDomain().domain.length > 1 ? this.getDomain().domain.length : "una") + " condizion" + (this.getDomain().domain.length > 1 ? "i" : "e") + " di esistenza.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.", this.getDomain().getHtml()));
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


    set expression(value: MathLevel) {
        this._expression = value;
    }

    set domain(value: MathDomain) {
        this._domain = value;
    }

    calculateDomain(): void {
        this._domain = new MathDomain();
        this._domain.addExistenceCondition(this._expression.getExistenceConditions());
        this._domain.calculateDomain();
    }

    getDomain(): MathDomain {
        if (this._domain !== undefined) {
            return this._domain;
        } else {
            return new MathDomain();
        }
    }
}