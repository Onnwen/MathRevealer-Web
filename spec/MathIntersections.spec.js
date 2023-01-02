const {MathFunction} = require('../dist/Algorithms/Function/MathFunction');
const {MathIntersections} = require("../dist/Algorithms/MathIntersections/MathIntersections");

describe('MathIntersections', () => {
    it('analysing intersections: "2x+4"', () => {
        expect(new MathIntersections(new MathFunction("2x+4")).getDebugString()).toEqual('x: (-2; 0) - y: (0; 4)');
    });
    it('analysing intersections: "2x"', () => {
        expect(new MathIntersections(new MathFunction("2x")).getDebugString()).toEqual('x: (0; 0) - y: (0; 0)');
    });
    it('analysing intersections: "4x+2"', () => {
        expect(new MathIntersections(new MathFunction("4x+2")).getDebugString()).toEqual('x: (-1/2; 0) - y: (0; 2)');
    });
    it('analysing intersections: "2"', () => {
        expect(new MathIntersections(new MathFunction("2")).getDebugString()).toEqual('x:  - y: (0; 2)');
    });
});