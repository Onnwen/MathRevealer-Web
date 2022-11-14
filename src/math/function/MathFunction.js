import {MathLevel} from './MathLevel.js';
import {HtmlFormatter} from '../../formatter/HtmlFormatter.js';
import {Symbol} from '../../other/Symbol.js';
import {UIMathCard} from "../../ui/UIMathCard.js";

export class MathFunction {
    constructor(expression) {
        this.expression = new MathLevel();
        this.parse(expression);
    }

    parse(expression) {
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
        let uiResults = [new UIMathCard("Dominio", "Il dominio della funzione appartiene all'insieme dei numeri reali.", "x = &#8477;")];
        results.forEach(result => {
            uiResults.push(new UIMathCard(result));
        })
        return uiResults;
    }

    getDomain() {
        let existenceConditions = [];
        this.getExpression().forEach(level => {

        })
    }
}