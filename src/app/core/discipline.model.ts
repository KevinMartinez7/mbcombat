export interface ContactPerson {
  readonly name: string;
  /** Número E.164 sin el signo +; se usa para wa.me. */
  readonly whatsapp: string;
}

export interface ScheduleSlot {
  readonly id: string;
  readonly label: string;
  readonly start: string;
  readonly end: string;
  readonly duration: string;
  readonly daysLabel: string;
}

export type WeekdayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export interface TrainingScheduleEntry {
  readonly id: string;
  readonly disciplineSlug: string;
  readonly category?: string;
  readonly label?: string;
  readonly days: readonly WeekdayKey[];
  readonly start: string;
  readonly end?: string;
  /** Reference times are from older supplied schedules and need confirmation. */
  readonly validity: 'reference' | 'effective-from';
  readonly effectiveFrom?: string;
}

export interface Discipline {
  readonly slug: string;
  readonly name: string;
  readonly academy: string;
  /** Color de acento para la tarjeta y la identidad de cada sección. */
  readonly accent: string;
  readonly contact: ContactPerson;
  /** Solo se informa cuando la persona fue confirmada como instructor. */
  readonly instructorName?: string;
  readonly schedule: readonly ScheduleSlot[];
  readonly scheduleNote?: string;
  readonly instagramUrl?: string;
  readonly homeImage: string;
  readonly homeImageAlt: string;
}
