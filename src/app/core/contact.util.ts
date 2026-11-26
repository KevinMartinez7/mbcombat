import { ContactPerson } from './discipline.model';

/** Evita que el teléfono y el texto de contacto queden duplicados en distintas páginas. */
export function whatsappUrl(contact: ContactPerson, subject: string): string {
  const text = `Hola ${contact.name.split(' ')[0]}, vi la web de Miguel Badone Combat Team y quiero consultar por las clases de ${subject}. ¿Me pasás información?`;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
