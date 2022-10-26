class HtmlFormatter {
    constructor(tree) {
        this.html = this.generateHtml(tree)
    }

    getResult() {
        return this.html;
    }

    generateHtml(branches) {
        let html = "";
        if (Array.isArray(branches)) {
            for (let branchIndex = 0; branchIndex < branches.length; branchIndex++) {
                if (branches[branchIndex+1] === "/") {
                    html += "<div class='frac'><span>" + this.generateHtml(branches[branchIndex]) + "</span><span class='symbol'>/</span><span class='bottom'>" + (branches[branchIndex+2] !== undefined ? this.generateHtml(branches[branchIndex+2]) : '...') + "</span></div>";
                    branchIndex++;
                    branchIndex++;
                }
                else {
                    if (!Array.isArray(branches[branchIndex])) {
                        if (branches[branchIndex] === "^") {
                            html += "<sup>" + this.generateHtml(branches[branchIndex + 1]) + "</sup>";
                            branchIndex++;
                        } else if (branches[branchIndex] === "+") {
                            html += "&plus;";
                        } else if (branches[branchIndex] === "-") {
                            html += "&minus;";
                        } else if (branches[branchIndex] === "*") {
                            html += "&times;";
                        } else {
                            html += branches[branchIndex];
                        }
                    } else {
                        html += this.generateHtml(branches[branchIndex]);
                    }
                }
            }
            return html;
        }
        else {
            return html + branches;
        }
    }
}