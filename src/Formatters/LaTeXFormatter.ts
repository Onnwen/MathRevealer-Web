import {Symbol} from "../Other/Symbol";
import {MathLevel} from "../Algorithms/Function/MathLevel";

export class LaTeXFormatter {
    static parseMathLevel(mathLevel: MathLevel): string {
        let LaTeX = "";
        if (typeof mathLevel === 'object' && mathLevel !== undefined) {
            LaTeX += mathLevel.getBrackets()[0] !== undefined ? "\\left" + mathLevel.getBrackets()[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.getLevel().length; charIndex++) {
                if (typeof mathLevel.getLevel()[charIndex] === 'object' && mathLevel.getLevel()[charIndex] !== undefined) {
                    LaTeX += LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]);
                }
                else if (!Symbol.isValid(mathLevel.getLevel()[charIndex])) {
                    LaTeX += Symbol.getLaTeXSymbol(mathLevel.getLevel()[charIndex]);
                }
                else if (mathLevel.getLevel()[charIndex+1] === "/") {
                    LaTeX += " \\frac{" + LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]) + "}{" + (mathLevel.getLevel()[charIndex+2] !== undefined ? LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex+2]) : '...') + "}";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.getLevel()[charIndex] === "#") {
                    LaTeX += "\\sqrt[2]{" + LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex+1]) + "}";
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.getLevel()[charIndex])) {
                        if (mathLevel.getLevel()[charIndex] === "^") {
                            LaTeX += "^{" + LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex + 1]) + "}";
                            charIndex++;
                        } else {
                            LaTeX += mathLevel.getLevel()[charIndex];
                        }
                    } else {
                        LaTeX += LaTeXFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]);
                    }
                }
            }
            LaTeX += mathLevel.getBrackets()[1] !== undefined ? "\\right" +mathLevel.getBrackets()[1] : "";
            return LaTeX;
        }
        else {
            return mathLevel
        }
    }
}