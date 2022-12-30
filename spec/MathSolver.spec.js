const MathReducer_1 = require('../dist/Algorithms/Function/MathReducer');
const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathSolver', () => {
    it('solving equation: "8*3-5x+2-7*9+12x-8+1-2*3=0"', () => {
        expect(MathReducer_1.MathReducer.analyse(new MathFunction_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3").expression).getDebugString()).toEqual('7*x-50');
    });
});