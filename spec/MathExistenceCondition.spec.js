"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathExistenceCondition_ts_1 = require("../src/Algorithms/Domain/MathExistenceCondition.ts");
describe('MathExistenceCondition', () => {
    it('combining: x>2 with x>4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });
    it('combining: x>4 with x>2', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });
    it('combining: x<2 with x<4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });
    it('combining: x<4 with x<2', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "4");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });
    it('combining: x>=2 with x>4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">=", "2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });
    it('combining: x>2 with x>=4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "4");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">=", "2");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"4"}');
    });
    it('combining: x<=2 with x<4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<=", "2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<=","set":"2"}');
    });
    it('combining: x<2 with x<=4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<=", "4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"2"}');
    });
    it('combining: x<-2 with x<-4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "-2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", "<", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":"<","set":"-4"}');
    });
    it('combining: x>-2 with x>-4', () => {
        let firstExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "-2");
        let secondExistenceCondition = new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "-4");
        expect(firstExistenceCondition.combineWith(secondExistenceCondition).getJson()).toEqual('{"value":"x","sign":">","set":"-2"}');
    });
});
