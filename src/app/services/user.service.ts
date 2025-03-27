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
}
