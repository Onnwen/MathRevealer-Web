export class MathExistenceCondition {
    constructor(value, sign, set) {
        this.value = value;
        this.sign = sign;
        this.set = set;
    }

    getSet() {
        if (typeof this.set === 'object') {
            return this.set.getSet();
        }
        else {
            return parseFloat(this.set);
        }
    }

    canBeCombinedWith(existenceCondition) {
        return this.value === existenceCondition.value && this.sign.charAt(0) === existenceCondition.sign.charAt(0) && (this.sign.charAt(0) === "<" || this.sign.charAt(0) === ">");
    }

    combineWith(existenceCondition) {
        if (this.canBeCombinedWith(existenceCondition)) {
            let sign = "";
            switch (this.sign.at(0)) {
                case ">":
                    if ((this.sign === ">=" && this.getSet() > existenceCondition.getSet()) || (existenceCondition.sign === ">=" && existenceCondition.getSet() > this.getSet()) || (this.sign === ">=" && existenceCondition.sign === ">=")) {
                        sign = ">=";
                    } else {
                        sign = ">";
                    }
                    return new MathExistenceCondition(this.value, sign, this.getSet() > existenceCondition.getSet() ? this.set : existenceCondition.set);
                case "<":
                    if ((this.sign === "<=" && this.getSet() < existenceCondition.getSet()) || (existenceCondition.sign === ">=" && existenceCondition.getSet() < this.getSet()) || (this.sign === ">=" && existenceCondition.sign === ">=")) {
                        sign = "<=";
                    } else {
                        sign = "<";
                    }
                    return new MathExistenceCondition(this.value, sign, this.getSet() < existenceCondition.getSet() ? this.set : existenceCondition.set);
            }
        }
    }

    getJson() {
        return JSON.stringify(this);
    }
}