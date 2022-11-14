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
            this.existenceConditions.forEach((domainExistenceCondition, index) => {
                if (domainExistenceCondition.canBeCombinedWith(existenceCondition)) {
                    existenceCondition[index] = domainExistenceCondition.combineWith(existenceCondition);
                }
            });
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
