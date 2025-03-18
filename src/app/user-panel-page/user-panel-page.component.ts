import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-panel-page',
  standalone: false,
  template: `
    <div class="user__panel">
      <app-user-info class="user__panel__info"></app-user-info>
      <div class="user__panel__market">
        <div class="user__panel__market--item">
          <div class="chart">
            <app-chart></app-chart>
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

    .user__panel__market {
      flex: 3;
      padding: 3rem 10rem 3rem 3rem;
      background-image: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../../../public//bitcoin-7071818_640.jpg");
    }
    
    .user__panel__market--item {
      background-color: white;
      color: black;
      padding: 1.5rem;
      box-shadow: 0 0 5px black;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly
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
    
    @media (max-width: 992px) {
      .user__panel__market--item {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .user__panel {
        flex-direction: column;
      }
    }
    
  `
})
export class UserPanelPageComponent { }