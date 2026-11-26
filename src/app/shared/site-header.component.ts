import { ChangeDetectionStrategy, Component, isDevMode, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DISCIPLINES } from '../core/disciplines.data';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './site-header.component.css',
  template: `
    <header class="home-header">
      <div class="page-container header-content">
        <a class="miguel-logo" routerLink="/" aria-label="Miguel Badone Combat Team, inicio">
          <img src="assets/imagenes/logo4.jpeg" alt="Miguel Badone Combat Team" />
        </a>
        @if (isDevelopment) {
          <span class="dev-version" [attr.title]="'Sesión de esta página iniciada a las ' + devSessionTime">DEV <b>v{{ appVersion }}</b><time>{{ devSessionTime }}</time></span>
        }
        <button class="menu-toggle" type="button" [attr.aria-expanded]="menuOpen()" aria-controls="main-navigation"
          [attr.aria-label]="menuOpen() ? 'Cerrar navegación' : 'Abrir navegación'" (click)="toggleMenu()">
          <span aria-hidden="true">{{ menuOpen() ? '×' : '☰' }}</span>
        </button>
        <nav id="main-navigation" class="main-navigation" [class.open]="menuOpen()" aria-label="Navegación principal">
          <a routerLink="/" fragment="inicio" (click)="closeMenu()">Inicio</a>
          <div class="discipline-menu" [class.hover-open]="disciplineHover()" [class.open]="disciplineOpen()" (mouseenter)="disciplineHover.set(true)" (mouseleave)="disciplineHover.set(false)">
            <button class="discipline-trigger" type="button" [attr.aria-expanded]="disciplineHover() || disciplineOpen()" aria-controls="discipline-list" (click)="toggleDisciplines()">Disciplinas</button>
            <div id="discipline-list" class="discipline-dropdown">
              @for (discipline of disciplines; track discipline.slug) {
                <a [routerLink]="['/disciplinas', discipline.slug]" (click)="closeMenu()">
                  <span class="dropdown-dot" [style.background]="discipline.accent"></span>
                  <span>{{ discipline.name }}<small>{{ discipline.academy }}</small></span>
                </a>
              }
            </div>
          </div>
          <a routerLink="/" fragment="horarios" (click)="closeMenu()">Horarios</a>
          <a routerLink="/articulos" (click)="closeMenu()">Artículos</a>
          <a routerLink="/eventos" (click)="closeMenu()">Eventos</a>
          <a routerLink="/vlog" (click)="closeMenu()">Vlog</a>
          <a routerLink="/" fragment="ubicacion" (click)="closeMenu()">Ubicación</a>
          <a class="header-cta" routerLink="/" fragment="disciplinas" (click)="closeMenu()">EMPEZÁ A ENTRENAR <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  readonly disciplines = DISCIPLINES;
  readonly menuOpen = signal(false);
  readonly isDevelopment = isDevMode();
  readonly appVersion = '0.1.0';
  readonly devSessionTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  readonly disciplineHover = signal(false);
  readonly disciplineOpen = signal(false);

  toggleMenu(): void { this.menuOpen.update((open) => !open); }
  toggleDisciplines(): void { this.disciplineOpen.update((open) => !open); }
  closeMenu(): void { this.menuOpen.set(false); this.disciplineOpen.set(false); this.disciplineHover.set(false); }
}
