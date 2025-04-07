import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UserDTO } from "../models/UserDTO";
import {BehaviorSubject, catchError, map, Observable, take, tap, throwError} from "rxjs";
import { UserCryptoDTO } from "../models/UserCryptoDTO";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiUrl = 'https://localhost:7072/api/user';

    private userChanged = new BehaviorSubject<UserDTO | null>(null);
    user$: Observable<UserDTO | null> = this.userChanged.asObservable();

    constructor(private http: HttpClient, private authService: AuthService) { }

    getUserData(): Observable<UserDTO> {
        const token = this.authService.getToken();
        // console.log(token);
        if (!token) {
            console.error('No token found');
            return throwError(() => new Error('No token found'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<any>(this.apiUrl, { headers }).pipe(
            map(response => {
                if (typeof response === 'string') {
                    throw new Error('API returned string instead of JSON');
                }
                // console.log(response);
                return new UserDTO(
                    response.email,
                    response.firstName,
                    response.lastName,
                    response.balance,
                    response.wallet
                        ? response.wallet.map((item: any) =>
                            new UserCryptoDTO(item.cryptoSymbol, item.amount)
                        )
                        : []
                );
            }),
            tap(user => this.userChanged.next(user)),
            catchError(error => {
                console.error('Error fetching user data:', error);
                return throwError(() => new Error('Error fetching user data'));
            })
        );
    }

    updateUserBalance(newBalance: number | null): void {
        if (newBalance !== null && newBalance !== undefined) {
            const currentUser = this.userChanged.getValue();

            if (currentUser) {
                const updatedUser: UserDTO = {
                    ...currentUser,
                    Balance: newBalance,
                };
                this.userChanged.next(updatedUser);
                console.log('Zaktualizowano balans użytkownika:', updatedUser.Balance);
            } else {
                console.warn('Nie można zaktualizować balansu: brak zalogowanego użytkownika.');
            }
        }
        else {
            console.error('New balance is null')
        }
    }

    updateUserWallet(symbol: string | null, amount: number | null): void {
        if (symbol != null && amount !== null) {
            this.user$.pipe(take(1)).subscribe((user) => {
                if (!user) {
                    console.warn('Cannot update wallet - user not logged in.');
                    return;
                }

                const updatedUser = { ...user };

                const walletItem = updatedUser.Wallet.find(item => item.CryptoSymbol === symbol);

                if (walletItem) {
                    walletItem.Amount = amount;

                    // delete crypto if amount is <= 0
                    if (walletItem.Amount <= 0) {
                        updatedUser.Wallet = updatedUser.Wallet.filter(item => item.CryptoSymbol !== symbol);
                    }
                } else if (amount > 0) {
                    // add crypto if doesn't exist
                    updatedUser.Wallet.push({ CryptoSymbol: symbol, Amount: amount });
                }

                // Emit updated user data
                this.userChanged.next(updatedUser);
                console.log(`User wallet updated: ${symbol} - ${amount}`);
            });
        } else {
            console.error('Amount or Symbol is null');
        }
    }
}
