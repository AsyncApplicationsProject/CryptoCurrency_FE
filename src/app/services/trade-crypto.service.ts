import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { Observable, take } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class TradeCryptoService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7072/tradeHub')
        .configureLogging(signalR.LogLevel.Information)
        .build();

    this.hubConnection
        .start()
        .then(() => console.log('SignalR Connected'))
        .catch((err) => console.error('Error connecting to SignalR:', err));
  }

  Buy(symbol: string, amount: number, user: Observable<UserDTO | null>, token: string | null) {
    if (token) {
      user.pipe(take(1)).subscribe((userData) => {
        if (userData) {
          this.hubConnection
              .invoke('Buy', { symbol, amount, token })
              .then(() => {
                console.log(`Bought ${amount} of ${symbol}`);

                const walletItem = userData.Wallet.find(item => item.CryptoSymbol === symbol);
                if (walletItem) {
                  walletItem.Amount += amount;
                } else {
                  userData.Wallet.push({ CryptoSymbol: symbol, Amount: amount });
                }
              })
              .catch((err) => console.error('Buy failed:', err));
        } else {
          console.warn('User not found');
        }
      });
    } else {
      console.error('Token not found');
    }
  }


  Sell(symbol: string, amount: number, user: Observable<UserDTO | null>, token: string | null) {
    if (token) {
      user.pipe(take(1)).subscribe((userData) => {
        if (userData) {
          this.hubConnection
              .invoke('Sell', { symbol, amount, token })
              .then(() => {
                console.log(`Sold ${amount} of ${symbol}`);

                const walletItem = userData.Wallet.find(item => item.CryptoSymbol === symbol);
                if (walletItem) {
                  walletItem.Amount -= amount;
                  if (walletItem.Amount <= 0) {
                    userData.Wallet = userData.Wallet.filter(item => item.CryptoSymbol !== symbol);
                  }
                } else {
                  console.warn(`User does not own any ${symbol}`);
                }
              })
              .catch((err) => console.error('Sell failed:', err));
        } else {
          console.warn('User not found');
        }
      });
    } else {
      console.error('Token not found');
    }
  }
}
