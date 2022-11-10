import {MathExpression} from '../src/MathExpression.js';

describe('MathExpression', () => {
    it('formatting: "1-2"', () => {
        expect(new MathExpression("1-2").getJson()).toEqual('{"level":{"level":["1","-","2"],"brackets":"","error":""}}');
    });

    it('formatting: "1-2+(3-4)"', () => {
        expect(new MathExpression("1-2+(3-4)").getJson()).toEqual('{"level":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""}],"brackets":"","error":""}}');
    });

    it('formatting: "1-2+(3-4)+3"', () => {
        expect(new MathExpression("1-2+(3-4)+3").getJson()).toEqual('{"level":{"level":["1","-","2","+",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
    });

    it('formatting: "1-2(3-4)+3"', () => {
        expect(new MathExpression("1-2(3-4)+3").getJson()).toEqual('{"level":{"level":["1","-","2","*",{"level":["3","-","4"],"brackets":"()","error":""},"+","3"],"brackets":"","error":""}}');
    });

    it('formatting: "2*x"', () => {
        expect(new MathExpression("2*x").getJson()).toEqual('{"level":{"level":["2","*","x"],"brackets":"","error":""}}');
    });

    it('formatting: "2x"', () => {
        expect(new MathExpression("2x").getJson()).toEqual('{"level":{"level":["2","*","x"],"brackets":"","error":""}}');
    });
});