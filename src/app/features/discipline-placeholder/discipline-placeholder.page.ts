import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { DISCIPLINES } from '../../core/disciplines.data';
import { whatsappUrl } from '../../core/contact.util';

@Component({
  selector: 'app-discipline-placeholder-page',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  template: `
    <main class="placeholder-shell" [style.--accent]="discipline()?.accent ?? '#e21929'">
        <a class="placeholder-brand" routerLink="/" aria-label="Volver al inicio de Miguel Badone Combat Team"><span>MIGUEL <span>BADONE</span></span><small>COMBAT TEAM</small></a>
      @if (discipline(); as item) {
        <div class="placeholder-content">
          <p class="placeholder-kicker">{{ item.name }} <span>·</span> {{ item.academy }}</p>
          @if (item.slug === 'paos') {
            <h1>TRABAJO CON<br><em>PAOS.</em></h1>
            <p class="placeholder-description">Sesiones de striking y técnica con paos. Coordiná directamente con {{ item.contact.name }} los días y horarios.</p>
          } @else if (item.slug === 'entrenamiento-personalizado') {
            <h1>PAOS Y TÉCNICA<br><em>A TU MEDIDA.</em></h1>
            <p class="placeholder-description">Entrenamiento personalizado con trabajo de paos. Coordiná directamente con {{ item.contact.name }} los días y horarios.</p>
          } @else {
            <h1>ESTA ACADEMIA<br><em>ESTÁ EN CAMINO.</em></h1>
            <p class="placeholder-description">Pronto vas a poder conocer más sobre {{ item.academy }}. Mientras tanto, consultá directamente con {{ item.contact.name }} por horarios y clases.</p>
          }
          <div class="placeholder-actions">
            <a class="placeholder-button" [href]="contactUrl()" target="_blank" rel="noopener noreferrer">{{ item.slug === 'paos' ? 'CONSULTAR PAOS' : item.slug === 'entrenamiento-personalizado' ? 'CONSULTAR SESIONES' : 'CONSULTAR POR WHATSAPP' }} <span aria-hidden="true">↗</span></a>
            <a class="placeholder-back" routerLink="/">VOLVER AL EQUIPO <span aria-hidden="true">←</span></a>
          </div>
          @if (item.instagramUrl) {
            <a class="placeholder-social" [href]="item.instagramUrl" target="_blank" rel="noopener noreferrer">SEGUÍ A {{ item.academy | uppercase }} EN INSTAGRAM ↗</a>
          }
        </div>
      } @else {
        <div class="placeholder-content"><p class="placeholder-kicker">MIGUEL BADONE COMBAT TEAM</p><h1>DISCIPLINA<br>NO ENCONTRADA.</h1><a class="placeholder-back" routerLink="/">VOLVER AL INICIO ←</a></div>
      }
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#090a0c;color:#f8f8f8;font-family:Arial,system-ui,sans-serif}
    .placeholder-shell{min-height:100vh;position:relative;overflow:hidden;padding:34px max(6vw,24px);display:grid;grid-template-rows:auto 1fr;isolation:isolate}
    .placeholder-shell:before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 80% 60%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 50%),linear-gradient(120deg,#090a0c,#141519)}
    .placeholder-shell:after{content:"";position:absolute;z-index:-1;top:6%;right:6%;height:85%;width:1px;background:linear-gradient(transparent,#ffffff26,transparent)}
    .placeholder-brand{display:flex;flex-direction:column;width:max-content;line-height:.9;text-decoration:none;color:inherit;font-style:italic;font-weight:1000;font-size:28px}.placeholder-brand>span>span{color:var(--accent)}.placeholder-brand small{font-style:normal;font-size:9px;letter-spacing:2.4px;margin-top:5px;color:#aaa}
    .placeholder-content{align-self:center;width:min(760px,100%);padding:60px 0}.placeholder-kicker{font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#c9c9cd}.placeholder-kicker span{color:var(--accent);padding:0 8px}
    h1{font-size:clamp(48px,8vw,94px);line-height:.95;letter-spacing:-.05em;font-style:italic;margin:24px 0}h1 em{color:var(--accent);font-style:inherit}.placeholder-description{max-width:540px;color:#b6b7bd;font-size:17px;line-height:1.75}
    .placeholder-actions{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:34px}.placeholder-button{display:inline-flex;gap:24px;padding:17px 22px;background:var(--accent);color:#fff;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:.6px}.placeholder-back,.placeholder-social{color:#eee;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:1px;border-bottom:1px solid var(--accent);padding-bottom:7px}.placeholder-social{display:inline-block;margin-top:36px;color:#aaa;font-size:10px}
    @media(max-width:540px){.placeholder-shell{padding:24px}.placeholder-content{padding:30px 0}.placeholder-description{font-size:15px}.placeholder-actions{align-items:flex-start;flex-direction:column}}
    @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisciplinePlaceholderPage {
  readonly slug = input<string>('');
  readonly discipline = computed(() => DISCIPLINES.find((item) => item.slug === this.slug()));
  readonly contactUrl = computed(() => {
    const item = this.discipline();
    return item ? whatsappUrl(item.contact, item.name) : '/';
  });
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({ name: 'description', content: 'Conocé las disciplinas de Miguel Badone Combat Team.' });
  }
}
