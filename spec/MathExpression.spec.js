import {MathFunction} from '../src/math/function/MathFunction.js';

describe('MathExpression', () => {
    it('parsing: "1-2"', () => {
        expect(new MathFunction("1-2").getJson()).toEqual('{"expression":{"level":["1","-","2"],"brackets":"","error":""}}');
    });

    it('parsing: "1-2+(3-4)"', () => {
        expect(new MathFunction("1-2+(3-4)").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""}],"brackets":"","error":""}}');
    });

    it('parsing: "(1-2)+3+4"', () => {
        expect(new MathFunction("(1-2)+3+4").getJson()).toEqual('{"expression":{"level":[{"level":["1","-","2"],"brackets":"()","error":""},"+","3","+","4"],"brackets":"","error":""}}');
    });

    it('parsing: "1-2+(3-4)+3"', () => {
        expect(new MathFunction("1-2+(3-4)+3").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
    });

    it('parsing: "1-2(3-4)+3"', () => {
        expect(new MathFunction("1-2(3-4)+3").getJson()).toEqual('{"expression":{"level":["1","-","2","*",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
    });

    it('parsing: "1-2+{3+[(4+5)+6+(7+8)]+9}+10"', () => {
        expect(new MathFunction("1-2+{3+[(4+5)+6+(7+8)]+9}+10").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","+",{"level":[{"level":["4","+","5"],"brackets":"()","error":""},"+","6","+",{"level":["7","+","8"],"brackets":"()","error":""}],"brackets":"[]","error":""},"+","9"],"brackets":"{}","error":""},"+","10"],"brackets":"","error":""}}');
    });

    it('parsing: "2*x"', () => {
        expect(new MathFunction("2*x").getJson()).toEqual('{"expression":{"level":["2","*","x"],"brackets":"","error":""}}');
    });

    it('parsing: "2x"', () => {
        expect(new MathFunction("2x").getJson()).toEqual('{"expression":{"level":["2","*","x"],"brackets":"","error":""}}');
    });

    it('parsing: "3.14"', () => {
        expect(new MathFunction("3.14").getJson()).toEqual('{"expression":{"level":["3,14"],"brackets":"","error":""}}');
    });
});