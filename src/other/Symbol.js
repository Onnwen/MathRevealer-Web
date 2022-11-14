export class Symbol {
    static operationSymbols = ["+", "-", "*", "/", "^", "#"];
    static priorityOperationSymbols = ["*", "/", "^", "#"];
    static existenceNotGuaranteedByOperations = ["/", "#"];
    static openingBracketSymbols = ["(", "{", "["];
    static closingBracketSymbols = [")", "}", "]"];
    static variableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    static numberSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    static decimalSeparatorSymbols = [",", "."];
    static validSymbols = Symbol.operationSymbols.concat(Symbol.openingBracketSymbols, Symbol.closingBracketSymbols, Symbol.variableSymbols, Symbol.numberSymbols, Symbol.decimalSeparatorSymbols);
    static invalidNumberSymbols = Symbol.operationSymbols.concat(Symbol.openingBracketSymbols, Symbol.closingBracketSymbols, Symbol.variableSymbols);

    static isOperation(symbol) {
        return this.operationSymbols.indexOf(symbol) !== -1;
    }

    static isPriorityOperation(symbol) {
        return this.priorityOperationSymbols.indexOf(symbol) !== -1;
    }

    static isExistenceGuaranteedByOperation(symbol) {
        return this.existenceNotGuaranteedByOperations.indexOf(symbol) === -1;
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

    static isDecimalSeparator(symbol) {
        return this.decimalSeparatorSymbols.indexOf(symbol) !== -1;
    }

    static isValue(symbol) {
        return this.variableSymbols.concat(this.numberSymbols).indexOf(symbol) !== -1;
    }

    static isNumber(number) {
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

    static isInvalidNumber(number) {
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