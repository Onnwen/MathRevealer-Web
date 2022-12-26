const MathExistenceCondition_1 = require('../dist/Algorithms/Domain/MathExistenceCondition');

describe('MathExistenceCondition', () => {
    it('combining: x \> 2 with x > 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":">","_set":"4"}');
    });

    it('combining: x > 4 with x > 2', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":">","_set":"4"}');
    });

    it('combining: x < 2 with x < 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":"<","_set":"2"}');
    });

    it('combining: x < 4 with x < 2', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "4");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":"<","_set":"2"}');
    });

    it('combining: x >= 2 with x > 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">=", "2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":">","_set":"4"}');
    });

    it('combining: x > 2 with x >= 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">=", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":">","_set":"4"}');
    });

    it('combining: x <= 2 with x < 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<=", "2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":"<=","_set":"2"}');
    });

    it('combining: x < 2 with x <= 4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<=", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":"<","_set":"2"}');
    });

    it('combining: x < -2 with x < -4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "-2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", "<", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":"<","_set":"-4"}');
    });

    it('combining: x > -2 with x > -4', () => {
        let firstExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "-2");
        let secondExistenceCondition = new MathExistenceCondition_1.MathExistenceCondition("x", ">", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"_value":"x","_sign":">","_set":"-2"}');
    });
});