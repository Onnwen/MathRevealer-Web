import {Symbol} from "../Other/Symbol";
import {MathLevel} from "../Algorithms/Function/MathLevel";

export class LaTeXFormatter {
    static parseMathLevel(mathLevel: MathLevel): string {
        let LaTeX = "";
        if (mathLevel instanceof MathLevel) {
            LaTeX += mathLevel.brackets[0] !== undefined ? "\\left" + mathLevel.brackets[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.level.length; charIndex++) {
                if (mathLevel.level[charIndex] instanceof MathLevel) {
                    LaTeX += LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex]);
                }
                else if (!Symbol.isValid(mathLevel.level[charIndex])) {
                    LaTeX += Symbol.getLaTeXSymbol(mathLevel.level[charIndex]);
                }
                else if (mathLevel.level[charIndex+1] === "/") {
                    LaTeX += " \\frac{" + LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex]) + "}{" + (mathLevel.level[charIndex+2] !== undefined ? LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex+2]) : '...') + "}";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.level[charIndex] === "#") {
                    LaTeX += "\\sqrt[2]{" + LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex+1]) + "}";
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.level[charIndex])) {
                        if (mathLevel.level[charIndex] === "^") {
                            LaTeX += "^{" + LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex + 1]) + "}";
                            charIndex++;
                        } else {
                            LaTeX += mathLevel.level[charIndex];
                        }
                    } else {
                        LaTeX += LaTeXFormatter.parseMathLevel(mathLevel.level[charIndex]);
                    }
                }
            }
            LaTeX += mathLevel.brackets[1] !== undefined ? "\\right" + mathLevel.brackets[1] : "";
            return LaTeX;
        }
        else {
            return mathLevel
        }
    }
}