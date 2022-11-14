export class MathDomain {
    constructor() {
        this.allExistenceConditions = [];
        this.existenseConditions = [];
        this.domain = [];
    }

    addExistenceCondition(existenceCondition) {
        this.allExistenceConditions.push(existenceCondition);
    }

    calculateDomain() {
        this.allExistenceConditions.forEach(existenseCondition => {
            this.existenseConditions.forEach(existenseCondition => {

            });
        });
    }

    getHtml() {

    }

    getLaTeX() {

    }

    getJson() {
        return JSON.stringify(this);
    }
}
