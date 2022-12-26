import { MathLevel } from "../Algorithms/Function/MathLevel";

export class HtmlFormatter {
    static parseMathLevel(mathLevel: MathLevel): string {
        let html = "";
        if (typeof mathLevel === 'object' && mathLevel !== undefined) {
            if (mathLevel.getError() !== "") {
                html += '<a href="#" data-toggle="tooltip" title="' + mathLevel.getError() + '" class="errorText">'
            }
            html += mathLevel.getBrackets()[0] !== undefined ? mathLevel.getBrackets()[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.getLevel().length; charIndex++) {
                if (typeof mathLevel.getLevel()[charIndex] === 'object' && mathLevel.getLevel()[charIndex] !== undefined) {
                    html += HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]);
                }
                else if (mathLevel.getLevel()[charIndex+1] === "/") {
                    html += "<div class='frac'><span>" + HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]) + "</span><span class='symbol'>/</span><span class='bottom'>" + (mathLevel.getLevel()[charIndex+2] !== undefined ? HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex+2]) : '...') + "</span></div>";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.getLevel()[charIndex] === "#") {
                    html += '<span style="white-space: nowrap;"><span style="padding-right: 0.25px">&radic;</span><span style="text-decoration:overline; text-decoration-thickness: 1px;">&nbsp;' + HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex+1]) + '&nbsp;</span></span>';
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.getLevel()[charIndex])) {
                        if (mathLevel.getLevel()[charIndex] === "^") {
                            html += "<sup>" + HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex + 1]) + "</sup>";
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
                        html += HtmlFormatter.parseMathLevel(mathLevel.getLevel()[charIndex]);
                    }
                }
            }
            html += mathLevel.getBrackets()[1] !== undefined ? mathLevel.getBrackets()[1] : "";
            if (mathLevel.getError() !== "") {
                    html += '</a>';
                        }
            return html;
        }
        else {
            return mathLevel;
        }
    }
}