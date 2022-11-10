export class Symbol {
    static operationSymbols = ["+", "-", "*", "/", "^"];
    static priorityOperationSymbols = ["*", "/", "^"];
    static openingBracketSymbols = ["(", "{", "["];
    static closingBracketSymbols = [")", "}", "]"];

    static isOperation(symbol) {
        return this.operationSymbols.indexOf(symbol) !== -1;
    }

    static isPriorityOperation(symbol) {
        return this.priorityOperationSymbols.indexOf(symbol) !== -1;
    }

    static isOpeningBracket(symbol) {
        return this.openingBracketSymbols.indexOf(symbol) !== -1;
    }

    static isClosingBracket(symbol) {
        return this.closingBracketSymbols.indexOf(symbol) !== -1;
    }

    static getRespectiveBracket(bracket) {
        if (this.isClosingBracket(bracket)) {
            return this.openingBracketSymbols[this.closingBracketSymbols.indexOf(bracket)];
        } else if (this.isOpeningBracket(bracket)) {
            return this.closingBracketSymbols[this.openingBracketSymbols.indexOf(bracket)];
        } else {
            return "";
        }
    }

    static bracketsMatch(openingBracket, closingBracket) {
        return this.openingBracketSymbols.indexOf(openingBracket) === this.closingBracketSymbols.indexOf(closingBracket);
    }
}