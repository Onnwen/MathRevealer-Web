import {MathLevel} from './MathLevel.js';
import {HtmlFormatter} from './HtmlFormatter.js';
import {Symbol} from './Symbol.js';

export class MathExpression {
    constructor(expression) {
        this.level = new MathLevel();
        this.parse(expression);
    }

    parse(expression) {
        let workingLevels = [this.level];

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
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
}