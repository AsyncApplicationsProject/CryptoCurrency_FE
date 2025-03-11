import { Component } from '@angular/core';
import {UserLoginDTO} from "../models/UserLoginDTO";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: false,
  template: `
    <div class="header">
      <form (ngSubmit)="submit(form)" #form=ngForm>
        <div>
          <input required emailValidator type="text" placeholder="E-mail" class="form-control" [class.ng-invalid]="(!email.control.valid && email.control.dirty) || this.serverResponse" [class.valid]="(email.control.valid && email.control.dirty) && !this.serverResponse" [(ngModel)]="user.email" name="email" id="email" #email="ngModel">
          @if (email.errors?.['required'] && email.control.dirty) {
              <span class="validation__notification">This field is required</span>
          }
          @if (email.errors?.['EmailValidator'] && email.control.dirty) {
            <span class="validation__notification">This is not an e-mail</span>
          }
        </div>
        <div>
          <input required type="password" placeholder="Password" class="form-control" [class.ng-invalid]="(!password.control.valid && password.control.dirty) || this.serverResponse" [class.valid]="(password.control.valid && password.control.dirty) && !this.serverResponse" [(ngModel)]="user.password" name="password" id="password" #password="ngModel">
          @if (password.errors?.['required'] && password.control.dirty) {
            <span class="validation__notification">This field is required</span>
          }
        </div>
        <div>
          <button type="submit" [disabled]="!form.valid">Login</button>
        </div>
        @if (errorMessage) {
          <div>
            <span class="server_response">{{ errorMessage }}</span>
          </div>
        }
      </form>
    </div>
  `,
  styles: `
  `
})
export class LoginPageComponent {
  protected user: UserLoginDTO = new UserLoginDTO("", "")
  protected errorMessage: string | null = null
  protected serverResponse: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: () => {
        this.serverResponse = false;
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.serverResponse = true;
      }
    });
  }
}
