import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../models/UserDTO";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-info',
  standalone: false,
  template: `
      <div class="img-container"></div>
      <p>{{ user?.FirstName }} {{ user?.LastName }}</p>
      <p>{{ user?.Email }}</p>
      <p>Balance: {{ user?.Balance }} $</p>
  `,
  styles: `
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
    }`
})
export class UserInfoComponent implements OnInit {
  user: UserDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });
  }
}
