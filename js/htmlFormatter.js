function getHtml(tree) {
    let html = "";
    if (Array.isArray(tree)) {
        for (let branchIndex = 0; branchIndex < tree.length; branchIndex++) {
            if (!Array.isArray(tree[branchIndex])) {
                if (tree[branchIndex] === "^") {
                    html += "<sup>" + getHtml(tree[branchIndex + 1]) + "</sup>";
                    branchIndex++;
                }
                else if (tree[branchIndex+1] === "/") {
                    html += "<div class='frac'><span>" + tree[branchIndex] + "</span><span class='symbol'>/</span><span class='bottom'>" + (tree[branchIndex+2] !== undefined ? tree[branchIndex+2] : '...') + "</span></div>";
                    branchIndex++;
                    branchIndex++;
                }
                else if (tree[branchIndex] === "+") {
                    html += "&plus;";
                }
                else if (tree[branchIndex] === "-") {
                    html += "&minus;";
                }
                else if (tree[branchIndex] === "*") {
                    html += "&times;";
                }
                else {
                    html += tree[branchIndex];
                }
            } else {
                html += getHtml(tree[branchIndex][tree]);
            }
        }
        console.log(html);
        return html;
    }
    else {
        return html + tree;
    }
}