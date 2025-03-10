import {Component, OnInit} from '@angular/core';
import {CryptoCurrencyService} from "../services/crypto-currency.service";
import {Observable} from "rxjs";
import {CryptoDTO} from "../models/CryptoDTO";

@Component({
  selector: 'app-offer',
  standalone: false,
  template: `

  `,
  styles: `
  
  `
})
export class OfferComponent implements OnInit {
  cryptos$: Observable<CryptoDTO[]>

  constructor(private cryptoService: CryptoCurrencyService) {
    this.cryptos$ = cryptoService.cryptos$;
  }

  ngOnInit() {
    this.cryptoService.load();
  }
}
