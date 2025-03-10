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
          <input required emailValidator type="text" placeholder="E-mail" class="form-control" [class.ng-invalid]="!email.control.valid && email.control.dirty" [class.valid]="email.control.valid && email.control.dirty" [(ngModel)]="user.email" name="email" id="email" #email="ngModel">
          @if (email.errors?.['required'] && email.control.dirty) {
              <span class="validation__notification">This field is required</span>
          }
          @if (email.errors?.['EmailValidator'] && email.control.dirty) {
            <span class="validation__notification">This is not an e-mail</span>
          }
        </div>
        <div>
          <input required type="password" placeholder="Password" class="form-control" [class.ng-invalid]="!password.control.valid && password.control.dirty" [class.valid]="password.control.valid && password.control.dirty" [(ngModel)]="user.password" name="password" id="password" #password="ngModel">
          @if (password.errors?.['required'] && password.control.dirty) {
            <span class="validation__notification">This field is required</span>
          }
        </div>
        <div>
          <button type="submit" [disabled]="!form.valid">Login</button>
        </div>
      </form>
    </div>
  `,
  styles: `
  `
})
export class LoginPageComponent {
  protected user: UserLoginDTO = new UserLoginDTO("", "")

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm) {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => console.error('Błąd logowania', error)
    });
  }
}
