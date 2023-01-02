import {MathExistenceCondition} from "./MathExistenceCondition";

export class MathDomain {
    private _existenceConditions: MathExistenceCondition[];

    get existenceConditions(): MathExistenceCondition[] {
        return this._existenceConditions;
    }

    set existenceConditions(value: MathExistenceCondition[]) {
        this._existenceConditions = value;
    }

    private _domain: MathExistenceCondition[];

    get domain(): MathExistenceCondition[] {
        return this._domain;
    }

    set domain(value: MathExistenceCondition[]) {
        this._domain = value;
    }

    constructor() {
        this._existenceConditions = [];
        this._domain = [];
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

    getTheory(): string {
        return "Il dominio di una funzione è l'insieme di tutti i possibili valori di \\( x \\) che possono essere inseriti nella funzione.<br><br>" +
            "Ecco un esempio di funzione con il suo dominio:<br>" +
            "$$f(x) = \\frac{x^2}{x-1}$$" +
            "Dominio: $$x\\in (-\\infty, 1) \\cup (1, \\infty)$$" +
            "In questo caso, il dominio della funzione è l'insieme di tutti i valori di \\( x \\) che non fanno dividere per zero nel denominatore.<br><br>" +
            "Se il dominio non viene esplicitamente indicato, di solito si assume che sia l'insieme di tutti i numeri reali. Tuttavia, ci sono alcune funzioni che hanno un dominio più limitato. Ad esempio, una funzione con una radice quadrata ha come dominio solo i numeri non negativi, poiché non è possibile calcolare la radice quadrata di un numero negativo."
    }

    // reduceDomain() {
    //     this._existenceConditions.forEach((existenceCondition, index) => {
    //         this._existenceConditions[index] = MathReducer.analyse(existenceCondition.value);
    //     });
    // }
}
