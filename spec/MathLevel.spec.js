const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathLevel', () => {
    it('have variables: "8*3-5x+2-7*9+12x-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3").expression.haveVariable).toBeTrue();
    });
    it('have variables: "8*3-5+2-7*9+12-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3-5+2-7*9+12-8+1-2*3").expression.haveVariable).toBeFalse();
    });
    it('have variables: "8*3+(5x+2)-7*9+12x-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3+(5x+2)-7*9+12x-8+1-2*3").expression.haveVariable).toBeTrue();
    });
    it('have variables: "8*3-5+2-7*9+12-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3-5+2-7*9+12-8+1-2*3").expression.haveVariable).toBeFalse();
    });
    it('have variables: "8*3+(5x+2-7*9+12x)-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3+(5x+2-7*9+12x)-8+1-2*3").expression.haveVariable).toBeTrue();
    });

    it('selecting only numeric values: "8*3+5x+2-7*9+12x-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3+5x+2-7*9+12x-8+1-2*3").expression.getHierarchyGroups()[1].getDebugString()).toEqual("8*3+2-7*9-8+1-2*3");
    });
    it('selecting only variables values: "8*3+5x+2-7*9+12x-8+1-2*3"', () => {
        expect(new MathFunction_1.MathFunction("8*3+5x+2-7*9+12x-8+1-2*3").expression.getHierarchyGroups()[0].getDebugString()).toEqual("5*x+12*x");
    });
    it('selecting only numeric values: "8*x+4"', () => {
        expect(new MathFunction_1.MathFunction("8*x+4").expression.getHierarchyGroups()[1].getDebugString()).toEqual("4");
    });
});