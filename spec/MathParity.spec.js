const MathReducer_1 = require('../dist/Algorithms/Function/MathReducer');
const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathParity', () => {
    it('checking parity of function: "8*3-5x+2-7*9+12x-8+1-2*3"', () => {
        expect((new MathFunction_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3")).parity.isEven).toEqual(false);
    });

    it('checking parity of function: "2"', () => {
        expect((new MathFunction_1.MathFunction("2")).parity.isEven).toEqual(true);
    });

    it('checking parity of function: "x"', () => {
        expect((new MathFunction_1.MathFunction("x")).parity.isOdd).toEqual(true);
    });

    it('checking parity of function: "x"', () => {
        expect((new MathFunction_1.MathFunction("x")).parity.isEven).toEqual(false);
    });
});