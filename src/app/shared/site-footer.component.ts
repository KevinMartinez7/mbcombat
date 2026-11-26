import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DISCIPLINES, MIGUEL_BADONE } from '../core/disciplines.data';
import { whatsappUrl } from '../core/contact.util';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './site-footer.component.css',
  template: `
    <footer class="home-footer">
      <div class="page-container footer-grid">
        <div class="footer-brand">
          <a class="miguel-logo" routerLink="/" aria-label="Miguel Badone Combat Team, inicio">
            <img src="assets/imagenes/logo4.jpeg" alt="Miguel Badone Combat Team" />
          </a>
          <p>Una casa para entrenar y aprender deportes de combate.</p>
          <a class="footer-external" href="https://www.instagram.com/legionteamtandil/" target="_blank" rel="noopener noreferrer">Instagram del equipo ↗</a>
        </div>
        <div class="footer-column"><h2>DISCIPLINAS</h2>
          @for (discipline of disciplines; track discipline.slug) {
            <a [routerLink]="['/disciplinas', discipline.slug]">{{ discipline.academy }} <span>↗</span></a>
          }
        </div>
        <div class="footer-column"><h2>COMUNIDAD</h2>
          <a routerLink="/eventos">Eventos <span>↗</span></a>
          <a routerLink="/vlog">Vlog <span>↗</span></a>
          <a routerLink="/articulos">Equipamiento <span>↗</span></a>
        </div>
        <div class="footer-column"><h2>ENCONTRANOS</h2>
          <p>Paraguay 491<br>Tandil, Buenos Aires<br>Argentina</p>
          <a class="footer-external" href="https://www.google.com/maps/search/?api=1&query=Paraguay+491%2C+Tandil%2C+Buenos+Aires%2C+Argentina" target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a>
        </div>
        <div class="footer-column"><h2>CONTACTO</h2>
          <a [href]="miguelUrl" target="_blank" rel="noopener noreferrer">Miguel · +54 9 2494 38-1035 <span>↗</span></a>
          <p>Muay Thai, MMA, paos y entrenamiento personalizado</p>
        </div>
        <div class="footer-column footer-socials"><h2>SEGUÍ A LAS ACADEMIAS</h2>
          @for (discipline of disciplines; track discipline.slug) {
            @if (discipline.instagramUrl) { <a [href]="discipline.instagramUrl" target="_blank" rel="noopener noreferrer">{{ discipline.academy }} <span>↗</span></a> }
          }
        </div>
      </div>
      <div class="page-container footer-legal"><span>© {{ year }} Miguel Badone Combat Team</span><span>Paraguay 491 · Tandil</span></div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  readonly disciplines = DISCIPLINES;
  readonly year = new Date().getFullYear();
  readonly miguelUrl = whatsappUrl(MIGUEL_BADONE, 'Muay Thai, MMA, entrenamiento con paos y entrenamiento personalizado');
}
