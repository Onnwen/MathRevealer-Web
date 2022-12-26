import {MathFunction} from "../Function/MathFunction";
import {Symbol} from '../../Other/Symbol';
import {MathLevel} from "../Function/MathLevel";
import * as module from "module";

export class MathExistenceCondition {
    private _value: string | MathLevel;

    get value(): string | MathLevel {
        return this._value;
    }

    set value(value: string | MathLevel) {
        this._value = value;
    }

    private _sign: string;

    get sign(): string {
        return this._sign;
    }

    set sign(value: string) {
        this._sign = value;
    }

    private _set: string;

    get set(): string {
        return this._set;
    }

    set set(value: string) {
        this._set = value;
    }

    constructor(value: string | MathLevel, sign: string, set: string) {
        this._value = value;
        this._sign = sign;
        this._set = set;
    }

    getFloatingSet(): number {
        return (parseFloat(this.set));
    }

    getSet(): string {
        return this.set;
    }

    canBeCombinedWith(existenceCondition: MathExistenceCondition): boolean {
        return this.value === existenceCondition.value && this.sign.charAt(0) === existenceCondition.sign.charAt(0) && (this.sign.charAt(0) === "<" || this.sign.charAt(0) === ">");
    }

    combineWith(existenceCondition: MathExistenceCondition): MathExistenceCondition {
        let sign = "";
        if (this.sign.at(0) === ">") {
            if ((this.sign === ">=" && this.getFloatingSet() > existenceCondition.getFloatingSet()) || (existenceCondition.sign === ">=" && existenceCondition.getFloatingSet() > this.getFloatingSet()) || (this.sign === ">=" && existenceCondition.sign === ">=")) {
                sign = ">=";
            } else {
                sign = ">";
            }
            return new MathExistenceCondition(this.value, sign, this.getFloatingSet() > existenceCondition.getFloatingSet() ? this.set : existenceCondition.getSet());
        } else {
            if ((this.sign === "<=" && this.getFloatingSet() < existenceCondition.getFloatingSet()) || (existenceCondition.sign === ">=" && existenceCondition.getFloatingSet() < this.getFloatingSet()) || (this.sign === ">=" && existenceCondition.sign === ">=")) {
                sign = "<=";
            } else {
                sign = "<";
            }
            return new MathExistenceCondition(this.value, sign, this.getFloatingSet() < existenceCondition.getFloatingSet() ? this.set : existenceCondition.set);
        }
    }

    getLaTeX(): string {
        if (this.value instanceof MathLevel) {
            return this.value.getLaTeX() + Symbol.getLaTeXSign(this.sign) + new MathFunction(this.set).getLaTeX()
        }
        else {
            return new MathFunction(this.value).getLaTeX() + Symbol.getLaTeXSign(this.sign) + new MathFunction(this.set).getLaTeX()
        }
    }

    getJson(): string {
        return JSON.stringify(this);
    }
}