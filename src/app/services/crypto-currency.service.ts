import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {CryptoDTO} from "../models/CryptoDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PriceHistoryDTO} from "../models/PriceHistoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyService {
  private apiUrl = 'https://localhost:7072/api/crypto';
  cryptos$: Observable<CryptoDTO[]>;
  private cryptosSubject = new BehaviorSubject<CryptoDTO[]>([]);

  constructor(private http: HttpClient) {
    this.cryptos$ = this.cryptosSubject.asObservable();
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
}