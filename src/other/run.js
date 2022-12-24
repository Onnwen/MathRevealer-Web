import {MathFunction} from "../Algorithms/Function/MathFunction.js";
import {MathReducer} from "../Algorithms/Function/MathReducer.js";

const expression = new MathFunction("8*3+5*x+2-7*9-12*x-8+1-2*3").getExpression();
// const expression = new MathFunction("1-2").getExpression();
expression.printDebug();

console.log("--------------------");

const analised = MathReducer.analyse(expression);
analised.printDebug();