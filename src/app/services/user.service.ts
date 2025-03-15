import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {UserDTO} from "../models/UserDTO";
import {catchError, map, throwError} from "rxjs";
import {UserCryptoDTO} from "../models/UserCryptoDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://localhost:7072/api/user';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getUserData() {
        const token = this.authService.getToken();
        if (!token) {
            console.error('No token found');
            return throwError(() => new Error('No token found'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<any>(this.apiUrl, { headers })
            .pipe(
                map(response => {
                    if (typeof response === 'string') {
                        throw new Error('API returned string instead of JSON');
                    }

                    return new UserDTO(
                        response.email,
                        response.firstName,
                        response.lastName,
                        response.balance,
                        response.wallet
                            ? response.wallet.map((item: any) =>
                                new UserCryptoDTO(item.id, item.userId, item.cryptoSymbol, item.amount)
                            )
                            : []
                    );
                }),
                catchError(error => {
                    console.error('Error fetching user data:', error);
                    return throwError(() => new Error('Error fetching user data'));
                })
            );
    }
}
