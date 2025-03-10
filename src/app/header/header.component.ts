import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  template: `
    <header class="header section" id="home">
      <h1 class="header__heading">Invest Smart</h1>
      <p class="header__text">
        Unlock the potential of cryptocurrencies with real-time insights and seamless trading
      </p>
      <a href="#offer" id="" class="header__btn btn-special-animation">Let's go</a>
      <div class="white-block white-block-left"></div>
    </header>
  `,
  styles: `
    .header__heading {
      font-family: sans-serif;
      font-size: 6.8rem;
      font-weight: 300;
    }

    .header__text {
      font-size: 2.5rem;
    }

    .header__btn {
      margin-top: 2em;
      padding: 0.8em 1.6em;
      font-size: 1.6rem;
      background: #fff;
      border: none;
      border-radius: 8px;
      color: #2e2e2e;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
    }

    .header__btn::before {
      background-color: #eee;
    }
  `
})
export class HeaderComponent {

}
