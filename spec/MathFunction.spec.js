// import {MathFunction} from '../dist/Algorithms/Function/MathFunction';
const MathFunction_1 = require('../dist/Algorithms/Function/MathFunction');
describe('MathFunction', () => {
    it('parsing: "1-2"', () => {
        expect(new MathFunction_1.MathFunction("1-2").getJson()).toEqual('{"_expression":{"__level":["1","-","2"],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "1-2+(3-4)"', () => {
        expect(new MathFunction_1.MathFunction("1-2+(3-4)").getJson()).toEqual('{"_expression":{"_level":["1","-","2","+",{"_level":["3","-","4"],"_brackets":"()","_error":"","_haveVariable":false}],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "(1-2)+3+4"', () => {
        expect(new MathFunction_1.MathFunction("(1-2)+3+4").getJson()).toEqual('{"_expression":{"_level":[{"_level":["1","-","2"],"_brackets":"()","_error":"","_haveVariable":false},"+","3","+","4"],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "1-2+(3-4)+3"', () => {
        expect(new MathFunction_1.MathFunction("1-2+(3-4)+3").getJson()).toEqual('{"_expression":{"_level":["1","-","2","+",{"_level":["3","-","4"],"_brackets":"()","_error":"","_haveVariable":false},"+","3"],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "1-2(3-4)+3"', () => {
        expect(new MathFunction_1.MathFunction("1-2(3-4)+3").getJson()).toEqual('{"_expression":{"_level":["1","-","2","*",{"_level":["3","-","4"],"_brackets":"()","_error":"","_haveVariable":false},"+","3"],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "1-2+{3+[(4+5)+6+(7+8)]+9}+10"', () => {
        expect(new MathFunction_1.MathFunction("1-2+{3+[(4+5)+6+(7+8)]+9}+10").getJson()).toEqual('{"_expression":{"_level":["1","-","2","+",{"_level":["3","+",{"_level":[{"_level":["4","+","5"],"_brackets":"()","_error":"","_haveVariable":false},"+","6","+",{"_level":["7","+","8"],"_brackets":"()","_error":"","_haveVariable":false}],"_brackets":"[]","_error":"","_haveVariable":false},"+","9"],"_brackets":"{}","_error":"","_haveVariable":false},"+","10"],"_brackets":"","_error":"","_haveVariable":false}}');
    });

    it('parsing: "2*x"', () => {
        expect(new MathFunction_1.MathFunction("2*x").getJson()).toEqual('{"_expression":{"_level":["2","*","x"],"_brackets":"","_error":"","_haveVariable":true}}');
    });

    it('parsing: "2x"', () => {
        expect(new MathFunction_1.MathFunction("2x").getJson()).toEqual('{"_expression":{"_level":["2","*","x"],"_brackets":"","_error":"","_haveVariable":true}}');
    });

    it('parsing: "3.14"', () => {
        expect(new MathFunction_1.MathFunction("3.14").getJson()).toEqual('{"_expression":{"_level":["3,14"],"_brackets":"","_error":"","_haveVariable":false}}');
    });
});