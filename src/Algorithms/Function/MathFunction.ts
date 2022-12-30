import {MathLevel} from './MathLevel';
import {HtmlFormatter} from '../../Formatters/HtmlFormatter';
import {Symbol} from '../../Other/Symbol';
import {UIMathCard} from "../../UI/UIMathCard";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";
import {MathDomain} from "../Domain/MathDomain";
import {MathParity} from "../Parity/MathParity";
import {MathIntersections} from "../MathIntersections/MathIntersections";

export class MathFunction {
    private _expression: MathLevel;

    get expression(): MathLevel {
        if (this._expression) {
            return this._expression;
        }
        return new MathLevel();
    }

    set expression(value: MathLevel) {
        this._expression = value;
    }

    private _domain: MathDomain | undefined;

    get domain(): MathDomain {
        if (this._domain !== undefined) {
            return this._domain;
        } else {
            return new MathDomain();
        }
    }

    set domain(value: MathDomain) {
        this._domain = value;
    }

    private _parity: MathParity | undefined;

    get parity(): MathParity {
        if (this._parity === undefined) {
            this.calculateParity();
        }
        return <MathParity>this._parity;
    }

    set parity(value: MathParity | undefined) {
        this._parity = value;
    }

    private _intersections: MathIntersections | undefined;

    get intersections(): MathIntersections {
        if (this._intersections === undefined) {
            this.calculateIntersections();
        }
        return <MathIntersections>this._intersections;
    }

    set intersections(value: MathIntersections | undefined) {
        this._intersections = value;
    }

    constructor(expression: string | MathLevel | number) {
        if (expression instanceof MathLevel) {
            this._expression = expression;
        }
        else {
            this._expression = new MathLevel();
            this.parse(String(expression));
        }
    }

    parse(expression: string): void {
        expression += "";
        this.expression = new MathLevel();
        let workingLevels: MathLevel[] = [this.expression];

        for (let charIndex = 0; charIndex < expression.length; charIndex++) {
            if (expression[charIndex] !== " ") {
                if (Symbol.isClosingBracket(expression[charIndex])) {
                    workingLevels.at(-1)?.closeBrackets(expression[charIndex]);
                    workingLevels.pop();
                }
                else if (Symbol.isOpeningBracket(expression[charIndex])) {
                    // @ts-ignore
                    if (workingLevels.at(-1) && Symbol.isValue(workingLevels.at(-1).getLastChar())) {
                        workingLevels.at(-1)?.level.push("*");
                    }
                    workingLevels.push(new MathLevel());
                    if (workingLevels.at(-1)) {
                        // @ts-ignore
                        workingLevels.at(-1).brackets = expression[charIndex];
                    }
                    workingLevels.at(-2)?.level.push(workingLevels.at(-1));
                }
                else if (charIndex > 0 && !Symbol.isValid(expression[charIndex-1])) {
                    workingLevels.at(workingLevels.at(-2) !== undefined ? -2 : -1)?.addChar(expression[charIndex])
                }
                else {
                    workingLevels.at(-1)?.addChar(expression[charIndex]);
                }
            }
        }
    }


    getHtml(): string {
        return HtmlFormatter.parseMathLevel(this.expression);
    }

    getLaTeX(): string {
        return LaTeXFormatter.parseMathLevel(this.expression);
    }

    getJson(): string {
        return JSON.stringify(this);
    }

    getResults(): UIMathCard[] {
        let results = ["Segno", "Limiti", "Derivata", "Grafico"];
        let UIResults = [];

        // Domain
        this.calculateDomain();
        if (this.expression.haveVariable) {
            if (this.domain.getLastDoaminExistenceCondition().set === "R") {
                console.log(this.domain)
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione appartiene all'insieme dei numeri reali.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.",  this.domain.getHtml()));
            }
            else {
                UIResults.push(new UIMathCard("Dominio", "Il dominio della funzione possiede " + (this.domain.domain.length > 1 ? this.domain.domain.length : "una") + " condizion" + (this.domain.domain.length > 1 ? "i" : "e") + " di esistenza.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati.", this.domain.getHtml()));
            }
        }
        else {
            UIResults.push(new UIMathCard("Dominio", "La funzione è costante e non presenta variabili.", "Il dominio di una funzione è l'insieme di tutti i valori che sono accettati dalla funzione. In questo caso, la funzione non presenta variabili, quindi il dominio è costante e non presenta condizioni di esistenza.", this.domain.getHtml()));
        }

        // Parity
        this.calculateParity();
        if (this.parity.isEven) {
            UIResults.push(new UIMathCard("Parità", "La funzione è pari.", "La parità di una funzione indica se la funzione è simmetrica rispetto all'asse delle ascisse.", this.parity.getHtml()));
        }
        else if (this.parity.isOdd) {
            UIResults.push(new UIMathCard("Parità", "La funzione è dispari.", "La parità di una funzione indica se la funzione è simmetrica rispetto all'asse delle ascisse.", this.parity.getHtml()));
        }
        else {
            UIResults.push(new UIMathCard("Parità", "La funzione non è né pari né dispari.", "La parità di una funzione indica se la funzione è simmetrica rispetto all'asse delle ascisse.", this.parity.getHtml()));
        }

        // Intersections
        this.calculateIntersections()
        if (this.intersections.getTotalIntersections() > 0) {
            UIResults.push(new UIMathCard("Intersezioni", "La funzione ha " + this.intersections.getTotalIntersections() + " intersezioni con gli assi.", "Le intersezioni di una funzione sono i punti in cui la funzione interseca gli assi.", this.intersections.getHtml()));
        }
        else {
            UIResults.push(new UIMathCard("Intersezioni", "La funzione non ha intersezioni con gli assi.", "Le intersezioni di una funzione sono i punti in cui la funzione interseca gli assi.", this.intersections.getHtml()));
        }

        results.forEach(result => {
            UIResults.push(new UIMathCard(result, "Questa funzionalità non è attualmente supporta in questa versione di MathRevealer."));
        })


        return UIResults;
    }

    calculateDomain(): void {
        this._domain = new MathDomain();
        this._domain.addExistenceCondition(this._expression.getExistenceConditions());
        this._domain.calculateDomain();
    }

    calculateParity(): void {
        this._parity = new MathParity(this);
    }

    calculateIntersections(): void {
        this._intersections = new MathIntersections(this);
    }
}