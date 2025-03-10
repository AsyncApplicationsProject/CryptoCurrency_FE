import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7072/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      });

      const body = JSON.stringify({ email, password });

      return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
          tap(response => {
              if (response && response.token) {
                  localStorage.setItem('token', response.token);
                  this.saveUserNameFromToken(response.token);
                  console.log('Zalogowano pomyślnie!');
              } else {
                  console.warn('Brak tokena w odpowiedzi serwera.');
              }
          }),
          catchError(error => {
              console.error('Błąd logowania:', error);
              return throwError(() => error);
          })
      );
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
  }

  getToken(): string | null {
      return localStorage.getItem('token');
  }

  getUserName(): string | null {
      return localStorage.getItem('userName');
  }

    jwt_decode(token: string): any | null {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                console.error("Niepoprawny format tokena JWT.");
                return null;
            }

            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = decodeURIComponent(atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''));

            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error("Błąd podczas dekodowania tokena JWT:", error);
            return null;
        }
    }

    saveUserNameFromToken(token: string): void {
        const decoded = this.jwt_decode(token);
        if (decoded) {
            const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.userName || decoded.name;

            if (userName) {
                localStorage.setItem("userName", userName);
                console.log("Zapisano userName w LocalStorage:", userName);
            } else {
                console.warn("Nie znaleziono userName w tokenie JWT.");
            }
        } else {
            console.error("Nie udało się zdekodować tokena.");
        }
    }
}

