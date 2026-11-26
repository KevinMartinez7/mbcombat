import { ContactPerson, Discipline, ScheduleSlot, TrainingScheduleEntry, WeekdayKey } from './discipline.model';

export const MIGUEL_BADONE: ContactPerson = { name: 'Miguel Badone', whatsapp: '5492494381035' };

export const WEEKDAYS: Readonly<Record<WeekdayKey, string>> = {
  mon: 'Lun', tue: 'Mar', wed: 'Mié', thu: 'Jue', fri: 'Vie',
};
export const MUAY_THAI_SCHEDULE_FROM = '2026-12-01';

/** Horarios centralizados. Los de otras disciplinas son orientativos hasta confirmar vigencia. */
export const TRAINING_SCHEDULE: readonly TrainingScheduleEntry[] = [
  { id: 'morning', disciplineSlug: 'muay-thai', label: 'MAÑANA', days: ['mon', 'tue', 'wed', 'thu', 'fri'], start: '09:00', end: '10:30', validity: 'effective-from', effectiveFrom: MUAY_THAI_SCHEDULE_FROM },
  { id: 'midday', disciplineSlug: 'muay-thai', label: 'MEDIODÍA', days: ['mon', 'tue', 'wed', 'thu', 'fri'], start: '13:00', end: '14:30', validity: 'effective-from', effectiveFrom: MUAY_THAI_SCHEDULE_FROM },
  { id: 'evening', disciplineSlug: 'muay-thai', label: 'TARDE - NOCHE', days: ['mon', 'tue', 'wed', 'thu', 'fri'], start: '19:15', end: '20:15', validity: 'effective-from', effectiveFrom: MUAY_THAI_SCHEDULE_FROM },
  { id: 'mma-morning', disciplineSlug: 'prometeo-mma', days: ['mon', 'wed', 'fri'], start: '10:00', validity: 'reference' },
  { id: 'mma-afternoon', disciplineSlug: 'prometeo-mma', days: ['tue', 'thu', 'fri'], start: '14:30', validity: 'reference' },
  { id: 'mma-evening', disciplineSlug: 'prometeo-mma', days: ['tue', 'thu', 'fri'], start: '18:15', validity: 'reference' },
];

function formatDays(days: readonly WeekdayKey[]): string {
  return days.map((day) => WEEKDAYS[day].toUpperCase()).join(' · ');
}

function duration(start: string, end?: string): string {
  if (!end) return '';
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  return `${(endHour * 60 + endMinute - startHour * 60 - startMinute)} MIN`;
}

function muayThaiSchedule(): readonly ScheduleSlot[] {
  return TRAINING_SCHEDULE
    .filter((slot) => slot.disciplineSlug === 'muay-thai')
    .map((slot) => ({
      id: slot.id,
      label: slot.label ?? slot.start,
      start: slot.start,
      end: slot.end ?? '',
      duration: duration(slot.start, slot.end),
      daysLabel: formatDays(slot.days),
    }));
}

export const DISCIPLINES: readonly Discipline[] = [
  {
    slug: 'muay-thai', name: 'Muay Thai', academy: 'Thai Kombat', accent: '#e51c2d',
    contact: MIGUEL_BADONE, instructorName: 'Miguel Badone',
    scheduleNote: 'Programación desde diciembre de 2026.',
    instagramUrl: 'https://www.instagram.com/thaikombatargentina/', schedule: muayThaiSchedule(),
    homeImage: 'assets/home-striking.webp', homeImageAlt: 'Boxeador practica golpes con guantes, imagen ilustrativa de striking',
  },
  {
    slug: 'prometeo-mma', name: 'MMA', academy: 'Prometeo MMA', accent: '#f28c28',
    contact: MIGUEL_BADONE, instagramUrl: 'https://www.instagram.com/prometeommateam/', schedule: [],
    homeImage: 'assets/home-mma.webp', homeImageAlt: 'Dos atletas practican grappling en una jaula de MMA, imagen ilustrativa',
  },
  {
    slug: 'paos', name: 'Paos', academy: 'Entrenamiento de striking', accent: '#e87945',
    contact: MIGUEL_BADONE, scheduleNote: 'Días y horarios a coordinar con Miguel.', schedule: [],
    homeImage: 'assets/home-muay-thai.webp', homeImageAlt: 'Practicante de kickboxing entrena con paos, imagen ilustrativa',
  },
  {
    slug: 'entrenamiento-personalizado', name: 'Entrenamiento personalizado', academy: 'Sesiones 1 a 1', accent: '#b85cdb',
    contact: MIGUEL_BADONE, scheduleNote: 'Días y horarios a coordinar con Miguel.', schedule: [],
    homeImage: 'assets/home-striking.webp', homeImageAlt: 'Entrenamiento individual de striking, imagen ilustrativa',
  },
];

export const MUAY_THAI = DISCIPLINES[0];
