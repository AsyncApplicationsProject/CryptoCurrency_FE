import {Component, OnInit} from '@angular/core';
import {Observable, take, tap} from "rxjs";
import {CryptoDTO} from "../models/CryptoDTO";
import {CryptoCurrencyService} from "../services/crypto-currency.service";
import {UserDTO} from "../models/UserDTO";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-panel-page',
  standalone: false,
  template: `
    <div class="user__panel">
      <div class="user__panel__info">
        <app-user-info class="user__panel__info--data"></app-user-info>
      </div>
      <div class="user__panel__market">
        <div *ngFor="let crypto of cryptos$ | async" class="user__panel__market--item">
          <div class="chart">
            <app-chart [crypto]="crypto"></app-chart>
          </div>
          
          <div class="crypto__info__container">
            <app-action [cryptoSymbol]="crypto.Symbol" (newCryptoAmount)="updateCryptoAmount(crypto.Symbol, $event)" class="action__container"></app-action>
          
            <div *ngIf="user$ | async as user">
                <p>Owned: {{ getOwnedAmount(user, crypto.Symbol) }} {{ crypto.Symbol }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .crypto__info__container {
      margin-top: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
    }

    .crypto__info__container p {
      font-weight: bold;
      font-size: larger;
      padding: 2rem;
    }

    .user__panel {
      display: flex;
    }

    .user__panel__market {
      flex: 3;
      padding: 3rem 10rem 3rem 3rem;
      background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_640.jpg");
    }

    .user__panel__market--item {
      background-color: white;
      color: black;
      padding: 1.5rem;
      box-shadow: 0 0 5px black;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      margin-top: 4rem;
    }

    .user__panel__info {
      position: relative;
      flex: 1;
      top: 0;
      left: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .user__panel__info--data {
      position: fixed;
      top: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .action__container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly
    }

    @media (min-width: 768px) {
      .user__panel__market {
        background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_1280.jpg");
        background-size: cover;
        background-position: center;
      }
    }

    @media (min-width: 1200px) {
      .user__panel__market {
        background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_1920.jpg");
      }
    }

    @media (max-width: 992px) {
      .user__panel__market--item {
        flex-direction: column;
      }

      .user__panel__market {
        padding: 3rem 10rem;
      }

      .user__panel__info--data {
        position: relative;
      }
      
      .user__panel {
        flex-direction: column;
      }
    }
    
    @media(max-width: 768px) {
      .crypto__info__container {
        flex-direction: column;
      }
    }
  `
})
export class UserPanelPageComponent implements OnInit {
  cryptos$: Observable<CryptoDTO[]>;
  user$: Observable<UserDTO | null>;

  constructor(private cryptoService: CryptoCurrencyService, private userService: UserService) {
    this.cryptos$ = this.cryptoService.cryptos$;
    this.user$ = this.userService.user$;
  }

  ngOnInit() {
    this.cryptoService.load();
  }

  protected getOwnedAmount(user: UserDTO, cryptoSymbol: string): number {
    const walletItem = user.Wallet.find(item => item.CryptoSymbol === cryptoSymbol);
    return walletItem ? walletItem.Amount : 0;
  }

  protected updateCryptoAmount(cryptoSymbol: string, newAmount: number) {
    this.user$.pipe(
        take(1),
        tap(user => {
          if (user) {
            const walletItem = user.Wallet.find(item => item.CryptoSymbol === cryptoSymbol);

            if (walletItem) {
              walletItem.Amount = newAmount;
            } else {
              user.Wallet.push({
                CryptoSymbol: cryptoSymbol,
                Amount: newAmount
              });
            }
          } else {
            console.warn('User not found.');
          }
        })
    ).subscribe();
  }
}