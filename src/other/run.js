import {MathDomain} from "../math/domain/MathDomain.js";
import {MathExistenceCondition} from "../math/domain/MathExistenceCondition.js";
import {MathFunction} from "../math/function/MathFunction.js";

// console.log(new MathExistenceCondition("x", ">", "6").getJson());

let a = "-2";
let b = "-4";

console.log(new MathFunction("[3/(x-2/2)]+x").getLaTeX());
