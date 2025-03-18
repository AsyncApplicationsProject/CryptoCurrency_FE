import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

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
  styles: ``
})
export class ChartComponent {

  chartType: ChartType = 'line';

  chartData: ChartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [65, 59, 80],
        label: 'Sample Dataset',
        backgroundColor: 'rgba(0,123,255,0.6)',
        borderColor: 'rgba(0,123,255,1)',
        borderWidth: 1
      }
    ]
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
}
