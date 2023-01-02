const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');

describe('Math sign', () => {
    it('analysing sign: "2x+4"', () => {
        expect(new MathFunction_1.MathFunction("2x+4").sign.getDebugString()).toEqual('I.P.: [-2, Infinity] - I.N.: [-Infinity, -2]');
    });
    it('analysing sign: "2x-4"', () => {
        expect(new MathFunction_1.MathFunction("2x-4").sign.getDebugString()).toEqual('I.P.: [2, Infinity] - I.N.: [-Infinity, 2]');
    });
    it('analysing sign: "4x-2"', () => {
        expect(new MathFunction_1.MathFunction("4x-2").sign.getDebugString()).toEqual('I.P.: [1/2, Infinity] - I.N.: [-Infinity, 1/2]');
    });
    it('analysing sign: "4x+2"', () => {
        expect(new MathFunction_1.MathFunction("4x+2").sign.getDebugString()).toEqual('I.P.: [-1/2, Infinity] - I.N.: [-Infinity, -1/2]');
    });
});