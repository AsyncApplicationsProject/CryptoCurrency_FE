import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <app-nav/>
    </nav>
    <router-outlet />
  `,
  standalone: false,
  styles: ``
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'CryptoCurrency';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    window.addEventListener('beforeunload', this.logoutOnUnload);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.logoutOnUnload);
  }

  logoutOnUnload(event: BeforeUnloadEvent) {
    this.authService.logout();
  }
}
