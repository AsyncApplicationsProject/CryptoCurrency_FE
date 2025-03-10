import { Component } from '@angular/core';

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
export class AppComponent {
  title = 'CryptoCurrency';
}
