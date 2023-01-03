const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathSolver', () => {
    it('solving equation: "8*3-5x+2-7*9+12x-8+1-2*3=0"', () => {
        expect(new MathFunction_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3").expression.getAnalysis().getDebugString()).toEqual('7*x-50');
    });
});