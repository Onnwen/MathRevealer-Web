import {MathReducer} from "../src/Algorithms/Function/MathReducer.js";
import {MathFunction} from "../src/Algorithms/Function/MathFunction.js";

describe('MathReduce', () => {
    it('reducing: "1-2"', () => {
        expect(MathReducer.analyse(new MathFunction("2-1").getExpression()).toString()).toEqual('{"expression":{"level":["1","-","2"],"brackets":"","error":""}}');
    });
});