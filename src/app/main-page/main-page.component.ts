import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: false,
  template: `
    <header>
      <app-header id="home"/>
    </header>
    <main>
      <app-offer class="container" id="offer"/>
    </main>
    <footer>
      <app-footer class="container"/>
    </footer>
  `,
  styles: ``
})
export class MainPageComponent {

}
