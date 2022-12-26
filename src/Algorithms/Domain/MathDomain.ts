import {MathExistenceCondition} from "./MathExistenceCondition";

export class MathDomain {
    private _existenceConditions: MathExistenceCondition[];
    private _domain: MathExistenceCondition[];

    constructor() {
        this._existenceConditions = [];
        this._domain = [];
    }

    get existenceConditions(): MathExistenceCondition[] {
        return this._existenceConditions;
    }

    set existenceConditions(value: MathExistenceCondition[]) {
        this._existenceConditions = value;
    }

    get domain(): MathExistenceCondition[] {
        return this._domain;
    }

    set domain(value: MathExistenceCondition[]) {
        this._domain = value;
    }

    getDomainExistenceCondition(index: number): MathExistenceCondition {
        if (index < this._domain.length) {
            return this._domain[index];
        }
        return this._domain[index];
    }

    getLastDoaminExistenceCondition(): MathExistenceCondition {
        return this._domain[this._domain.length-1];
    }

    addExistenceCondition(existenceCondition: MathExistenceCondition | MathExistenceCondition[]): void {
        if (Array.isArray(existenceCondition)) {
            this._existenceConditions = this._existenceConditions.concat(existenceCondition);
        }
        else {
            this._existenceConditions.push(existenceCondition);
        }
    }

    calculateDomain(): void {
        // this.reduceDomain();

        this._existenceConditions.forEach(existenceCondition => {
            let existenceConditionConsidered = false;
            this._domain.forEach((domainExistenceCondition, index) => {
                if (domainExistenceCondition.canBeCombinedWith(existenceCondition)) {
                    this._domain[index] = domainExistenceCondition.combineWith(existenceCondition);
                    existenceConditionConsidered = true;
                }
            });
            if (!existenceConditionConsidered) {
                this._domain.push(existenceCondition);
            }
        });
        if (this._domain.length === 0) {
            this._domain.push(new MathExistenceCondition("x", "=", "R"));
        }
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = ""
        if (this._domain.length > 1) {
            LaTeX += "\\begin{cases}";
            this._domain.forEach(existenceCondition => {
                LaTeX += existenceCondition.getLaTeX() + "\\\\";
            })
            LaTeX += "\\end{cases}";
        }
        else {
            LaTeX += this._domain[0].getLaTeX();
        }
        return LaTeX;
    }

    getJson(): string {
        return JSON.stringify(this._domain);
    }

    // reduceDomain() {
    //     this._existenceConditions.forEach((existenceCondition, index) => {
    //         this._existenceConditions[index] = MathReducer.analyse(existenceCondition.value);
    //     });
    // }
}
