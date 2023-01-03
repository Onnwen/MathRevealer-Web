const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathReduce', () => {
    it('reducing: "8*3-5x+2-7*9+12x-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3").expression.getAnalysis().getDebugString()).toEqual('7*x-50');
    });
    it('reducing: "9x-73+28-56+12x-4+1-23"', () => {
        expect(new MathFunction_1.MathFunction("9x-73+28-56+12x-4+1-23").expression.getAnalysis().getDebugString()).toEqual('21*x-127');
    });
    it('reducing: "72x-3x-42-4+2-4x"', () => {
        expect(new MathFunction_1.MathFunction("72x-3x-42-4+2-4x").expression.getAnalysis().getDebugString()).toEqual('65*x-44');
    });
    it('reducing: "5*10*32-4x-32*2+129x"', () => {
        expect(new MathFunction_1.MathFunction("5*10*32-4x-32*2+129x").expression.getAnalysis().getDebugString()).toEqual('125*x+1536');
    });
    it('reducing: "1x-1x+2x+3-3"', () => {
        expect(new MathFunction_1.MathFunction("1x+1x-2x+3-3").expression.getAnalysis().getDebugString()).toEqual('0');
    });
    it('reducing: "1x+(1x+2x)+3+3"', () => {
        expect(new MathFunction_1.MathFunction("1x+(1x+2x)+3+3").expression.getAnalysis().getDebugString()).toEqual('4*x+6');
    });
    it('reducing: "(1x+2)"', () => {
        expect(new MathFunction_1.MathFunction("(1x+2)").expression.getAnalysis().getDebugString()).toEqual('1*x+2');
    });
    it('reducing: "(2x-9+9x+(2+3-2x)+3+(2x-2x-3))"', () => {
        expect(new MathFunction_1.MathFunction("(2x-9+9x+(2+3-2x)+3+(2x-2x-3))").expression.getAnalysis().getDebugString()).toEqual('9*x-4');
    });
    it('reducing: "(2x-9+9x-(2+3-2x)+3-(2x-2x-3))"', () => {
        expect(new MathFunction_1.MathFunction("(2x-9+9x-(2+3-2x)+3-(2x-2x-3))").expression.getAnalysis().getDebugString()).toEqual('13*x-8');
    });
    it('reducing: "(1x+2)-1x"', () => {
        expect(new MathFunction_1.MathFunction("(1x+2)-1x").expression.getAnalysis().getDebugString()).toEqual('2');
    });
    it('reducing: "(2-x)"', () => {
        expect(new MathFunction_1.MathFunction("(2-x)").expression.getAnalysis().getDebugString()).toEqual('-1*x+2');
    });
});