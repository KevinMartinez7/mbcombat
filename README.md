# Miguel Badone Combat Team

Web institucional desarrollada con Angular 20, componentes standalone, TypeScript estricto, OnPush y rutas lazy.

## Desarrollo

```bash
npm install
npm start
```

Abrí `http://localhost:4200/`. La ruta `/disciplinas/muay-thai` conserva la página específica de Thai Kombat. Las otras disciplinas usan páginas informativas provisionales, no páginas completas.

## Build

```bash
npm run build
```

## Datos y estructura

- `src/app/core/disciplines.data.ts`: academias, contactos y horarios tipados; los horarios compartidos se declaran una sola vez.
- `src/app/core/contact.util.ts`: crea enlaces de WhatsApp con mensajes contextuales.
- `src/app/shared/`: header y footer globales reutilizables.
- `src/app/features/home/`: homepage, filtros de horarios y diseño responsive.
- `src/app/features/muay-thai/`: página existente de Muay Thai / Thai Kombat.
- `src/assets/home-photo-credits.md`: procedencia y licencia de las fotografías temporales de la home.

Las fotos de stock se identifican como ilustrativas y no representan el gimnasio. Se reemplazarán cuando se incorporen fotos reales y los logos oficiales en formato original.
