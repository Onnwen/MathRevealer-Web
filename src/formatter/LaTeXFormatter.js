export class LaTeXFormatter {
    constructor(mathLevel) {
        this.LaTeX = this.generateLaTeX(mathLevel);
    }

    getResult() {
        return this.LaTeX;
    }

    generateLaTeX(mathLevel) {
        let LaTeX = "";
        if (typeof mathLevel === 'object' && mathLevel !== undefined) {
            LaTeX += mathLevel.getBrackets()[0] !== undefined ? "\\left" + mathLevel.getBrackets()[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.getLevel().length; charIndex++) {
                if (typeof mathLevel.getLevel()[charIndex] === 'object' && mathLevel.getLevel()[charIndex] !== undefined) {
                    LaTeX += this.generateLaTeX(mathLevel.getLevel()[charIndex]);
                }
                else if (mathLevel.getLevel()[charIndex+1] === "/") {
                    LaTeX += " \\frac{" + this.generateLaTeX(mathLevel.getLevel()[charIndex]) + "}{" + (mathLevel.getLevel()[charIndex+2] !== undefined ? this.generateLaTeX(mathLevel.getLevel()[charIndex+2]) : '...') + "}";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.getLevel()[charIndex] === "#") {
                    LaTeX += "\\sqrt[2]{" + this.generateLaTeX(mathLevel.getLevel()[charIndex+1]) + "}";
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.getLevel()[charIndex])) {
                        if (mathLevel.getLevel()[charIndex] === "^") {
                            LaTeX += "^{" + this.generateLaTeX(mathLevel.getLevel()[charIndex + 1]) + "}";
                            charIndex++;
                        } else {
                            LaTeX += mathLevel.getLevel()[charIndex];
                        }
                    } else {
                        LaTeX += this.generateLaTeX(mathLevel.getLevel()[charIndex]);
                    }
                }
            }
            LaTeX += mathLevel.getBrackets()[1] !== undefined ? "\\right" +mathLevel.getBrackets()[1] : "";
            return LaTeX;
        }
        else if (!isNaN(mathLevel)) {
            return mathLevel
        }
        else {
            return "";
        }
    }
}