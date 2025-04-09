import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { CryptoDTO } from "../models/CryptoDTO";
import { CryptoCurrencyService } from "../services/crypto-currency.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <canvas baseChart
            [datasets]="chartData.datasets"
            [labels]="chartData.labels"
            [options]="chartOptions"
            [type]="chartType">
    </canvas>
  `,
  styles: [`
    canvas {
      max-height: 40vh;
    }
  `]
})
export class ChartComponent implements OnInit, OnDestroy {
  cryptos$: Observable<CryptoDTO[]>;
  private subscription: Subscription | null = null;

  @Input() cryptoSymbol: string | undefined;

  chartType: ChartType = 'line';
  chartData: ChartData = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions = {
    responsive: true,
    animation: false,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: false
      }
    }
  };

  constructor(private cryptoService: CryptoCurrencyService) {
    this.cryptos$ = cryptoService.cryptos$;
  }

  ngOnInit() {
    if (!this.cryptoSymbol) {
      console.warn('No crypto symbol provided.');
      return;
    }

    this.subscription = this.cryptos$.subscribe(cryptos => {
      const crypto = cryptos.find(c => c.Symbol === this.cryptoSymbol);
      if (crypto) {
        this.setChartData(crypto);
      }
    });
  }

  private setChartData(crypto: CryptoDTO): void {
    const labels: string[] = [];
    const prices: number[] = [];

    crypto.PriceHistory.forEach((history) => {
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
