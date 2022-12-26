import {MathFunction} from '../src/Algorithms/Function/MathFunction';

describe('MathExpression', () => {
    it('parsing: "1-2"', () => {
        expect(new MathFunction("1-2").getJson()).toEqual('{"expression":{"level":["1","-","2"],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "1-2+(3-4)"', () => {
        expect(new MathFunction("1-2+(3-4)").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":"","haveVariable":false}],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "(1-2)+3+4"', () => {
        expect(new MathFunction("(1-2)+3+4").getJson()).toEqual('{"expression":{"level":[{"level":["1","-","2"],"brackets":"()","error":"","haveVariable":false},"+","3","+","4"],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "1-2+(3-4)+3"', () => {
        expect(new MathFunction("1-2+(3-4)+3").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":"","haveVariable":false},"+","3"],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "1-2(3-4)+3"', () => {
        expect(new MathFunction("1-2(3-4)+3").getJson()).toEqual('{"expression":{"level":["1","-","2","*",{"level":["3","-","4"],"brackets":"()","error":"","haveVariable":false},"+","3"],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "1-2+{3+[(4+5)+6+(7+8)]+9}+10"', () => {
        expect(new MathFunction("1-2+{3+[(4+5)+6+(7+8)]+9}+10").getJson()).toEqual('{"expression":{"level":["1","-","2","+",{"level":["3","+",{"level":[{"level":["4","+","5"],"brackets":"()","error":"","haveVariable":false},"+","6","+",{"level":["7","+","8"],"brackets":"()","error":"","haveVariable":false}],"brackets":"[]","error":"","haveVariable":false},"+","9"],"brackets":"{}","error":"","haveVariable":false},"+","10"],"brackets":"","error":"","haveVariable":false}}');
    });

    it('parsing: "2*x"', () => {
        expect(new MathFunction("2*x").getJson()).toEqual('{"expression":{"level":["2","*","x"],"brackets":"","error":"","haveVariable":true}}');
    });

    it('parsing: "2x"', () => {
        expect(new MathFunction("2x").getJson()).toEqual('{"expression":{"level":["2","*","x"],"brackets":"","error":"","haveVariable":true}}');
    });

    it('parsing: "3.14"', () => {
        expect(new MathFunction("3.14").getJson()).toEqual('{"expression":{"level":["3,14"],"brackets":"","error":"","haveVariable":false}}');
    });
});