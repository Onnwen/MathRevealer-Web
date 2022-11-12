export class Symbol {
    static operationSymbols = ["+", "-", "*", "/", "^"];
    static priorityOperationSymbols = ["*", "/", "^"];
    static openingBracketSymbols = ["(", "{", "["];
    static closingBracketSymbols = [")", "}", "]"];
    static variableSymbols = ["x", "y"];
    static numberSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static validSymbols = Symbol.operationSymbols.concat(Symbol.openingBracketSymbols, Symbol.closingBracketSymbols, Symbol.variableSymbols, Symbol.numberSymbols);

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

    static isVariable(symbol) {
        return this.variableSymbols.indexOf(symbol) !== -1;
    }

    static isValue(symbol) {
        return this.validSymbols.concat(this.numberSymbols).indexOf(symbol) !== -1;
    }

    static isValid(symbol) {
        return this.validSymbols.indexOf(symbol) !== -1;
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