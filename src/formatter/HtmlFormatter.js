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
            if (mathLevel.error !== "") {
                html += '<a href="#" data-toggle="tooltip" title="' + mathLevel.error + '" class="errorText">'
            }
            html += mathLevel.getBrackets()[0] !== undefined ? mathLevel.getBrackets()[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.getLevel().length; charIndex++) {
                if (typeof mathLevel.getLevel()[charIndex] === 'object' && mathLevel.getLevel()[charIndex] !== undefined) {
                    html += this.generateHtml(mathLevel.getLevel()[charIndex]);
                }
                else if (mathLevel.getLevel()[charIndex+1] === "/") {
                    html += "<div class='frac'><span>" + this.generateHtml(mathLevel.getLevel()[charIndex]) + "</span><span class='symbol'>/</span><span class='bottom'>" + (mathLevel.getLevel()[charIndex+2] !== undefined ? this.generateHtml(mathLevel.getLevel()[charIndex+2]) : '...') + "</span></div>";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.getLevel()[charIndex] === "#") {
                    html += '<span style="white-space: nowrap;"><span style="padding-right: 0.25px">&radic;</span><span style="text-decoration:overline; text-decoration-thickness: 1px;">&nbsp;' + this.generateHtml(mathLevel.getLevel()[charIndex+1]) + '&nbsp;</span></span>';
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
            html += mathLevel.getBrackets()[1] !== undefined ? mathLevel.getBrackets()[1] : "";
            if (mathLevel.error !== "") {
                    html += '</a>';
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