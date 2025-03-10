import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  template: `
    <p class="footer__bottom-text">
      © <span class="footer__year" #yearParagraph></span> Invest Smart
    </p>
  `,
  styles: `
    .footer__bottom-text {
      padding: 2em;
      text-align: center;
    }`
})
export class FooterComponent implements OnInit {
  @ViewChild('yearParagraph', { static: true }) yearParagraph!: ElementRef<HTMLSpanElement>;

  ngOnInit() {
    this.yearParagraph.nativeElement.textContent = new Date().getFullYear().toString();
  }
}
