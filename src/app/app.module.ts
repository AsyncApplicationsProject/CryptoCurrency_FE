import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { OfferComponent } from './offer/offer.component';
import { FooterComponent } from './footer/footer.component';
import {CryptoCurrencyService} from "./services/crypto-currency.service";
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPanelPageComponent } from './user-panel-page/user-panel-page.component';
import {FormsModule} from "@angular/forms";
import {EmailValidator} from "./Validators/email-validator";
import {FirstLetterValidator} from "./Validators/first-letter-validator";
import {PasswordValidator} from "./Validators/password-validator";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {NgOptimizedImage} from "@angular/common";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {ChartComponent} from "./chart/chart.component";
import { UserInfoComponent } from './user-info/user-info.component';
import { ActionComponent } from './action/action.component';
import {TradeCryptoService} from "./services/trade-crypto.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    OfferComponent,
    FooterComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserPanelPageComponent,
    UserInfoComponent,
    ActionComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        EmailValidator,
        FirstLetterValidator,
        PasswordValidator,
        HttpClientModule,
        NgOptimizedImage,
        ChartComponent
    ],
  providers: [CryptoCurrencyService, AuthService, UserService,  TradeCryptoService, provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
