import { Component } from '@angular/core';
import {UserLoginDTO} from "../models/UserLoginDTO";
import {UserRegisterDTO} from "../models/UserRegisterDTO";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  standalone: false,
  template: `
    <div class="header">
      <form (ngSubmit)="submit(form)" #form=ngForm>
          <div>
            <input required firstLetterValidator type="text" placeholder="First name" [class.ng-invalid]="!firstName.control.valid && firstName.control.dirty" [class.valid]="firstName.control.valid && firstName.control.dirty" [(ngModel)]="user.firstName" name="firstName" id="firstName" #firstName="ngModel">
            @if (firstName.control.hasError('required') && firstName.control.dirty) {
              <span class="validation__notification">This field is required</span>
            }
            @if (firstName.control.hasError('FirstLetterValidator') && firstName.control.dirty) {
              <span class="validation__notification">The first letter must be capitalized</span>
            }
          </div>
          <div>
            <input required firstLetterValidator type="text" placeholder="Last name" [class.ng-invalid]="!lastName.control.valid && lastName.control.dirty" [class.valid]="lastName.control.valid && lastName.control.dirty" [(ngModel)]="user.lastName" name="lastName" id="lastName" #lastName="ngModel">
            @if (lastName.control.hasError('required') && lastName.control.dirty) {
              <span class="validation__notification">This field is required</span>
            }
            @if (lastName.control.hasError('FirstLetterValidator') && lastName.control.dirty) {
              <span class="validation__notification">The first letter must be capitalized</span>
            }
          </div>
          <div>
            <input required minlength="9" maxlength="9" type="text" placeholder="Phone number" [class.ng-invalid]="(!phoneNumber.control.valid && phoneNumber.control.dirty)  || this.serverResponse" [class.valid]="(phoneNumber.control.valid && phoneNumber.control.dirty) && !this.serverResponse" [(ngModel)]="user.phoneNumber" name="phoneNumber" id="phoneNumber" #phoneNumber="ngModel">
            @if (phoneNumber.control.hasError('required') && phoneNumber.control.dirty) {
              <span class="validation__notification">This field is required</span>
            }
            @if (phoneNumber.control.hasError('minlength') && phoneNumber.control.dirty) {
              <span class="validation__notification">This is not a phone number</span>
            }
          </div>
        <div>
          <input required emailValidator type="text" placeholder="E-mail" [class.ng-invalid]="(!email.control.valid && email.control.dirty)  || this.serverResponse" [class.valid]="(email.control.valid && email.control.dirty) && !this.serverResponse" [(ngModel)]="user.email" name="email" id="email" #email="ngModel">
          @if (email.control.hasError('required') && email.control.dirty) {
            <span class="validation__notification">This field is required</span>
          }
          @if (email.control.hasError('EmailValidator') && email.control.dirty) {
            <span class="validation__notification">This is not an e-mail</span>
          }
        </div>
        <div>
          <input required passwordValidator type="password" placeholder="Password" [class.ng-invalid]="!password.control.valid && password.control.dirty" [class.valid]="password.control.valid && password.control.dirty" [(ngModel)]="user.password" name="password" id="password" #password="ngModel">
          @if (password.control.hasError('required') && password.control.dirty) {
            <span class="validation__notification">This field is required</span>
          }
          @if (password.control.hasError('PasswordValidator') && password.control.dirty) {
            <span class="validation__notification">Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a digit, and a special character.</span>
          }
        </div>
        <div>
          <button type="submit" [disabled]="!form.valid">Register</button>
        </div>
        @if (errorMessage) {
          <div>
            <span class="server_response">{{ errorMessage }}</span>
          </div>
        }
        @if (registerResult) {
          <div>
            <span class="server_result">Registered successfully!</span>
          </div>
        }
      </form>
    </div>
  `,
  styles: ``
})
export class RegisterPageComponent {
  protected user: UserRegisterDTO = new UserRegisterDTO("", "", "", "", "")
  protected errorMessage: string | null = null
  protected serverResponse: boolean = false;
  protected registerResult: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    if (form.valid) {
      this.authService.register(this.user.firstName, this.user.lastName, this.user.phoneNumber, this.user.email, this.user.password).subscribe({
        next: () => {
          this.serverResponse = false;
          this.registerResult = true;
          setTimeout(() => {this.router.navigate(['/login'])}, 3000)
        },
        error: (error) => {
          this.errorMessage = error.error.message
          this.serverResponse = true;
        }
      });
    }
  }
}
