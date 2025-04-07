import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {CryptoDTO} from "../models/CryptoDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PriceHistoryDTO} from "../models/PriceHistoryDTO";
import {CryptoPriceDTO} from "../models/CryptoPriceDTO";
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyService {
  private apiUrl = 'https://localhost:7072/api/crypto';

  private hubConnection2: signalR.HubConnection;

  cryptos$: Observable<CryptoDTO[]>;
  private cryptosSubject = new BehaviorSubject<CryptoDTO[]>([]);

  constructor(private http: HttpClient) {
    this.cryptos$ = this.cryptosSubject.asObservable();

    this.hubConnection2 = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7266/priceHistoryHub', {
          accessTokenFactory: () => '',
          transport: signalR.HttpTransportType.LongPolling,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    this.startConnection();
    this.registerOnPriceUpdate();
  }

  private startConnection() {
    this.hubConnection2
        .start()
        .then(() => console.log('SignalR CryptoCurrency Connected'))
        .catch((err) => console.error('Error connecting to SignalR:', err));
  }

  private registerOnPriceUpdate() {
    this.hubConnection2.on('PriceUpdate', (newPrice: {symbol: string, name: string, date: Date, price: number}) => {
      if (newPrice) {
        console.log('I got new price');
        this.updateCryptoPrice(new CryptoPriceDTO(newPrice.symbol, newPrice.name, newPrice.date, newPrice.price));
      }
      else {
        console.error('Error getting price');
      }
    })
  }

  load(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.get<any[]>(this.apiUrl, { headers }).pipe(
        map(response => {
          return response.map(item => new CryptoDTO(
              item.symbol,
              item.name,
              item.priceHistory.map((ph:any) => new PriceHistoryDTO(ph.date, ph.price))
          ));
        }),
        tap(cryptos => this.cryptosSubject.next(cryptos)),
        catchError(error => {
          console.error('Error fetching cryptos:', error);
          throw error;
        })
    ).subscribe();
  }

  updateCryptoPrice(priceUpdate: CryptoPriceDTO): void {
    const currentCryptos = this.cryptosSubject.value;

    const updatedCryptos = currentCryptos.map(crypto => {
      if (crypto.Symbol === priceUpdate.Symbol) {
        const updatedHistory = [
          ...crypto.PriceHistory,
          new PriceHistoryDTO(priceUpdate.Data.toString(), priceUpdate.Price)
        ];

        return new CryptoDTO(
            crypto.Symbol,
            crypto.Name,
            updatedHistory
        );
      }
      return crypto;
    });

    this.cryptosSubject.next(updatedCryptos);
  }

  Stop() {
    this.hubConnection2?.stop();
  }
}