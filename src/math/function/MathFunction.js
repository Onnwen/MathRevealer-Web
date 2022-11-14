import {MathLevel} from './MathLevel.js';
import {HtmlFormatter} from '../../formatter/HtmlFormatter.js';
import {Symbol} from '../../other/Symbol.js';
import {UIMathCard} from "../../ui/UIMathCard.js";
import {LaTeXFormatter} from "../../formatter/LaTeXFormatter.js";
import {MathDomain} from "../domain/MathDomain.js";

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
        return new HtmlFormatter(this.getExpression()).getResult();
    }

    getLaTeX() {
        return new LaTeXFormatter(this.getExpression()).getResult();
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
            console.log(this.getDomain().domain.at(-1).getJson());
            if (this.getDomain().domain.at(-1).getJson() === "{\"value\":\"x\",\"sign\":\"=\",\"set\":\"R\"}") {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione appartiene all'insieme dei numeri reali.", this.getDomain().getHtml()));
            }
            else {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione possiede " + this.getDomain().domain.length + " condizioni di esistenza.", this.getDomain().getHtml()));
            }
        }
        else {
            UIResults.push(new UIMathCard("Dominio", "La funzione è costante e non presenta variabili."));
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