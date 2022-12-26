const MathDomain_1 = require('../dist/Algorithms/Domain/MathDomain');
const MathExistenceCondition = require('../dist/Algorithms/Domain/MathExistenceCondition');

describe('MathDomain', () => {
    it('calculating domain with existence conditions: x>3, x>6', () => {
        let mathDomain = new MathDomain_1.MathDomain();
        mathDomain.addExistenceCondition(new MathExistenceCondition.MathExistenceCondition("x", ">", "3"));
        mathDomain.addExistenceCondition(new MathExistenceCondition.MathExistenceCondition("x", ">", "6"));
        mathDomain.calculateDomain();
        expect(mathDomain.getJson()).toEqual('[{"_value":"x","_sign":">","_set":"6"}]');
    });
});