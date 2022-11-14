export class MathDomain {
    constructor() {
        this.allExistenceConditions = [];
        this.existenceConditions = [];
        this.domain = [];
    }

    addExistenceCondition(existenceCondition) {
        this.allExistenceConditions.push(existenceCondition);
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

    }

    getLaTeX() {

    }

    getJson() {
        return JSON.stringify(this.existenceConditions);
    }
}
