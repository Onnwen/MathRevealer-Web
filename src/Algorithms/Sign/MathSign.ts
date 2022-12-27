import {MathFunction} from "../Function/MathFunction";
import {MathDomain} from "../Domain/MathDomain";

export class MathSign {
    private _positivityInterval: MathDomain;

    get positivityInterval(): MathDomain {
        return this._positivityInterval;
    }

    set positivityInterval(value: MathDomain) {
        this._positivityInterval = value;
    }

    private _negativityInterval: MathDomain;

    get negativityInterval(): MathDomain {
        return this._negativityInterval;
    }

    set negativityInterval(value: MathDomain) {
        this._negativityInterval = value;
    }

    constructor(mathFunction: MathFunction) {
        this._positivityInterval = new MathDomain();
        this._negativityInterval = new MathDomain();
    }

    getHtml(): string {
        return "$$" + this.getLaTeX() + "$$";
    }

    getLaTeX(): string {
        let LaTeX = ""
        return LaTeX;
    }
}