import {MathLevel} from './MathLevel';
import {HtmlFormatter} from '../../Formatters/HtmlFormatter';
import {Symbol} from '../../Other/Symbol';
import {UIMathCard} from "../../UI/UIMathCard";
import {LaTeXFormatter} from "../../Formatters/LaTeXFormatter";
import {MathDomain} from "../Domain/MathDomain";
import {MathParity} from "../Parity/MathParity";
import {MathIntersections} from "../MathIntersections/MathIntersections";
import {MathSign} from "../Sign/MathSign";
import {MathLimits} from "../Limits/MathLimits";
import {MathDerivative} from "../Derivative/MathDerivative";
import {MathGraph} from "../MathGraph/MathGraph";

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
            this.calculateDomain();
        }
        return <MathDomain>this._domain;
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

    private _sign: MathSign | undefined;

    get sign(): MathSign {
        if (this._sign === undefined) {
            this.calculateSign();
        }
        return <MathSign>this._sign;
    }

    set sign(value: MathSign) {
        this._sign = value;
    }

    private _limits: MathLimits | undefined;

    get limits(): MathLimits {
        if (this._limits === undefined) {
            this.calculateLimits()
        }
        return <MathLimits>this._limits;
    }

    set limits(value: MathLimits | undefined) {
        this._limits = value;
    }

    private _firstDerivative: MathDerivative | undefined;

    get firstDerivative(): MathDerivative {
        if (this._firstDerivative === undefined) {
            this.calculateDerivative();
        }
        return <MathDerivative>this._firstDerivative;
    }

    set firstDerivative(value: MathDerivative | undefined) {
        this._firstDerivative = value;
    }

    private _secondDerivative: MathDerivative | undefined;

    get secondDerivative(): MathDerivative {
        if (this._secondDerivative === undefined) {
            this.calculateDerivative();
        }
        return <MathDerivative>this._secondDerivative;
    }

    set secondDerivative(value: MathDerivative | undefined) {
        this._secondDerivative = value;
    }

    private _graph: MathGraph | undefined;

    get graph(): MathGraph {
        if (this._graph === undefined) {
            this.calculateGraph();
        }
        return <MathGraph>this._graph;
    }

    set graph(value: MathGraph | undefined) {
        this._graph = value;
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
                else if (expression[charIndex] == "X") { // To-Do: È solo uno strataggemma per il momento
                    workingLevels.at(-1)?.addChar("X");
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
        let UIResults = [];

        // Domain
        this.calculateDomain();
        if (this.expression.haveVariable) {
            if (this.domain.getLastDoaminExistenceCondition().set === "R") {
                UIResults.push(new UIMathCard("Dominio", "Il dominio appartiene all'insieme dei numeri reali.", this.domain.getTheory(), this.domain.getHtml(),));
            }
            else {
                UIResults.push(new UIMathCard("Dominio", "Il dominio possiede " + (this.domain.domain.length > 1 ? this.domain.domain.length : "una") + " condizion" + (this.domain.domain.length > 1 ? "i" : "e") + " di esistenza.", this.domain.getTheory(), this.domain.getHtml()));
            }
        }
        else {
            UIResults.push(new UIMathCard("Dominio", "La funzione è costante e non presenta variabili.", this.domain.getTheory(), this.domain.getHtml()));
        }

        // Parity
        this.calculateParity();
        if (this.parity.isEven) {
            UIResults.push(new UIMathCard("Parità", "La funzione analizzata risulta essere pari. ", this.parity.getTheory(), this.parity.getHtml()));
        }
        else if (this.parity.isOdd) {
            UIResults.push(new UIMathCard("Parità", "La funzione analizzata risulta essere dispari.", this.parity.getTheory(), this.parity.getHtml()));
        }
        else {
            UIResults.push(new UIMathCard("Parità", "La funzione non è né pari né dispari.", this.parity.getTheory(), this.parity.getHtml()));
        }

        // Intersections
        this.calculateIntersections()
        if (this.intersections.getTotalIntersections() > 0) {
            UIResults.push(new UIMathCard("Intersezioni", "La funzione ha " + this.intersections.getTotalIntersections() + " intersezioni con gli assi.", this.intersections.getTheory(), this.intersections.getHtml()));
        }
        else {
            UIResults.push(new UIMathCard("Intersezioni", "La funzione non ha intersezioni con gli assi.", this.intersections.getTheory(), this.intersections.getHtml()));
        }

        // Sign
        this.calculateSign();
        UIResults.push(new UIMathCard("Segno", "Sono stati calcolati gli insiemi di positività e negatività.", this.sign.getTheory(), this.sign.getHtml()));

        // Limit
        this.calculateLimits();
        UIResults.push(new UIMathCard("Limiti", "Sono stati calcolati " + this.limits.limits.length + " limiti della funzione.", this.limits.getTheory(), this.limits.getHtml()));

        // Derivative
        this.calculateDerivative();
        UIResults.push(new UIMathCard("Derivate", "Sono state calcolate derivata prima e seconda della funzione.", this.firstDerivative.getTheory(), "$$ \\displaylines{f' = " + this.firstDerivative.getLaTeX() + " \\\\ f'' = " + this.secondDerivative.getLaTeX() + "}$$"));

        // Graph
        this.calculateGraph()
        UIResults.push(new UIMathCard("Grafico", "Sono stati calcolati " + this.graph.points.length + " punti del grafico.", this.graph.getTheory(), this.graph.getHtml(), true));

        // let developmentResultPreview = [];
        // developmentResultPreview.forEach(result => {
        //     UIResults.push(new UIMathCard(result, "Questa funzionalità non è attualmente supporta in questa versione di MathRevealer.", "", "", false));
        // });

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

    calculateSign(): void {
        this._sign = new MathSign(this);
    }

    calculateLimits(): void {
        this._limits = new MathLimits(this);
    }

    calculateGraph(): void {
        this._graph = new MathGraph(this);
    }

    calculateDerivative(): void {
        this.firstDerivative = new MathDerivative(this.expression);
        this.secondDerivative = new MathDerivative(this.firstDerivative.derivative as MathLevel);
    }
}