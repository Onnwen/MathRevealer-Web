const contextDivisors = ["+", "-", "*", "/", "^"];

console.log(getContexts("1+2+3-(4+5-3)-6"));

function getContexts(expression) {
    return extractOutsideOperations(extractInsideOperations(reconstructContexts(getRawContexts(expression))));
}

function getRawContexts(expression) {
    return expression.replace(/\s/g, '').split("(");
}

function reconstructContexts(contexts) {
    let reconstructedContexts = contexts;

    contexts.some((context, index) => {
        let splittedContext = context.split(")");
        let lastClosingBracketIndex = context.lastIndexOf(")");
        if (splittedContext.length > 2 && context.split("(").length + 1 < splittedContext.length) {
            reconstructedContexts.splice(index, 1, contexts[index - 1] + "(" + context);
            reconstructedContexts.splice(index - 1, 1);
            return reconstructContexts(reconstructedContexts);
        }
        if (lastClosingBracketIndex !== -1 && lastClosingBracketIndex !== context.length - 1) {
            let firstPart = context.slice(0, lastClosingBracketIndex + 1);
            let secondPart = context.slice(lastClosingBracketIndex + 1);
            reconstructedContexts.splice(index, 1, secondPart);
            reconstructedContexts.splice(index, 0, firstPart);
            return reconstructContexts(reconstructedContexts);
        }
    });

    return reconstructedContexts;
}

function extractInsideOperations(contexts, iteration = 1) {
    let newContexts = contexts;
    contexts.some((context, index) => {
        if (context.at(-1) === ")") {
            newContexts[index] = context.slice(0, -1);
        }
        contextDivisors.forEach((divisor) => {
            if (divisor !== context) {
                let firstDivisorIndex = context.indexOf(divisor);
                if (context.indexOf(")") === -1 && context.indexOf("(") === -1 && firstDivisorIndex > 0 && firstDivisorIndex < context.length-1) {
                    let firstPart = context.slice(0, firstDivisorIndex);
                    let secondPart = context.slice(firstDivisorIndex+1);
                    newContexts.splice(index, 1, firstPart);
                    newContexts.splice(index+1, 0, divisor);
                    newContexts.splice(index+2, 0, secondPart);
                    return extractInsideOperations(newContexts, iteration+1);
                }
            }
        });
    });

    return newContexts;
}

function extractOutsideOperations(contexts) {
    let newContexts = contexts;
    contexts.some((context, index) => {
        if (context.at(-1) === ")" && context.split("(").length < context.split(")").length) {
            newContexts[index] = context.slice(0, -1);
        }
        contextDivisors.forEach((divisor) => {
            if (divisor !== context) {
                if (divisor === context[0]) {
                    newContexts[index] = context.substring(1);
                    newContexts.splice(index, 0, divisor);
                    return extractOutsideOperations(newContexts);
                }
                if (divisor === context.at(-1)) {
                    newContexts.splice(index + 1, 0, divisor);
                    newContexts[index] = context.slice(0, -1);
                    return extractOutsideOperations(newContexts);
                }
            }
        });
    });

    return newContexts;
}