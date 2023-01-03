const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');
const MathDerivative_1 = require('../dist/Algorithms/Derivative/MathDerivative');

describe('MathDerivate', () => {
    it('analysing derivative: "8x+4"', () => {
        expect((new MathDerivative_1.MathDerivative(new MathFunction_1.MathFunction("8x+4").expression)).getDebugString()).toEqual('8');
    });
    it('analysing derivative: "4+4"', () => {
        expect((new MathDerivative_1.MathDerivative(new MathFunction_1.MathFunction("4+4").expression)).getDebugString()).toEqual('0');
    });
    it('analysing derivative: "4x"', () => {
        expect((new MathDerivative_1.MathDerivative(new MathFunction_1.MathFunction("4x").expression)).getDebugString()).toEqual('4');
    });
    it('analysing derivative: "4x+4x"', () => {
        expect((new MathDerivative_1.MathDerivative(new MathFunction_1.MathFunction("4x+4x").expression)).getDebugString()).toEqual('8');
    });
    it('analysing derivative: "4x^2"', () => {
        expect((new MathDerivative_1.MathDerivative(new MathFunction_1.MathFunction("4x^2").expression)).getDebugString()).toEqual('8x');
    });
});