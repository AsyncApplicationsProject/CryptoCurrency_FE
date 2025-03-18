import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-offer',
  standalone: false,
  template: `
    <section>
        <p class="section__description">Zanurz się w świecie kryptowalut z Invest Smart — Twoim osobistym asystentem do monitorowania rynków, analizowania trendów i podejmowania świadomych decyzji inwestycyjnych. Nasza platforma oferuje dostęp do aktualnych danych i dynamicznych wykresów, które pomogą Ci być zawsze o krok przed rynkiem.</p>
        <div class="offer">
          <div class="offer__section">
            <div class="offer--item">
                <img src="/icons/chart-line-solid.svg" alt="line chart icon"/>
                <b>Śledzenie w czasie rzeczywistym</b>
                <p>Monitoruj zmiany kursów na bieżąco dzięki aktualizacjom przez SignalR</p>
            </div>
            <div class="offer--item">
                <img src="/icons/chart-pie-solid.svg" alt="pie char icon"/>
                <b>Interaktywne wykresy</b>
                <p>Analizuj trendy za pomocą intuicyjnych i dynamicznych wykresów</p>
            </div>
          </div>
          <div class="offer__section">
            <div class="offer--item">
                <img src="/icons/bolt-solid.svg" alt="bolt icon"/>
                <b>Szybkie transakcje</b>
                <p>Kupuj i sprzedawaj kryptowaluty w mgnieniu oka</p>
            </div>
            <div class="offer--item">
                <img src="/icons/wallet-solid.svg" alt="wallet icon"/>
                <b>Planuj finanse</b>
                <p>Zarządzaj swoim wirtualnym portfelem</p>
            </div>
          </div>
        </div>
    </section>
  `,
  styles: `
    .section__description {
      font-size: 2rem;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    section p {
      padding: 3rem;
      text-align: center;
    }

    section b {
      padding: 1rem;
      text-align: center;
    }

    .offer {
      display: flex;
      flex-direction: column;
    }

    .offer--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-top: 5rem;
    }
    
    .offer__section {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .offer--item p {
      padding: 1rem 3rem;
    }

    .offer--item img {
      width: 10vw;
    }

    @media (min-width: 768px) {
        .offer__section {
          flex-direction: row;
        }
    }

    @media (min-width: 1200px) {
      .offer {
        flex-direction: row;
      }
    }
  `
})
export class OfferComponent { }
