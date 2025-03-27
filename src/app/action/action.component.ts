import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {TradeCryptoService} from "../services/trade-crypto.service";
import {UserService} from "../services/user.service";
import {Observable, take} from "rxjs";
import {UserDTO} from "../models/UserDTO";

@Component({
  selector: 'app-action',
  standalone: false,
  template: `
    <div class="action__container--box">
      <form (ngSubmit)="Buy()" class="action__container-item">
        <button class="success">BUY</button>
        <input type="number" min="0" [(ngModel)]="buyAmount" name="buyAmount">
      </form>
      <form (ngSubmit)="Sell()" class="action__container-item">
        <button class="danger">SELL</button>
        <input type="number" min="0" max="{{this.userCryptoAmount}}" [(ngModel)]="sellAmount" name="sellAmount">
      </form>
    </div>
  `,
  styles: `
    .success {
      background-color: rgb(25 135 84);
    }

    .danger {
      background-color: rgb(220 53 69);
    }
    
    .action__container-item input {
      padding: 0.5rem 1rem;
      max-width: 10rem;
      color: black;
    }
    
    .action__container-item button.danger:active {
      transform: scale(0.97);
      background-color: #2c0b0e;
    }

    .action__container-item button.success:active {
      transform: scale(0.97);
      background-color: #051b11;
    }

    .action__container-item input {
      border-radius: 8px;
      background-color: #ccc;
      border: solid 1px #aaa;
      font-size: 2rem;
    }

    .action__container-item button {
      padding: 1rem 2rem;
      margin-right: 1rem;
      min-width: 12rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s, opacity 0.3s;
      font-size: 2rem;
    }

    .action__container-item {
      display: flex;
      padding: 0.5rem;
    }
  `
})
export class ActionComponent implements OnDestroy {
  private readonly user$: Observable<UserDTO | null>;
  @Input() cryptoSymbol: string;
  @Output() newCryptoAmount: EventEmitter<number>;
  protected buyAmount: number = 0;
  protected sellAmount: number = 0;
  protected userCryptoAmount: Observable<number>;

  constructor(private userService : UserService, private tradeService : TradeCryptoService) {
    this.user$ = userService.user$;
    this.cryptoSymbol = "";
    this.newCryptoAmount = new EventEmitter();
    this.userCryptoAmount = this.getCryptoAmount(this.cryptoSymbol);
  }

  protected getCryptoAmount(symbol: string): Observable<number> {
    return new Observable<number>((observer) => {
      this.user$.pipe(take(1)).subscribe((userData) => {
        if (userData) {
          const walletItem = userData.Wallet.find(item => item.CryptoSymbol === symbol);
          observer.next(walletItem ? walletItem.Amount : 0);
        } else {
          observer.next(0);
          console.warn('User not found');
        }
        observer.complete();
      });
    });
  }

  protected Buy() {
    this.tradeService.Buy(this.cryptoSymbol, this.buyAmount, this.user$);
  }

  protected Sell() {
    this.tradeService.Sell(this.cryptoSymbol, this.sellAmount, this.user$);
  }

  ngOnDestroy() {
    this.tradeService.Stop();
  }
}
