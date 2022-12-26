"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathReducer_ts_1 = require("../src/Algorithms/Function/MathReducer.ts");
const MathFunction_ts_1 = require("../src/Algorithms/Function/MathFunction.ts");
describe('MathReduce', () => {
    it('reducing: "8*3-5x+2-7*9+12x-8+1-2*3"', () => {
        expect(MathReducer_ts_1.MathReducer.analyse(new MathFunction_ts_1.MathFunction("8*3-5x+2-7*9+12x-8+1-2*3").getExpression()).getDebugString()).toEqual('7*x-50');
    });
    it('reducing: "9x-73+28-56+12x-4+1-23"', () => {
        expect(MathReducer_ts_1.MathReducer.analyse(new MathFunction_ts_1.MathFunction("9x-73+28-56+12x-4+1-23").getExpression()).getDebugString()).toEqual('21*x-127');
    });
    it('reducing: "72x-3x-42-4+2-4x"', () => {
        expect(MathReducer_ts_1.MathReducer.analyse(new MathFunction_ts_1.MathFunction("72x-3x-42-4+2-4x").getExpression()).getDebugString()).toEqual('65*x-44');
    });
    it('reducing: "5*10*32-4x-32*2+129x"', () => {
        expect(MathReducer_ts_1.MathReducer.analyse(new MathFunction_ts_1.MathFunction("5*10*32-4x-32*2+129x").getExpression()).getDebugString()).toEqual('125*x+1536');
    });
    it('reducing: "1x-1x+2x+3-3"', () => {
        expect(MathReducer_ts_1.MathReducer.analyse(new MathFunction_ts_1.MathFunction("1x+1x-2x+3-3").getExpression()).getDebugString()).toEqual('-0*x+0');
    });
});
