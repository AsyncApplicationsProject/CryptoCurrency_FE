import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserPanelPageComponent} from "./user-panel-page/user-panel-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {canActivateGuard} from "./Guards/can-activate.guard";

let routes: Routes;
routes = [
  {path: "", component: MainPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegisterPageComponent},
  {path: "dashboard", component: UserPanelPageComponent, canActivate: [canActivateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
