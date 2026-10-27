# CryptoCurrency_FE

Frontend of **Invest Smart**, a cryptocurrency trading simulator built with Angular 19. Users can register, log in, watch live price charts and buy or sell cryptocurrencies. Prices and trades are handled in real time with SignalR.

The backend lives in [CryptoCurrency_BE](https://github.com/AsyncApplicationsProject/CryptoCurrency_BE).

## Features

- **Landing page:** hero section and an overview of the platform's features.
- **Registration** with form validation:
  - e-mail format,
  - first and last name starting with a capital letter,
  - 9-digit phone number,
  - password of at least 8 characters with an uppercase letter, a lowercase letter, a digit and a special character.
- **Login** with a JWT token. The token is stored in `localStorage`.
- **Dashboard** (`/dashboard`, protected by a route guard):
  - the user's details: name, e-mail and balance,
  - a line chart of the price history for each cryptocurrency, refreshed live with every `PriceUpdate` from the server,
  - **BUY / SELL** forms for each cryptocurrency, sent through the `TradeHub` SignalR hub,
  - the amount of each cryptocurrency the user owns. The balance and wallet update after every trade.

## Tech stack

- Angular 19 (module-based components, template-driven forms)
- RxJS
- `@microsoft/signalr` 8
- Chart.js 4 + `ng2-charts` 8

## Routes

| Path | Component | Access |
|---|---|---|
| `/` | `MainPageComponent` | public |
| `/login` | `LoginPageComponent` | public |
| `/register` | `RegisterPageComponent` | public |
| `/dashboard` | `UserPanelPageComponent` | logged-in users only (`canActivateGuard`) |

## Communication with the backend

The backend addresses are hard-coded in the services:

| Service | Address | Purpose |
|---|---|---|
| `services/auth.service.ts` | `https://localhost:7072/api/auth` | registration and login |
| `services/user.service.ts` | `https://localhost:7072/api/user` | logged-in user's data (JWT) |
| `services/crypto-currency.service.ts` | `https://localhost:7072/api/crypto` | list of cryptocurrencies with price history |
| `services/crypto-currency.service.ts` | `https://localhost:7266/priceHistoryHub` | SignalR: the `PriceUpdate` event with new prices |
| `services/trade-crypto.service.ts` | `https://localhost:7072/tradeHub` | SignalR: the `Buy` / `Sell` methods and the `TradeResponse` event (JWT in `accessTokenFactory`) |

Both SignalR connections use the Long Polling transport and reconnect automatically.

## Project structure

```
src/app/
├── action/            # BUY / SELL forms for a single cryptocurrency
├── chart/             # price history chart (standalone, ng2-charts)
├── footer/, header/, nav/, offer/   # landing page and navigation
├── Guards/            # canActivateGuard: protects /dashboard
├── login-page/        # login page
├── register-page/     # registration page
├── main-page/         # landing page
├── models/            # DTO classes (CryptoDTO, PriceHistoryDTO, UserDTO, ...)
├── services/          # AuthService, UserService, CryptoCurrencyService, TradeCryptoService
├── user-info/         # user details panel
├── user-panel-page/   # dashboard: charts + trading
└── Validators/        # email, first-letter and password validators
```

## Requirements

- Node.js in a version supported by Angular 19 (`^18.19.1`, `^20.11.1` or `>=22`) and npm
- Running backend ([CryptoCurrency_BE](https://github.com/AsyncApplicationsProject/CryptoCurrency_BE)). Start **both** applications, `CryptoCurrency.WebAPI` and `CryptoCurrency.WebHostedService`, with the `https` profile.
- A trusted ASP.NET Core development certificate, so the browser accepts `https://localhost`:

  ```bash
  dotnet dev-certs https --trust
  ```

## Running

```bash
npm install
npm start
```

The app is served at `http://localhost:4200/`. Keep this port: the backend's CORS policy only allows this origin.

You can log in with one of the test accounts created by the backend seed, e.g. `user1@example.com` / `Haslo123!` (see the backend README).

## Build

```bash
npm run build
```

The build output goes to `dist/crypto-currency/`.

## Notes

- The user is logged out (the token is removed from `localStorage`) whenever the page is closed or **refreshed**, because of the `beforeunload` handler in `AppComponent`.
- Prices are simulated by the backend. They do not come from a real exchange.
