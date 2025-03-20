import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-action',
  standalone: false,
  template: `
    <div class="action__container--box">
        <div class="action__container-item">
            <button type="button" class="success">BUY</button>
            <input type="number" min="0" placeholder="0">
        </div>
        <div class="action__container-item">
            <button type="button" class="danger">SELL</button>
            <input type="number" min="0" placeholder="0">
        </div>
    </div>
  `,
  styles: `
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
    
    .action__container-item button.danger:active {
      transform: scale(0.97);
      background-color: #2c0b0e;
    }

    .action__container-item button.success:active {
      transform: scale(0.97);
      background-color: #051b11;
    }

    .action__container-item input {
      border-radius: 8px;
      background-color: #ccc;
      border: solid 1px #aaa;
      font-size: 2rem;
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

    .action__container-item {
      display: flex;
      padding: 0.5rem;
    }
  `
})
export class ActionComponent {
}
