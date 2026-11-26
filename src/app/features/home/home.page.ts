import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SiteFooterComponent } from '../../shared/site-footer.component';
import { SiteHeaderComponent } from '../../shared/site-header.component';
import { whatsappUrl } from '../../core/contact.util';
import { DISCIPLINES, MIGUEL_BADONE, MUAY_THAI, TRAINING_SCHEDULE, WEEKDAYS } from '../../core/disciplines.data';
import { Discipline, TrainingScheduleEntry, WeekdayKey } from '../../core/discipline.model';

interface ScheduleSessionView {
  readonly id: string;
  readonly daysLabel: string;
  readonly timeLabel: string;
}

interface ScheduleGroupView {
  readonly id: string;
  readonly name: string;
  readonly academy: string;
  readonly accent: string;
  readonly status: string;
  readonly contactUrl: string;
  readonly sessions: readonly ScheduleSessionView[];
}

type DayFilter = 'all' | WeekdayKey;

const DAY_FILTERS: readonly { readonly value: DayFilter; readonly label: string }[] = [
  { value: 'all', label: 'Todos los días' },
  { value: 'mon', label: 'Lunes' },
  { value: 'tue', label: 'Martes' },
  { value: 'wed', label: 'Miércoles' },
  { value: 'thu', label: 'Jueves' },
  { value: 'fri', label: 'Viernes' },
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  readonly disciplines = DISCIPLINES;
  readonly scheduledDisciplines = DISCIPLINES.filter((discipline) => TRAINING_SCHEDULE.some((entry) => entry.disciplineSlug === discipline.slug));
  readonly days = DAY_FILTERS;
  readonly selectedDiscipline = signal('all');
  readonly selectedDay = signal<DayFilter>('all');
  readonly scheduleGroups = computed(() => this.buildScheduleGroups());
  readonly trainingContactUrl = whatsappUrl(MIGUEL_BADONE, 'Muay Thai, MMA, entrenamiento con paos y entrenamiento personalizado');
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Conocé las disciplinas de Miguel Badone: Muay Thai, MMA, paos y entrenamiento personalizado en Paraguay 491. Consultá por WhatsApp.',
    });
  }

  setDisciplineFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDiscipline.set(value === 'all' || this.scheduledDisciplines.some((discipline) => discipline.slug === value) ? value : 'all');
  }

  setDayFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDay.set(this.days.some((day) => day.value === value) ? value as DayFilter : 'all');
  }

  private buildScheduleGroups(): readonly ScheduleGroupView[] {
    const selectedDiscipline = this.selectedDiscipline();
    const selectedDay = this.selectedDay();
    const groups = new Map<string, { readonly discipline: Discipline; readonly category: string; readonly entries: TrainingScheduleEntry[] }>();

    for (const entry of TRAINING_SCHEDULE) {
      if (selectedDiscipline !== 'all' && entry.disciplineSlug !== selectedDiscipline) continue;
      if (selectedDay !== 'all' && !entry.days.includes(selectedDay)) continue;
      const discipline = this.disciplines.find((item) => item.slug === entry.disciplineSlug);
      if (!discipline) continue;
      const category = discipline.name;
      const groupId = `${discipline.slug}:${category}`;
      const group = groups.get(groupId);
      if (group) group.entries.push(entry);
      else groups.set(groupId, { discipline, category, entries: [entry] });
    }

    return Array.from(groups.entries()).map(([id, group]) => {
      const effectiveFrom = group.entries.find((entry) => entry.validity === 'effective-from')?.effectiveFrom;
      const status = effectiveFrom
        ? `Desde ${new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${effectiveFrom}T00:00:00Z`))}`
        : 'Orientativo · confirmar vigencia';
      return {
        id,
        name: group.category,
        academy: group.discipline.academy,
        accent: group.discipline.accent,
        status,
        contactUrl: whatsappUrl(group.discipline.contact, group.category),
        sessions: group.entries.map((entry) => ({
          id: entry.id,
          daysLabel: entry.days.filter((day) => selectedDay === 'all' || day === selectedDay).map((day) => WEEKDAYS[day]).join(' · '),
          timeLabel: entry.end ? `${entry.start} — ${entry.end}` : entry.start,
        })),
      };
    });
  }
}
