import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { MUAY_THAI } from '../../core/disciplines.data';
import { whatsappUrl } from '../../core/contact.util';

@Component({
  standalone: true,
  selector: 'app-muay-thai-page',
  templateUrl: './muay-thai.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuayThaiPage {
  readonly discipline = MUAY_THAI;
  readonly contactUrl = whatsappUrl(this.discipline.contact, this.discipline.name);
  readonly menuOpen = signal(false);

  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Muay Thai en Tandil con Thai Kombat y Miguel Badone. Consultá los horarios de diciembre y contactá al instructor.',
    });
  }

  toggleMenu(): void { this.menuOpen.update((open) => !open); }
  closeMenu(): void { this.menuOpen.set(false); }

  scrollToSection(id: 'disciplina' | 'instructor', event: Event): void {
    event.preventDefault();
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
