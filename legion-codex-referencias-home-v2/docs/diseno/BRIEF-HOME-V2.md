# Legión Team Tandil — Contrato de diseño e implementación (Home v2)

## Objetivo

Rediseñar la HOME `/` existente, conservando la implementación Angular 20 aprovechable y la ruta de Thai Kombat existente. **Legión es la marca paraguas.** Las cinco academias deben tener el mismo peso visual en la portada. No transformar la home en un sitio de Thai Kombat/Miguel Badone.

## Jerarquía de las referencias

- `referencias/01-OBJETIVO-HOME-principal.png`: **objetivo visual primario**, referencia de composición, densidad de contenido, balance y estilo.
- `referencias/02-OBJETIVO-HOME-alternativa.png`: referencia secundaria de jerarquía y tarjetas.
- `referencias/03-OBJETIVO-HOME-estructura-larga.png`: referencia de continuidad hacia CTA/footer.
- `actual/`: capturas del sitio actual y los problemas que hay que solucionar, **no son el objetivo**.
- `material-usuario/`: material compartido por el cliente, de calidad provisional. **Las referencias generadas por IA NO son assets oficiales y pueden contener logos/rostros/fachadas inventados o deformados.** No copiar esos elementos a producción. Usar solo su layout, ritmo, color y jerarquía.

Si hay conflicto entre una imagen generada y los datos verificados de este brief, **prevalece este brief**. Los diseños son orientación visual: no pixel-perfect a costa de la legibilidad o de la autenticidad de los datos.

## Problemas verificables en las capturas actuales

1. Navbar sin logo de Legión, con botón hamburguesa visible a la vez que navegación de escritorio.
2. Hero dominado por una foto individual de Miguel (Thai Kombat); esto transmite protagonismo injustificado.
3. Tarjetas de academias oscuras y vacías; varias no muestran fotografía ni identidad; composición 3+2 centrada cuando hay ancho de escritorio suficiente para cinco.
4. Sección “Sobre Legión” usa otra vez la foto de Miguel, dejando a las demás academias invisibles.
5. Horarios muestran solamente Muay Thai; existen horarios compartidos de otras disciplinas para incorporar como orientativos hasta confirmar vigencia.
6. Contacto y footer no siguen el mismo ancho de contenedor/alineación que el resto.
7. Demasiado vacío en varias secciones y sin impacto de fotografía deportiva real/ilustrativa.

## Sistema visual

- Identidad global de Legión: deportivo profesional, cinematográfico, editorial, negro carbón con rojo y blanco; NO una mezcla de cinco webs.
- Tokens base sugeridos: `--bg: #090B0F`, `--surface: #15181E`, `--surface-alt: #1D2128`, `--red: #E51C2D`, `--text: #F7F8FA`, `--muted: #A7ADB6`, `--border: #343A44`. Consolidar en CSS custom properties.
- Títulos Barlow Condensed (o una condensada de estética atlética) en estilos grandes; cuerpo Inter o sans neutral. No aplicar cursiva al cuerpo.
- Acentos por academia **solo** en tarjeta y página individual: Thai Kombat rojo, Prometeo MMA naranja, Jiu-Jitsu verde/rojo, No-Gi verde lima, Boxeo azul/rojo. Estos son acentos de maqueta, no reemplazan manuales oficiales.
- Contenedor global máximo 1280–1360px, padding consistente 24–32px escritorio / 16–20px móvil. Espaciado vertical intencional, sin secciones con grandes bloques vacíos injustificados.
- Botón primario rojo, secundario outline claro. Hover/focus claros, sin movimiento excesivo; respetar reduced-motion.

## Composición de HOME (orden y contenido)

### 1. Header fijo/sticky (alto aprox. 72–84px)

Izquierda: símbolo/logo de Legión del material disponible; si es recorte poco apropiado, usar marca tipográfica digna señalada como placeholder, jamás inventar logo definitivo. A la derecha en escritorio: Inicio, Disciplinas (dropdown), Horarios, Nosotros, Galería, Ubicación, CTA “Empezá a entrenar”. **Hamburguesa solo en móvil/tablet estrecha**, no junto al menú de escritorio. Menú accesible por teclado.

### 2. Hero (aprox. 560–650px en escritorio, adaptable)

Headline: “ARTES MARCIALES” en blanco y “EN TANDIL” en rojo, gran escala condensada. Subheadline: “Muay Thai · MMA · Jiu-Jitsu · No-Gi · Boxeo”. CTA principal “Explorar disciplinas”; secundario “Ver horarios”. Visual atlético neutral que represente entrenamiento de combate **sin privilegiar a Miguel/Thai Kombat**; fotografía grupal genérica licenciada/local si existe, o collage/mosaico ilustrativo etiquetado como temporal. Overlay oscuro para contraste. No generar falsa fachada oficial ni logos sobre indumentaria.

### 3. Nuestras disciplinas

Título, breve texto y **cinco tarjetas de igual jerarquía** en **una sola fila en ≥1280px** si caben cómodas; 3/2 o 2 columnas en tablet según ancho, 1 en móvil. Cada tarjeta: fotografía distinta y relacionada con su disciplina (si no existe usar placeholder visual bien diseñado), nombre de disciplina legible, academia secundaria, logo oficial solo si realmente existe, acento cromático discreto, CTA funcional “Ver disciplina” / “Consultar”. Todos los tamaños de tarjeta armonizados. Evitar tarjeta solo con degradado vacío.

Orden: Muay Thai — Thai Kombat; MMA — Prometeo MMA; Brazilian Jiu-Jitsu — Jiu Jitsu Club Tandil; No-Gi — No Gi Grappling Club; Boxeo — No Fight No Live Boxing Academy. **El orden de listado no implica relevancia comercial.** No agrandar Thai ni repetir Miguel por todo el sitio.

### 4. Valor del gimnasio / comunidad

Sección equilibrada y general (no dedicada a Miguel): texto sobre entrenamiento multidisciplinario y fotos genéricas variadas o detalles del gimnasio reales en la fase 2. Evitar afirmaciones no verificadas de premios, certificaciones, años de trayectoria, cantidad de alumnos o instructores.

### 5. Horarios

Bloque compacto y claro de TODAS las disciplinas con filtros por disciplina/día o tabla responsive usable; usar datos tipados de una fuente común y gestionar vigencia/estado. Los horarios de Muay Thai son nuevos **desde diciembre de 2026**, no presentarlos como vigentes antes de ese mes. Para las demás, la información procede de capturas anteriores y debe mostrarse con disclaimer 'Horarios de referencia; consultar vigencia' o similar, o marcar confirmado=false.

Horarios informados:
- Muay Thai: lunes a viernes 09:00–10:30, 13:00–14:30, 19:15–20:15 (**desde diciembre de 2026**).
- MMA: lunes y miércoles 10:00; martes y jueves 14:30 y 18:15; viernes 10:00, 14:30 y 18:15.
- Jiu-Jitsu adultos: lunes, miércoles, viernes 08:00; martes, jueves 07:00 y 21:15.
- Jiu-Jitsu Kids: lunes, miércoles, viernes 17:15.
- No-Gi: lunes, miércoles 18:15; martes, jueves 20:15.
- Boxeo: lunes, miércoles, viernes 20:15.

### 6. Contacto

CTA contextual por disciplina para generar el `wa.me` correcto con texto precargado, no pegar la misma URL por todo el sitio:
- Miguel Badone (+54 9 2494 38-1035): Muay Thai, MMA. `5492494381035`.
- Lucas (+54 9 2494 60-9132): Jiu-Jitsu adultos/Kids, No-Gi, Boxeo. `5492494609132`.
**Lucas está confirmado como contacto de Boxeo, pero NO como instructor de Boxeo.** No poner “Prof. Lucas” bajo todas las tarjetas por defecto.

### 7. Ubicación y footer

Paraguay 491, B7000 Tandil, Provincia de Buenos Aires, Argentina. Enlace real a Google Maps por consulta de dirección; no mostrar mapa ficticio como si fuera un mapa interactivo ni fachada inventada. Footer alineado al mismo contenedor, enlaces y redes.

Redes:
- Legión: https://www.instagram.com/legionteamtandil/
- Thai Kombat: https://www.instagram.com/thaikombatargentina/
- Prometeo: https://www.instagram.com/prometeommateam/
- Jiu-Jitsu: https://www.instagram.com/jiujitsu.club.tandil/
- No-Gi: https://www.instagram.com/nogigrapplingclub/
- Boxeo: Instagram no confirmado, no inventar.

## Reglas Angular / arquitectura

1. Inspeccionar el repo ANTES de modificar. Reutilizar componentes, routing, datos y assets que estén correctos. No reescribir desde cero.
2. Angular 20 standalone, typed models, strict templates, OnPush, lazy routes, SCSS/CSS variables y signals cuando correspondan; evitar dependencia nueva si no aporta. Datos de disciplinas/contactos/horarios centralizados y compartidos.
3. No alterar/regredir `/disciplinas/muay-thai` sin motivo; cambios globales solo con verificación visual de esa página.
4. No crear páginas completas de MMA, BJJ, No-Gi ni Boxeo en esta iteración; mantener rutas a placeholders útiles o CTA de WhatsApp, nunca rutas rotas.
5. Imagen real oficial: no disponible para todas las academias; nunca sustituir con un logo falso generado por IA. Capturas de usuario como guía, no como assets definitivos.
6. SEO básico con títulos y descripciones, alt, jerarquía h1/h2, estado de carga, contraste, foco visible, reduced-motion.

## Criterios de aceptación (verificables)

- [ ] En 1440px de ancho, cinco tarjetas del mismo tamaño visibles juntas y con contenido fotográfico/placeholder significativo.
- [ ] No hay foto exclusiva de Miguel en hero y 'Sobre Legión'; Thai Kombat no domina portada.
- [ ] Navbar desktop sin hamburguesa y menú desplegable navegable; móvil sin navegación de escritorio duplicada.
- [ ] Información de contacto correcta y links `wa.me` probados, contextuales por academia.
- [ ] Horarios de seis categorías (5 disciplinas + Kids) disponibles, con estado temporal claro.
- [ ] Todas las secciones respetan el mismo máximo de ancho, grid y gutter; footer alineado.
- [ ] Ningún enlace lleva a una ruta sin implementar por accidente.
- [ ] Sin scroll horizontal en 320px, 390px, 768px, 1024px, 1440px y 1920px.
- [ ] Ejecutar `npm run build` y pruebas disponibles. Revisar consola del navegador y navegación si existe automatización.
- [ ] Comparar capturas reales del resultado (1440x900 y 390x844, idealmente página completa) contra las imágenes de `referencias/`. Corregir al menos una ronda de diferencias visuales antes de terminar.
- [ ] Entregar lista de archivos cambiados, comando ejecutado, decisiones, pruebas y pendientes; no afirmar haber validado lo que no se pudo ejecutar.

## Definición de 'terminado'

No basta que compile. La tarea termina cuando la HOME tiene una identidad visual reconocible según las referencias, equilibra las cinco academias, se ve bien en móvil, usa datos correctos y sus acciones básicas funcionan.
