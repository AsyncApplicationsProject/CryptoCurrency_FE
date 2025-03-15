import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public loggingChange: BehaviorSubject<boolean>
    public isLoggedIn$: Observable<boolean>

    private apiUrl = 'https://localhost:7072/api/auth';

    constructor(private http: HttpClient) {
        this.loggingChange = new BehaviorSubject<boolean>(!!this.getToken());
        this.isLoggedIn$ = this.loggingChange.asObservable();
    }

  login(email: string, password: string) {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      });

      return this.http.post<string>(`${this.apiUrl}/login`, { email, password }, { headers }).pipe(
          tap(response => {
              if (response) {
                  try {
                      localStorage.setItem('token', response);

                      const storedToken = localStorage.getItem('token');

                      if (storedToken) {
                          this.saveUserIdFromToken(storedToken);
                          console.log('You have logged in successfully!');
                      } else {
                          console.warn('Token was not stored correctly.');
                      }
                  } catch (error) {
                      console.error('Error saving token to localStorage:', error);
                  }
              } else {
                  console.warn('Missing token in server response.');
              }
              this.loggingChange.next(true);
          }),
          catchError(error => {
              console.error('Login error: ', error);
              return throwError(() => error);
          })
      );
  }

  register(firstName: string, lastName: string, phoneNumber: string, email: string, password: string) {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      });

      const body = JSON.stringify({ firstName, lastName, phoneNumber, email, password });

      return this.http.post<any>(`${this.apiUrl}/register`, body, { headers }).pipe(
          tap(response => {
              console.log('User registered successfully!', response);
          }),
          catchError(error => {
              console.error('Registration error: ', error);
              return throwError(() => error);
          })
      );
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.loggingChange.next(false);
  }

  getToken(): string | null {
      return localStorage.getItem('token');
  }

    getUserId(): string | null {
        return localStorage.getItem('userId');
    }

  jwt_decode(token: string): any | null {
      try {
          const parts = token.split('.');
          if (parts.length !== 3) {
              console.error("Incorrect JWT format");
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
          console.error("Error decoding JWT token", error);
          return null;
      }
  }

  saveUserIdFromToken(token: string): void {
      const decoded = this.jwt_decode(token);
      if (decoded) {
          const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.userId;

          if (userId) {
              localStorage.setItem("userId", userId);
              console.log("Saved userId in LocalStorage:", userId);
          } else {
              console.warn("userId not found in JWT.");
          }
      } else {
            console.error("Failed to decode token.");
      }
  }

    // saveUserNameFromToken(token: string): void {
  //     const decoded = this.jwt_decode(token);
  //     if (decoded) {
  //         const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.userName || decoded.name;
  //
  //         if (userName) {
  //             localStorage.setItem("userName", userName);
  //             console.log("Saved userName in LocalStorage:", userName);
  //         } else {
  //             console.warn("userName not found into JWT.");
  //         }
  //     } else {
  //         console.error("Failed to decode token.");
  //     }
  // }
}

