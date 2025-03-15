import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../models/UserDTO";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-panel-page',
  standalone: false,
  template: `
    <div class="user__panel">
      <div class="user__panel__info">
        <div class="img-container"></div>
        <p>{{ user?.FirstName }} {{ user?.LastName }}</p>
        <p>{{ user?.Email }}</p>
        <p>Balance: {{ user?.Balance }} $</p>
        <p>Profit:  $</p>
      </div>
      <div class="user__panel__market">
        <div class="user__panel__market--item">
          <div class="chart">
            
          </div>
          <div class="action__container">
            <div class="action__container-item">
                <button type="button" class="success">BUY</button>
                <input type="number" min="0" placeholder="0">
            </div>
            <div class="action__container-item">
                <button type="button" class="danger">SELL</button>
                <input type="number" min="0" placeholder="0">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .user__panel {
      display: flex;
    }

    .user__panel__info {
      position: sticky;
      flex: 1;
      top: 0;
      left: 0;
      height: 100vh;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .user__panel__info p {
      padding-top: 2rem;
    }

    .user__panel__market {
      flex: 3;
      padding: 3rem 10rem 3rem 3rem;
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

    .user__panel__market {
      background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_640.jpg");
    }

    .user__panel__market--item {
      background-color: white;
      color: black;
      padding: 1.5rem;
      box-shadow: 0 0 5px black;
      border-radius: 8px;
    }

    .action__container {
      display: flex;
      flex-direction: column;
    }

    .action__container-item {
      display: flex;
      padding: 0.5rem;
    }

    .action__container-item button {
      padding: 1rem 2rem;
      margin-right: 1rem;
      min-width: 12rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s, opacity 0.3s;
      font-size: 2rem;
    }

    .action__container-item input {
      border-radius: 8px;
      background-color: #ccc;
      border: solid 1px #aaa;
      font-size: 2rem;
    }

    .action__container-item button.danger:active {
      transform: scale(0.97);
      background-color: #2c0b0e;
    }
    
    .action__container-item button.success:active {
      transform: scale(0.97);
      background-color: #051b11;
    }

    .success {
      background-color: rgb(25 135 84);
    }
    
    .danger {
      background-color: rgb(220 53 69);
    }

    .action__container-item input {
      padding: 0.5rem 1rem;
      max-width: 10rem;
    }

    @media (min-width: 768px) {
      .user__panel__market {
        background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_1280.jpg");
        background-size: cover;
        background-position: center;
      }
    }

    @media (min-width: 1200px) {
      .user__panel__market {
        background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_1920.jpg");
      }
    }

    @media (max-width: 768px) {
      .user__panel {
        flex-direction: column;
      }
    }
  `
})
export class UserPanelPageComponent implements OnInit {
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
