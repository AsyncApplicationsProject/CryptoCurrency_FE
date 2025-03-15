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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {NgOptimizedImage} from "@angular/common";

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        EmailValidator,
        FirstLetterValidator,
        PasswordValidator,
        HttpClientModule,
        NgOptimizedImage
    ],
  providers: [CryptoCurrencyService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
