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
    it('analysing sign: "4x"', () => {
        expect(new MathFunction_1.MathFunction("4x").sign.getDebugString()).toEqual('I.P.: [0, Infinity] - I.N.: [-Infinity, 0]');
    });
    it('analysing sign: "-2x"', () => {
        expect(new MathFunction_1.MathFunction("-2x").sign.getDebugString()).toEqual('I.P.: [-Infinity, 0] - I.N.: [0, Infinity]');
    });
    it('analysing sign: "2"', () => {
        expect(new MathFunction_1.MathFunction("2").sign.getDebugString()).toEqual('I.P.: [-Infinity, Infinity] - I.N.: ');
    });
});