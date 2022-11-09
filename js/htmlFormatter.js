export class HtmlFormatter {
    constructor(mathLevel) {
        this.html = this.generateHtml(mathLevel);
    }

    getResult() {
        return this.html;
    }

    generateHtml(mathLevel) {
        let html = "";
        if (typeof mathLevel === 'object' && mathLevel !== undefined) {
            for (let charIndex = 0; charIndex < mathLevel.getLevel().length; charIndex++) {
                if (mathLevel.getLevel()[charIndex+1] === "/") {
                    html += "<div class='frac'><span>" + this.generateHtml(mathLevel.getLevel()[charIndex]) + "</span><span class='symbol'>/</span><span class='bottom'>" + (mathLevel.getLevel()[charIndex+2] !== undefined ? this.generateHtml(mathLevel.getLevel()[charIndex+2]) : '...') + "</span></div>";
                    charIndex++;
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.getLevel()[charIndex])) {
                        if (mathLevel.getLevel()[charIndex] === "^") {
                            html += "<sup>" + this.generateHtml(mathLevel.getLevel()[charIndex + 1]) + "</sup>";
                            charIndex++;
                        } else if (mathLevel.getLevel()[charIndex] === "+") {
                            html += "&plus;";
                        } else if (mathLevel.getLevel()[charIndex] === "-") {
                            html += "&minus;";
                        } else if (mathLevel.getLevel()[charIndex] === "*") {
                            html += "&times;";
                        } else {
                            html += mathLevel.getLevel()[charIndex];
                        }
                    } else {
                        html += this.generateHtml(mathLevel.getLevel()[charIndex]);
                    }
                }
            }
            return html;
        }
        else if (!isNaN(mathLevel)) {
            return mathLevel
        }
        else {
            return "";
        }
    }
}