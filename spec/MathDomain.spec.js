"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathDomain_ts_1 = require("../src/Algorithms/Domain/MathDomain.ts");
const MathExistenceCondition_ts_1 = require("../src/Algorithms/Domain/MathExistenceCondition.ts");
describe('MathDomain', () => {
    it('calculating domain with existence conditions: x>3, x>6', () => {
        let mathDomain = new MathDomain_ts_1.MathDomain();
        mathDomain.addExistenceCondition(new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "3"));
        mathDomain.addExistenceCondition(new MathExistenceCondition_ts_1.MathExistenceCondition("x", ">", "6"));
        mathDomain.calculateDomain();
        expect(mathDomain.getJson()).toEqual('[{"value":"x","sign":">","set":"6"}]');
    });
});
