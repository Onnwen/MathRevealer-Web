import {LaTeXFormatter} from "../../formatter/LaTeXFormatter.js";

export class MathDomain {
    constructor() {
        this.allExistenceConditions = [];
        this.existenceConditions = [];
        this.domain = [];
    }

    addExistenceCondition(existenceCondition) {
        if (Array.isArray(existenceCondition)) {
            this.allExistenceConditions = this.allExistenceConditions.concat(existenceCondition);
        }
        else {
            this.allExistenceConditions.push(existenceCondition);
        }
    }

    calculateDomain() {
        this.allExistenceConditions.forEach(existenceCondition => {
            let existenceConditionConsidered = false;
            this.existenceConditions.forEach((domainExistenceCondition, index) => {
                if (domainExistenceCondition.canBeCombinedWith(existenceCondition)) {
                    this.existenceConditions[index] = domainExistenceCondition.combineWith(existenceCondition);
                    existenceConditionConsidered = true;
                }
            });
            if (!existenceConditionConsidered) {
                this.existenceConditions.push(existenceCondition);
            }
        });
    }

    getHtml() {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX() {
        let LaTeX = ""
        if (this.existenceConditions.length > 1) {
            LaTeX += "\\begin{cases}";
            this.existenceConditions.forEach(existenceCondition => {
                LaTeX += existenceCondition.getLaTeX() + "\\\\";
            })
            LaTeX += "\\end{cases}";
        }
        else {
            LaTeX += this.existenceConditions.at(0).getLaTeX();
        }
        return LaTeX;
    }

    getJson() {
        return JSON.stringify(this.existenceConditions);
    }
}
