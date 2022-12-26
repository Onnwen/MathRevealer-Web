import {MathFunction} from "../Algorithms/Function/MathFunction";
import {MathReducer} from "../Algorithms/Function/MathReducer";

const expression = new MathFunction("8*3+5*x+2-7*9-12*x-8+1-2*3").expression;
// const expression = new MathFunction("1-2").getExpression();
expression.printDebug();

console.log("--------------------");

const analysed = MathReducer.analyse(expression);
analysed.printDebug();