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
        return parseFloat(this._set);
    }

    getSet(): string {
        return this._set;
    }

    canBeCombinedWith(existenceCondition: MathExistenceCondition): boolean {
        return this._value === existenceCondition._value && this._sign.charAt(0) === existenceCondition._sign.charAt(0) && (this._sign.charAt(0) === "<" || this._sign.charAt(0) === ">");
    }

    combineWith(existenceCondition: MathExistenceCondition): MathExistenceCondition {
        let sign = "";
        if (this._sign.at(0) === ">") {
            if ((this._sign === ">=" && this.getSet() > existenceCondition.getSet()) || (existenceCondition._sign === ">=" && existenceCondition.getSet() > this.getSet()) || (this._sign === ">=" && existenceCondition._sign === ">=")) {
                sign = ">=";
            } else {
                sign = ">";
            }
            return new MathExistenceCondition(this._value, sign, this.getSet() > existenceCondition.getSet() ? this.set : existenceCondition.getSet());
        } else {
            if ((this._sign === "<=" && this.getSet() < existenceCondition.getSet()) || (existenceCondition._sign === ">=" && existenceCondition.getSet() < this.getSet()) || (this._sign === ">=" && existenceCondition._sign === ">=")) {
                sign = "<=";
            } else {
                sign = "<";
            }
            return new MathExistenceCondition(this._value, sign, this.getSet() < existenceCondition.getSet() ? this._set : existenceCondition._set);
        }
    }

    getLaTeX(): string {
        if (this._value instanceof MathLevel) {
            return this._value.getLaTeX() + Symbol.getLaTeXSign(this._sign) + new MathFunction(this._set).getLaTeX()
        }
        else {
            return new MathFunction(this._value).getLaTeX() + Symbol.getLaTeXSign(this._sign) + new MathFunction(this._set).getLaTeX()
        }
    }

    getJson(): string {
        return JSON.stringify(this);
    }
}