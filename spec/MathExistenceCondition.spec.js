import {MathExistenceCondition} from "../src/math/domain/MathExistenceCondition.js";

describe('MathExistenceCondition', () => {
    it('combining: x>2 with x>4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", ">", "2");
        let secondExistenceCondition = new MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });

    it('combining: x>4 with x>2', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition("x", ">", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });

    it('combining: x<2 with x<4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });

    it('combining: x<4 with x<2', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", "<", "4");
        let secondExistenceCondition = new MathExistenceCondition("x", "<", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });

    it('combining: x>=2 with x>4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", ">=", "2");
        let secondExistenceCondition = new MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });

    it('combining: x>2 with x>=4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition("x", ">=", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });

    it('combining: x<=2 with x<4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", "<=", "2");
        let secondExistenceCondition = new MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<=","set":"2"}');
    });

    it('combining: x<2 with x<=4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition("x", "<=", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });

    it('combining: x<-2 with x<-4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", "<", "-2");
        let secondExistenceCondition = new MathExistenceCondition("x", "<", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"-4"}');
    });

    it('combining: x>-2 with x>-4', () => {
        let firstExistenceCondition = new MathExistenceCondition("x", ">", "-2");
        let secondExistenceCondition = new MathExistenceCondition("x", ">", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"-2"}');
    });
});