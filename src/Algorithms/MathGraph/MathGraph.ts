import {MathFunction} from "../Function/MathFunction";
import {MathPoint} from "./MathPoint";
import {MathLevel} from "../Function/MathLevel";
import {Chart} from "chart.js";

export class MathGraph {
    points: MathPoint[];

    constructor(mathFunction: MathFunction) {
        this.points = [];
        this.generateGraph(mathFunction.expression);
    }

    generateGraph(mathLevel: MathLevel): void {
        for(let i = -10; i < 10; i++) {
            this.points.push(new MathPoint(i, mathLevel.getY(i)));
        }
    }

    getPointsToArray(): {x: number, y: number }[] {
        const points: {x: number, y: number }[] = [];
        this.points.forEach(point => {
            points.push({x: point.x, y: point.y});
        });
        return points;
    }

    getHtml(): string {
        const canvas = document.createElement('canvas');
        canvas.id = 'graph';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        const config = {
            type: 'scatter',
            plugins: [{
                beforeDraw: (chart: { scales: { [x: string]: any; }; chart: { config: { options: { scales: any; }; }; }; }) => {
                    let xAxis = chart.scales['x-axis-1'];
                    let yAxis = chart.scales['y-axis-1'];
                    const scales = chart.chart.config.options.scales;
                    scales.xAxes[0].ticks.padding = yAxis.top - yAxis.getPixelForValue(0) + 6;
                    scales.yAxes[0].ticks.padding = xAxis.getPixelForValue(0) - xAxis.right + 6;
                }
            }],
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    data: this.getPointsToArray(),
                    borderColor: '#2772f5',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.4,
                    showLine: true
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: -10,
                            max: 10,
                            stepSize: 1,
                            callback: (v: number) => v == 0 ? '' : v,
                            display: false
                        },
                        gridLines: {
                            drawTicks: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: -10,
                            max: 10,
                            stepSize: 1,
                            callback: (v: number) => v == 0 ? '' : v,
                            display: false
                        },
                        gridLines: {
                            drawTicks: false,
                        }
                    }]
                }
            }
        };

        // @ts-ignore
        const chart = new Chart(ctx, config);

        return `<script>
document.getElementById('GraficoCard').getElementsByClassName('mathTextResult')[0].appendChild(document.getElementById('graph'));
document.getElementById('GraficoCard').classList.add('graphCard');
document.getElementById('graph').setAttribute('style', 'width: 100%; height: 100%');
</script>`;
    }

    getTheory(): string {
        return "Il grafico di una funzione è una rappresentazione grafica delle coordinate (x, y) che soddisfano l'equazione della funzione. Il grafico di una funzione è un modo per visualizzare e comprendere le caratteristiche della funzione, come il dominio, il codominio, i punti di intersezione con l'asse x o con l'asse y, i punti di massimo e minimo, i punti di asintoto, ecc.<br><br>";
    }
}