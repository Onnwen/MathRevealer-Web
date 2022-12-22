import {MathLevel} from './MathLevel.js';
import {HtmlFormatter} from '../../Formatters/HtmlFormatter.js';
import {Symbol} from '../../Other/Symbol.js';
import {UIMathCard} from "../../UI/UIMathCard.js";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter.js";
import {MathDomain} from "../Domain/MathDomain.js";

export class MathFunction {
    constructor(expression) {
        this.expression = new MathLevel();
        this.parse(expression);
    }

    parse(expression) {
        expression += "";
        this.expression = new MathLevel();
        let workingLevels = [this.expression];

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            if (expression[charIndex] !== " ") {
                if (Symbol.isClosingBracket(expression[charIndex])) {
                    workingLevels.at(-1).closeBrackets(expression[charIndex]);
                    workingLevels.pop();
                }
                else if (Symbol.isOpeningBracket(expression[charIndex])) {
                    if (Symbol.isValue(workingLevels.at(-1).getLastChar())) {
                        workingLevels.at(-1).getLevel().push("*");
                    }
                    workingLevels.push(new MathLevel());
                    workingLevels.at(-1).brackets = expression[charIndex];
                    workingLevels.at(-2).getLevel().push(workingLevels.at(-1));
                }
                else if (charIndex > 0 && !Symbol.isValid(expression[charIndex-1])) {
                    workingLevels.at(workingLevels.at(-2) !== undefined ? -2 : -1).addChar(expression[charIndex])
                }
                else {
                    workingLevels.at(-1).addChar(expression[charIndex]);
                }
            }
        }
    }

    getHtml() {
        return HtmlFormatter.parseMathLevel(this.getExpression());
    }

    getLaTeX() {
        return LaTeXFormatter.parseMathLevel(this.getExpression());
    }

    getJson() {
        return JSON.stringify(this);
    }

    getExpression() {
        if (this.expression) {
            return this.expression;
        }
        return [];
    }

    getResults() {
        let results = ["Parità", "Segno", "Intersezioni", "Limiti", "Derivata", "Grafico"];
        let UIResults = [];

        // Domain
        this.calculateDomain();
        if (this.expression.checkIfHaveVariable()) {
            if (this.getDomain().domain.at(-1).getJson() === "{\"value\":\"x\",\"sign\":\"=\",\"set\":\"R\"}") {
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
            UIResults.push(new UIMathCard(result, "Questa funzionalità non è attualmente supporta da MathRevealer."));
        })

        return UIResults;
    }

    calculateDomain() {
        this.domain = new MathDomain();
        this.domain.addExistenceCondition(this.expression.getExistenceConditions());
        this.domain.calculateDomain();
    }

    getDomain() {
        return this.domain !== undefined ? this.domain : new MathDomain();
    }
}