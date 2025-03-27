import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { UserDTO } from '../models/UserDTO';

@Injectable({
    providedIn: 'root',
})
export class TradeCryptoService {
    private hubConnection: signalR.HubConnection;

    constructor(private authService: AuthService) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7072/tradeHub', {
                accessTokenFactory: () => this.authService.getToken() ?? '',
                transport: signalR.HttpTransportType.LongPolling,
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        this.startConnection();
        this.registerOnTradeResponse();
    }

    private startConnection() {
        this.hubConnection
            .start()
            .then(() => console.log('SignalR Connected'))
            .catch((err) => console.error('Error connecting to SignalR:', err));
    }

    private registerOnTradeResponse() {
        this.hubConnection.on('TradeResponse', (message: string) => {
            console.log('Received trade response:', message);
        });
    }

    private executeTrade(
        action: 'Buy' | 'Sell',
        symbol: string,
        amount: number,
        user: Observable<UserDTO | null>
    ) {
        const token = this.authService.getToken();
        if (!token) {
            console.error('Token not found');
            return;
        }

        user.pipe(take(1)).subscribe((userData) => {
            if (!userData) {
                console.warn('User not found');
                return;
            }

            this.hubConnection
                .invoke(action, symbol, amount )
                .then(() => {
                    console.log(`${action} ${amount} of ${symbol}`);
                    this.updateUserWallet(userData, symbol, amount, action === 'Buy');
                })
                .catch((err) => console.error(`${action} failed:`, err));
        });
    }

    Buy(symbol: string, amount: number, user: Observable<UserDTO | null>) {
        this.executeTrade('Buy', symbol, amount, user);
    }

    Sell(symbol: string, amount: number, user: Observable<UserDTO | null>) {
        this.executeTrade('Sell', symbol, amount, user);
    }

    private updateUserWallet(userData: UserDTO, symbol: string, amount: number, isBuy: boolean) {
        const walletItem = userData.Wallet.find((item) => item.CryptoSymbol === symbol);
        if (isBuy) {
            if (walletItem) {
                walletItem.Amount += amount;
            } else {
                userData.Wallet.push({ CryptoSymbol: symbol, Amount: amount });
            }
        } else {
            if (walletItem) {
                walletItem.Amount -= amount;
                if (walletItem.Amount <= 0) {
                    userData.Wallet = userData.Wallet.filter((item) => item.CryptoSymbol !== symbol);
                }
            } else {
                console.warn(`User does not own any ${symbol}`);
            }
        }
    }

    Stop() {
        this.hubConnection?.stop();
    }
}