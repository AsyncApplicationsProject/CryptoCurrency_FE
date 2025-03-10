import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CryptoDTO} from "../models/CryptoDTO";

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyService {

  private cryptosChange: BehaviorSubject<CryptoDTO[]>
  cryptos$: Observable<CryptoDTO[]>

  constructor() {
    this.cryptosChange = new BehaviorSubject([] as CryptoDTO[]);
    this.cryptos$ = this.cryptosChange.asObservable();
  }

  public load() {}
}
