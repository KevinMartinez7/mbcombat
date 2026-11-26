import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';

type VlogFilter = 'todos' | 'gym' | 'preparacion' | 'viajes' | 'eventos';

interface VlogStory {
  readonly id: string;
  readonly category: Exclude<VlogFilter, 'todos'>;
  readonly categoryLabel: string;
  readonly title: string;
  readonly description: string;
  readonly dateLabel: string;
  readonly duration: string;
  readonly image: string;
  readonly status: string;
}

interface DisciplineSocial {
  readonly name: string;
  readonly discipline: string;
  readonly description: string;
  readonly accent: string;
  readonly image: string;
  readonly url?: string;
  readonly action: string;
}

const STORIES: readonly VlogStory[] = [
  { id: 'primer-round', category: 'gym', categoryLabel: 'GYM', title: 'El primer round empieza antes', description: 'La rutina, la técnica y el trabajo silencioso que construyen cada entrenamiento.', dateLabel: 'DIARIO DE GYM · EP. 01', duration: '03:42', image: 'assets/home-striking.webp', status: 'VIDEO PARA PUBLICAR' },
  { id: 'camino-al-evento', category: 'preparacion', categoryLabel: 'PREPARACIÓN', title: 'Una pelea se prepara mucho antes', description: 'Acompañá una semana de ajustes, paos, recuperación y foco antes de competir.', dateLabel: 'CAMINO AL EVENTO · EP. 02', duration: '05:18', image: 'assets/home-muay-thai.webp', status: 'VIDEO PARA PUBLICAR' },
  { id: 'kilometros', category: 'viajes', categoryLabel: 'VIAJES', title: 'Kilómetros que también entrenan', description: 'El viaje, la espera y la energía del equipo cuando toca salir a competir.', dateLabel: 'RUTA DE COMPETENCIA · EP. 03', duration: '04:06', image: 'assets/home-mma.webp', status: 'VIDEO PARA PUBLICAR' },
  { id: 'noche-combate', category: 'eventos', categoryLabel: 'EVENTOS', title: 'La noche de combate desde adentro', description: 'Vendajes, entradas en calor y todo lo que pasa antes de que suene la campana.', dateLabel: 'DÍA DE EVENTO · EP. 04', duration: '06:27', image: 'assets/home-mma.webp', status: 'VIDEO PARA PUBLICAR' },
  { id: 'trabajo-tecnico', category: 'gym', categoryLabel: 'GYM', title: 'Trabajo técnico con Miguel', description: 'Correcciones, repeticiones y detalles que hacen crecer a cada peleador.', dateLabel: 'DIARIO DE GYM · EP. 05', duration: '02:54', image: 'assets/miguel-badone-reference.webp', status: 'VIDEO PARA PUBLICAR' },
  { id: 'despues-del-combate', category: 'viajes', categoryLabel: 'VIAJES', title: 'Volver también es parte del camino', description: 'La charla del equipo después del combate: aprendizajes, balance y próximos objetivos.', dateLabel: 'RUTA DE COMPETENCIA · EP. 06', duration: '04:51', image: 'assets/home-striking.webp', status: 'VIDEO PARA PUBLICAR' },
];

const FILTERS: readonly { readonly value: VlogFilter; readonly label: string }[] = [
  { value: 'todos', label: 'Todo el diario' },
  { value: 'gym', label: 'Gym' },
  { value: 'preparacion', label: 'Preparación' },
  { value: 'viajes', label: 'Viajes' },
  { value: 'eventos', label: 'Eventos' },
];

const SOCIALS: readonly DisciplineSocial[] = [
  { name: 'Thai Kombat', discipline: 'MUAY THAI', description: 'Técnica, paos y la identidad del Muay Thai en Tandil.', accent: '#e51c2d', image: 'assets/home-muay-thai.webp', url: 'https://www.instagram.com/thaikombatargentina/', action: 'VER INSTAGRAM' },
  { name: 'Prometeo MMA', discipline: 'MMA', description: 'Entrenamiento mixto, preparación y competencia.', accent: '#f28c28', image: 'assets/home-mma.webp', url: 'https://www.instagram.com/prometeommateam/', action: 'VER INSTAGRAM' },
  { name: 'Paos', discipline: 'STRIKING', description: 'Sesiones de paos y trabajo personalizado para mejorar tu golpeo.', accent: '#e87945', image: 'assets/home-striking.webp', action: 'CONSULTAR REDES' },
];

@Component({
  selector: 'app-vlog-page',
  standalone: true,
  imports: [SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './vlog.page.html',
  styleUrl: './vlog.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VlogPage {
  readonly filters = FILTERS;
  readonly socials = SOCIALS;
  readonly activeFilter = signal<VlogFilter>('todos');
  readonly selectedStoryId = signal(STORIES[0].id);
  readonly visibleStories = computed(() => {
    const filter = this.activeFilter();
    return filter === 'todos' ? STORIES : STORIES.filter((story) => story.category === filter);
  });
  readonly selectedStory = computed(() => STORIES.find((story) => story.id === this.selectedStoryId()) ?? STORIES[0]);

  setFilter(filter: VlogFilter): void {
    this.activeFilter.set(filter);
    const firstStory = filter === 'todos' ? STORIES[0] : STORIES.find((story) => story.category === filter);
    if (firstStory) this.selectedStoryId.set(firstStory.id);
  }

  selectStory(story: VlogStory): void {
    this.selectedStoryId.set(story.id);
  }
}
