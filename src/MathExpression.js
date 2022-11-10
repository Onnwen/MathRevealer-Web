import {MathLevel} from './MathLevel.js';
import {HtmlFormatter} from './HtmlFormatter.js';
import {Symbol} from './Symbol.js';

export class MathExpression {
    constructor(expression) {
        this.level = new MathLevel();
        this.parse(expression);
    }

    parse(expression) {
        let lastCharIsClosingBracket = false;

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            if (Symbol.isClosingBracket(expression[charIndex])) {
                this.getLastLevel().closeBrackets(expression[charIndex]);
                lastCharIsClosingBracket = true;
            }
            else {
                lastCharIsClosingBracket ? this.getPenultimateLevel().addChar(expression[charIndex]) : this.getLastLevel().addChar(expression[charIndex]);
                lastCharIsClosingBracket = false;
            }
        }
    }

    getHtml() {
        return new HtmlFormatter(this.getLevel()).getResult();
    }

    getJson() {
        return JSON.stringify(this);
    }

    getLevel() {
        if (this.level) {
            return this.level;
        }
        return [];
    }

    getLastLevel() {
        return this.getLevel().getLastLevel();
    }

    getPenultimateLevel() {
        return this.getLevel().getPenultimateLevel();
    }
}