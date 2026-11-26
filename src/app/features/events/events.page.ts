import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { MIGUEL_BADONE } from '../../core/disciplines.data';
import { whatsappUrl } from '../../core/contact.util';

type EventTab = 'upcoming' | 'past';
type BoutCategory = 'muay-thai' | 'mma';

interface BoutView {
  readonly id: string;
  readonly number: string;
  readonly discipline: string;
  readonly fighterA: string;
  readonly fighterB: string;
  readonly imageA: string;
  readonly imageB: string;
  readonly detail: string;
  readonly status: string;
}

interface EventView {
  readonly id: string;
  readonly status: EventTab;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly location: string;
  readonly image: string;
  readonly bouts: readonly BoutView[];
}

const EVENTS: readonly EventView[] = [
  {
    id: 'noche-combate-diciembre',
    status: 'upcoming',
    eyebrow: 'PRÓXIMO EVENTO · CARTELERA EN ARMADO',
    title: 'NOCHE DE COMBATE',
    description: 'Una jornada local para medir técnica, constancia y compañerismo en un entorno cuidado.',
    date: 'FECHA A CONFIRMAR',
    location: 'Tandil · Paraguay 491',
    image: 'assets/home-mma.webp',
    bouts: [
      { id: 'upcoming-1', number: '01', discipline: 'MUAY THAI', fighterA: 'Atleta del equipo', fighterB: 'Rival a confirmar', imageA: 'assets/home-muay-thai.webp', imageB: 'assets/home-striking.webp', detail: 'Categoría y modalidad a confirmar', status: 'En preparación' },
      { id: 'upcoming-2', number: '02', discipline: 'MMA', fighterA: 'Atleta del equipo', fighterB: 'Rival a confirmar', imageA: 'assets/home-mma.webp', imageB: 'assets/home-no-gi.webp', detail: 'Categoría y modalidad a confirmar', status: 'En preparación' },
      { id: 'upcoming-3', number: '03', discipline: 'MUAY THAI', fighterA: 'Atleta del equipo', fighterB: 'Rival a confirmar', imageA: 'assets/home-striking.webp', imageB: 'assets/home-muay-thai.webp', detail: 'Categoría y modalidad a confirmar', status: 'Cartelera abierta' },
      { id: 'upcoming-4', number: '04', discipline: 'MMA', fighterA: 'Atleta del equipo', fighterB: 'Rival a confirmar', imageA: 'assets/home-mma.webp', imageB: 'assets/home-striking.webp', detail: 'Categoría y modalidad a confirmar', status: 'Cartelera abierta' },
    ],
  },
  {
    id: 'jornada-sparring-octubre',
    status: 'past',
    eyebrow: 'EVENTO REALIZADO · ARCHIVO',
    title: 'JORNADA DE SPARRING',
    description: 'Encuentro de práctica compartida entre atletas de striking y MMA.',
    date: 'EVENTO DE REFERENCIA',
    location: 'Tandil · Paraguay 491',
    image: 'assets/home-striking.webp',
    bouts: [
      { id: 'past-1', number: '01', discipline: 'MUAY THAI', fighterA: 'Atleta del equipo', fighterB: 'Atleta invitado', imageA: 'assets/home-muay-thai.webp', imageB: 'assets/home-striking.webp', detail: 'Trabajo técnico · 3 rounds', status: 'Finalizado' },
      { id: 'past-2', number: '02', discipline: 'MMA', fighterA: 'Atleta del equipo', fighterB: 'Atleta invitado', imageA: 'assets/home-mma.webp', imageB: 'assets/home-striking.webp', detail: 'Trabajo técnico · 3 rounds', status: 'Finalizado' },
    ],
  },
];

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './events.page.html',
  styleUrl: './events.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {
  readonly activeTab = signal<EventTab>('upcoming');
  readonly featuredEvent = EVENTS.find((event) => event.status === 'upcoming') ?? EVENTS[0];
  readonly muayBouts = this.featuredEvent.bouts.filter((bout) => bout.discipline === 'MUAY THAI');
  readonly mmaBouts = this.featuredEvent.bouts.filter((bout) => bout.discipline === 'MMA');
  readonly muayBoutIndex = signal(0);
  readonly mmaBoutIndex = signal(0);
  readonly currentMuayBout = computed(() => this.muayBouts[this.muayBoutIndex() % this.muayBouts.length]);
  readonly currentMmaBout = computed(() => this.mmaBouts[this.mmaBoutIndex() % this.mmaBouts.length]);
  readonly eventContactUrl = whatsappUrl(MIGUEL_BADONE, 'el próximo evento y la cartelera');
  readonly selectedEventId = signal(this.featuredEvent.id);
  readonly visibleEvents = computed(() => EVENTS.filter((event) => event.status === this.activeTab()));
  readonly selectedEvent = computed(() => EVENTS.find((event) => event.id === this.selectedEventId()) ?? this.featuredEvent);

  setTab(tab: EventTab): void {
    this.activeTab.set(tab);
    const firstEvent = EVENTS.find((event) => event.status === tab);
    if (firstEvent) this.selectedEventId.set(firstEvent.id);
  }

  selectEvent(event: EventView): void {
    this.selectedEventId.set(event.id);
  }

  changeBout(category: BoutCategory, direction: -1 | 1): void {
    const total = category === 'muay-thai' ? this.muayBouts.length : this.mmaBouts.length;
    const index = category === 'muay-thai' ? this.muayBoutIndex : this.mmaBoutIndex;
    index.update((current) => (current + direction + total) % total);
  }
}
