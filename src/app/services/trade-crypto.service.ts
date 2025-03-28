import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { UserDTO } from '../models/UserDTO';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root',
})
export class TradeCryptoService {
    private hubConnection: signalR.HubConnection;
    private user$: Observable<UserDTO | null>;

    constructor(private authService: AuthService, private userService: UserService) {
        this.user$ = userService.user$;

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
        this.hubConnection.on('TradeResponse', (tradeResult: { isSuccess: boolean, message: string, userBalance: number | null, cryptoSymbol: string | null, cryptoAmount: number | null }) => {
            if(tradeResult) {
                if(tradeResult.isSuccess) {
                    console.log(`Trade Successful: ${tradeResult.message}`);
                    this.userService.updateUserBalance(tradeResult.userBalance);
                    this.userService.updateUserWallet(tradeResult.cryptoSymbol, tradeResult.cryptoAmount);
                }
                else {
                    console.error(`Trade failed: ${tradeResult.message}`);
                }
            }
            else {
                console.error('Received null or invalid trade result from server.');
            }
        });
    }

    private executeTrade(
        action: 'Buy' | 'Sell',
        symbol: string,
        amount: number,
    ) {
        const token = this.authService.getToken();
        if (!token) {
            console.error('Token not found');
            return;
        }

        this.user$.pipe(take(1)).subscribe((userData) => {
            if (!userData) {
                console.warn('User not found');
                return;
            }

            this.hubConnection
                .invoke(action, symbol, amount )
                .then(() => {
                    console.log(`Invoked ${action}`);
                    // this.updateUserWallet(userData, symbol, amount, action === 'Buy');
                })
                .catch((err) => console.log(`${action} failed:`, err));
        });
    }

    Buy(symbol: string, amount: number) {
        this.executeTrade('Buy', symbol, amount);
    }

    Sell(symbol: string, amount: number) {
        this.executeTrade('Sell', symbol, amount);
    }

    // private updateUserWallet(userData: UserDTO, symbol: string, amount: number, isBuy: boolean) {
    //     const walletItem = userData.Wallet.find((item) => item.CryptoSymbol === symbol);
    //     if (isBuy) {
    //         if (walletItem) {
    //             walletItem.Amount += amount;
    //         } else {
    //             userData.Wallet.push({ CryptoSymbol: symbol, Amount: amount });
    //         }
    //     } else {
    //         if (walletItem) {
    //             walletItem.Amount -= amount;
    //             if (walletItem.Amount <= 0) {
    //                 userData.Wallet = userData.Wallet.filter((item) => item.CryptoSymbol !== symbol);
    //             }
    //         } else {
    //             console.warn(`User does not own any ${symbol}`);
    //         }
    //     }
    // }

    Stop() {
        this.hubConnection?.stop();
    }
}