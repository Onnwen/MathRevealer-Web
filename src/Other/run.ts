import {MathFunction} from "../Algorithms/Function/MathFunction";
import {MathReducer} from "../Algorithms/Calculator/MathReducer";
import {MathSolver} from "../Algorithms/Calculator/MathSolver";

const expression = new MathFunction("8+2x+4-4+2").expression;
console.log(expression.getX());