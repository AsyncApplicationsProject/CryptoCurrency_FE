import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav',
  standalone: false,
  template: `
    <button class="burger-btn" (click)="handleNav()">
      <div class="burger-btn__box">
        <div class="burger-btn__bars" #navBtnBars></div>
      </div>
    </button>

    <nav class="nav" #nav>
      <div class="nav__items">
        <a [routerLink]="['/']" fragment="home" class="nav__item" (click)="closeNav()">Home</a>
        <a [routerLink]="['/']" fragment="offer" class="nav__item" (click)="closeNav()">Offer</a>
        <a [routerLink]="['']" class="nav__item" (click)="closeNav()">Contact</a>
        <a *ngIf="isLoggedIn$ | async; else loggedOut" [routerLink]="['/dashboard']" class="nav__item" style="margin-top: 4rem;" (click)="closeNav()">My Account</a>
        <a *ngIf="isLoggedIn$ | async" [routerLink]="['/']" class="nav__item" (click)="logout()">Logout</a>
        <ng-template #loggedOut>
          <a [routerLink]="['/login']" class="nav__item" style="margin-top: 4rem;" (click)="closeNav()">Login</a>
          <a [routerLink]="['/register']" class="nav__item" (click)="closeNav()">Register</a>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .burger-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1em;
      background: none;
      border: 1px solid transparent;
      cursor: pointer;
      z-index: 1000;
    }

    .burger-btn:focus {
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 8px;
    }

    .burger-btn:hover .burger-btn__bars::after,
    .burger-btn:hover .burger-btn__bars::before {
      width: 100%;
    }

    .burger-btn__box {
      position: relative;
      width: 40px;
      height: 30px;
    }

    .burger-btn__bars, .burger-btn__bars::after, .burger-btn__bars::before {
      position: absolute;
      right: 0;
      height: 3px;
      content: "";
      background-color: #fff;
      transition: width 0.3s;
    }

    .burger-btn__bars {
      width: 100%;
    }

    .burger-btn__bars::after {
      top: 13px;
      width: 60%;
    }

    .burger-btn__bars::before {
      top: 27px;
      width: 30%;
      transition-delay: 0.1s;
    }

    .nav {
      position: fixed;
      top: 0;
      height: 100vh;
      width: 100%;
      background-image: linear-gradient(45deg, black, #857941);
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateX(100%);
      transition: 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    .nav--active {
      transform: translateX(0);
    }

    .nav__item {
      position: relative;
      display: block;
      color: #fff;
      margin: 0.3em;
      padding: 0.5em 2em;
      font-size: 3.8rem;
      text-decoration: none;
    }

    .nav__item::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background-color: #fff;
      content: "";
      transform: scaleY(0);
      transition: transform 0.3s;
    }

    .nav__item:hover::before {
      transform: scaleY(1);
    }

    @keyframes navItemsAnimation {
      from {
        transform: translateX(200%);
      }
      to {
        transform: translateX(0);
      }
    }

    .nav-items-animation {
      animation: navItemsAnimation 1s both;
    }

    .black-bars-color,
    .black-bars-color::after,
    .black-bars-color::before {
      background-color: #2e2e2e;
    }

    @media (max-height: 630px) {
      .nav {
        align-items: flex-end;
      }
    }
  `]
})

export class NavComponent implements OnInit {
  protected isLoggedIn$ :Observable<boolean>;

  private nav: HTMLElement | null = null;
  private navBtnBars: HTMLElement | null = null;
  private allNavItems: NodeListOf<Element> | null = null;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.closeNav();
    this.authService.logout();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nav = document.querySelector('.nav');
      this.navBtnBars = document.querySelector('.burger-btn__bars');
      this.allNavItems = document.querySelectorAll('.nav__item');
    });
  }

  handleNav(): void {
    this.nav = document.querySelector('.nav');
    this.navBtnBars = document.querySelector('.burger-btn__bars');
    this.allNavItems = document.querySelectorAll('.nav__item');

    if (this.nav && this.navBtnBars) {
      this.nav.classList.toggle('nav--active');
      this.handleNavItemsAnimation();
    }
  }

  closeNav(): void {
    if (this.nav) {
      this.nav.classList.remove('nav--active');
      this.allNavItems?.forEach(item => {
        item.classList.remove('nav-items-animation');
      })
    }
  }

  handleNavItemsAnimation(): void {
    if (this.allNavItems) {
      let delayTime = 0;
      if(this.nav?.classList.contains('nav--active')) {
        this.allNavItems.forEach(item => {
          item.classList.add('nav-items-animation');
          (item as HTMLElement).style.animationDelay = '.' + delayTime + 's';
          delayTime++;
        });
      }
      else {
        this.allNavItems.forEach(item => {
          item.classList.remove('nav-items-animation');
        })
      }
    }
  }
}