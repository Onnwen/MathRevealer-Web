import {MathDomain} from '../src/math/domain/MathDomain.js';
import {MathExistenceCondition} from "../src/math/domain/MathExistenceCondition.js";

describe('MathDomain', () => {
    it('calculating domain with existence conditions: x>3, x>6', () => {
        let mathDomain = new MathDomain();
        mathDomain.addExistenceCondition(new MathExistenceCondition("x", ">", "3"));
        mathDomain.addExistenceCondition(new MathExistenceCondition("x", ">", "6"));
        mathDomain.calculateDomain();
        expect(mathDomain.getJson()).toEqual('[{"value":"x","sign":">","set":"6"}]');
    });
});