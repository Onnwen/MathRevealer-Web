export class Symbol {
    static operationSymbols = ["+", "-", "*", "/", "^", "#"];
    static priorityOperationSymbols = ["*", "/", "^", "#"];
    static existenceNotGuaranteedByOperations = ["/", "#"];
    static openingBracketSymbols = ["(", "{", "["];
    static closingBracketSymbols = [")", "}", "]"];
    // static variableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    static variableSymbols = ["x"];
    static numberSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static decimalSeparatorSymbols = [",", "."];
    static validSymbols = Symbol.operationSymbols.concat(Symbol.openingBracketSymbols, Symbol.closingBracketSymbols, Symbol.variableSymbols, Symbol.numberSymbols, Symbol.decimalSeparatorSymbols);
    static invalidNumberSymbols = Symbol.operationSymbols.concat(Symbol.openingBracketSymbols, Symbol.closingBracketSymbols, Symbol.variableSymbols);

    static isOperation(symbol: string): boolean{
        return this.operationSymbols.indexOf(symbol) !== -1;
    }

    static isPriorityOperation(symbol: string): boolean {
        return this.priorityOperationSymbols.indexOf(symbol) !== -1;
    }

    static isExistenceGuaranteedByOperation(symbol: string): boolean {
        return this.existenceNotGuaranteedByOperations.indexOf(symbol) === -1;
    }

    static isOpeningBracket(symbol: string): boolean {
        return this.openingBracketSymbols.indexOf(symbol) !== -1;
    }

    static isClosingBracket(symbol: string): boolean {
        return this.closingBracketSymbols.indexOf(symbol) !== -1;
    }

    static isVariable(symbol: string): boolean {
        return this.variableSymbols.indexOf(symbol) !== -1;
    }

    static isDecimalSeparator(symbol: string): boolean {
        return this.decimalSeparatorSymbols.indexOf(symbol) !== -1;
    }

    static isValue(symbol: string): boolean {
        return this.variableSymbols.concat(this.numberSymbols).indexOf(symbol) !== -1;
    }

    static isNumber(number: string): boolean {
        if (number.length === 1) {
            return this.invalidNumberSymbols.indexOf(number) === -1;
        }
        else {
            let symbolLength = number.length;
            while (symbolLength--) {
                if (this.invalidNumberSymbols.indexOf(number.charAt(symbolLength)) !== -1) {
                    return false;
                }
            }

            return true;
        }
    }

    static isInvalidNumber(number: string): boolean {
        if (number.length === 1) {
            return this.invalidNumberSymbols.indexOf(number) !== -1;
        }
        else {
            let decimalSeparatorCount = 0;
            this.decimalSeparatorSymbols.forEach(decimalSeparatorSymbol => {
                let numberLength = number.length;
                while (numberLength--) {
                    if (number.charAt(numberLength) === decimalSeparatorSymbol) {
                        decimalSeparatorCount++;
                    }
                }
            })
            return decimalSeparatorCount > 1;
        }
    }

    static isValid(symbol: string): boolean {
        return this.validSymbols.indexOf(symbol) !== -1;
    }

    static getRespectiveBracket(bracket: string): string {
        if (this.isClosingBracket(bracket)) {
            return this.openingBracketSymbols[this.closingBracketSymbols.indexOf(bracket)];
        } else if (this.isOpeningBracket(bracket)) {
            return this.closingBracketSymbols[this.openingBracketSymbols.indexOf(bracket)];
        } else {
            return "";
        }
    }

    static bracketsMatch(openingBracket: string, closingBracket: string): boolean {
        return this.openingBracketSymbols.indexOf(openingBracket) === this.closingBracketSymbols.indexOf(closingBracket);
    }

    static getLaTeXSign(sign: string): string {
        switch (sign) {
            case "<":
                return "\\lt";
            case ">":
                return "\\gt";
            case ">=":
                return "\\ge";
            case "<=":
                return "\\le";
            case "!=":
                return "\\neq";
            case "=":
                return "=";
            default:
                return "";
        }
    }

    static getLaTeXSymbol(symbol: any): string {
        switch (symbol) {
            case "R":
                return "\\mathbb{R}";
            default:
                return symbol;
        }
    }
}