export class MathFraction {
    static getFraction(value: number): { numerator: number, denominator: number } {
        const isNegative = value < 0;
        if (isNegative) {
            value = Math.abs(value);
        }
        if (value < 1) {
            for (let i = value * 100; i > 1; i--) {
                if (value * i === Math.floor(value * i)) {
                    return this.reduceFraction(isNegative ? value * i * -1 : value * i, i);
                }
            }
        } else {
            for (let i = value; i > 1; i--) {
                if (value % i === 0) {
                    return this.reduceFraction(isNegative ? value / i * -1 : value / i, i);
                }
            }
        }

        console.warn(
            "Non è stata trovata nessun corrispettivo di frazione per il valore " + value + "."
        );
        return { numerator: value, denominator: 1 };
    }

    static reduceFraction(numerator: number, denominator: number): { numerator: number, denominator: number } {
        let mcm = this.mcm(numerator, denominator);
        const fraction = { numerator: numerator / mcm, denominator: denominator / mcm };

        if (fraction.denominator < 0 && fraction.numerator < 0) {
            fraction.denominator *= -1;
            fraction.numerator *= -1;
        }
        else if (fraction.denominator < 0) {
            fraction.numerator *= -1;
            fraction.denominator *= -1;
        }

        return fraction;
    }

    static mcm(firstValue: number, secondValue: number): number {
        while (secondValue !== 0) {
            const t = secondValue;
            secondValue = firstValue % secondValue;
            firstValue = t;
        }
        return firstValue;
    }
}