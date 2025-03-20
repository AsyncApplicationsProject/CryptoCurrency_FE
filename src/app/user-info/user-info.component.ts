import {Component, OnInit} from '@angular/core';
import { UserDTO } from "../models/UserDTO";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-user-info',
  standalone: false,
  template: `
    <div class="img-container"></div>
    <div *ngIf="user$ | async as user" class="info-container">
      <p>{{ user.FirstName }} {{ user.LastName }}</p>
      <p>{{ user.Email }}</p>
      <p>Balance: {{ user.Balance }} $</p>
    </div>
  `,
  styles: `
    .info-container p {
      text-align: center;
    }
    
    p {
      padding-top: 2rem;
    }

    .img-container {
      background-image: url("../../../public/user_avatar.jpg");
      height: 10vh;
      width: 10vh;
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      margin-top: 3rem;
    }
  `
})
export class UserInfoComponent implements OnInit {
  protected user$: Observable<UserDTO | null>;

  constructor(private userService: UserService) {
    this.user$ = userService.user$;
  }

  ngOnInit() {
    this.userService.getUserData().subscribe();
  }
}
