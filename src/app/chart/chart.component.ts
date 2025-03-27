import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { CryptoDTO } from "../models/CryptoDTO";

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  template: `
    <canvas baseChart
            [datasets]="chartData.datasets"
            [labels]="chartData.labels"
            [options]="chartOptions"
            [type]="chartType">
    </canvas>
  `,
  styles: `
  canvas {
    max-height: 40vh;
  }
  `
})
export class ChartComponent implements OnInit {
  @Input() crypto: CryptoDTO | undefined;

  chartType: ChartType = 'line';
  chartData: ChartData = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit() {
    // console.log('Received crypto data:', this.crypto);
    if (this.crypto) {
      this.updateChartData(this.crypto);
    } else {
      console.warn('No crypto data provided');
    }
  }


  private updateChartData(crypto: CryptoDTO): void {
    const labels: string[] = [];
    const prices: number[] = [];

    crypto.PriceHistory.forEach((history) => {
      // console.log(history);
      if (history.Date && history.Price !== undefined) {
        labels.push(new Date(history.Date).toLocaleTimeString());
        prices.push(history.Price);
      } else {
        console.warn('Invalid data for price history', history);
      }
    });

    this.chartData = {
      labels: labels,
      datasets: [{
        data: prices,
        label: crypto.Name,
        backgroundColor: 'rgba(0,123,255,0.6)',
        borderColor: 'rgba(0,123,255,1)',
        borderWidth: 1
      }]
    };
  }
}
