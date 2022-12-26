import { MathLevel } from "../Algorithms/Function/MathLevel";

export class HtmlFormatter {
    static parseMathLevel(mathLevel: MathLevel): string {
        let html = "";
        if (typeof mathLevel === 'object' && mathLevel !== undefined) {
            if (mathLevel.error !== "") {
                html += '<a href="#" data-toggle="tooltip" title="' + mathLevel.error + '" class="errorText">'
            }
            html += mathLevel.brackets[0] !== undefined ? mathLevel.brackets[0] : "";
            for (let charIndex = 0; charIndex < mathLevel.level.length; charIndex++) {
                if (typeof mathLevel.level[charIndex] === 'object' && mathLevel.level[charIndex] !== undefined) {
                    html += HtmlFormatter.parseMathLevel(mathLevel.level[charIndex]);
                }
                else if (mathLevel.level[charIndex+1] === "/") {
                    html += "<div class='frac'><span>" + HtmlFormatter.parseMathLevel(mathLevel.level[charIndex]) + "</span><span class='symbol'>/</span><span class='bottom'>" + (mathLevel.level[charIndex+2] !== undefined ? HtmlFormatter.parseMathLevel(mathLevel.level[charIndex+2]) : '...') + "</span></div>";
                    charIndex++;
                    charIndex++;
                }
                else if (mathLevel.level[charIndex] === "#") {
                    html += '<span style="white-space: nowrap;"><span style="padding-right: 0.25px">&radic;</span><span style="text-decoration:overline; text-decoration-thickness: 1px;">&nbsp;' + HtmlFormatter.parseMathLevel(mathLevel.level[charIndex+1]) + '&nbsp;</span></span>';
                    charIndex++;
                }
                else {
                    if (!Array.isArray(mathLevel.level[charIndex])) {
                        if (mathLevel.level[charIndex] === "^") {
                            html += "<sup>" + HtmlFormatter.parseMathLevel(mathLevel.level[charIndex + 1]) + "</sup>";
                            charIndex++;
                        } else if (mathLevel.level[charIndex] === "+") {
                            html += "&plus;";
                        } else if (mathLevel.level[charIndex] === "-") {
                            html += "&minus;";
                        } else if (mathLevel.level[charIndex] === "*") {
                            html += "&times;";
                        } else {
                            html += mathLevel.level[charIndex];
                        }
                    } else {
                        html += HtmlFormatter.parseMathLevel(mathLevel.level[charIndex]);
                    }
                }
            }
            html += mathLevel.brackets[1] !== undefined ? mathLevel.brackets[1] : "";
            if (mathLevel.error !== "") {
                    html += '</a>';
                        }
            return html;
        }
        else {
            return mathLevel;
        }
    }
}