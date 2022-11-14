import {LaTeXFormatter} from "../../formatter/LaTeXFormatter.js";
import {MathExistenceCondition} from "./MathExistenceCondition.js";

export class MathDomain {
    constructor() {
        this.existenceConditions = [];
        this.domain = [];
    }

    addExistenceCondition(existenceCondition) {
        if (Array.isArray(existenceCondition)) {
            this.existenceConditions = this.existenceConditions.concat(existenceCondition);
        }
        else {
            this.existenceConditions.push(existenceCondition);
        }
    }

    calculateDomain() {
        this.existenceConditions.forEach(existenceCondition => {
            let existenceConditionConsidered = false;
            this.domain.forEach((domainExistenceCondition, index) => {
                if (domainExistenceCondition.canBeCombinedWith(existenceCondition)) {
                    this.domain[index] = domainExistenceCondition.combineWith(existenceCondition);
                    existenceConditionConsidered = true;
                }
            });
            if (!existenceConditionConsidered) {
                this.domain.push(existenceCondition);
            }
        });
        if (this.domain.length === 0) {
            this.domain.push(new MathExistenceCondition("x", "=", "R"));
        }
    }

    getHtml() {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX() {
        let LaTeX = ""
        if (this.domain.length > 1) {
            LaTeX += "\\begin{cases}";
            this.domain.forEach(existenceCondition => {
                LaTeX += existenceCondition.getLaTeX() + "\\\\";
            })
            LaTeX += "\\end{cases}";
        }
        else {
            LaTeX += this.domain.at(0).getLaTeX();
        }
        return LaTeX;
    }

    getJson() {
        return JSON.stringify(this.domain);
    }
}
