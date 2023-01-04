const MathSolver_1 = require('../dist/Algorithms/Calculator/MathSolver');
const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('MathSolver', () => {
    it('solving: "8-3"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(8, "-", 3)).toEqual(5);
    });
    it('solving: "-8-3"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(-8, "-", 3)).toEqual(-11);
    });
    it('solving: "-8+3"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(-8, "+", 3)).toEqual(-5);
    });
    it('solving: "8*3"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(8, "*", 3)).toEqual(24);
    });
    it('solving: "20/10"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(20, "/", 10)).toEqual(2);
    });
    it('solving: "10/20"', () => {
        expect(MathSolver_1.MathSolver.solveBasicOperation(10, "/", 20).getDebugString()).toEqual("1/2");
    });
    it('solving: "20/10+2/8"', () => {
        const firstValue = new MathFunction_1.MathFunction("20/10").expression;
        const secondValue = new MathFunction_1.MathFunction("2/8").expression;
        expect(MathSolver_1.MathSolver.solveBasicOperation(firstValue, "/", secondValue).getDebugString()).toEqual("1/2");
    });
});