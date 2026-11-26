import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Miguel Badone Combat Team | Artes marciales y deportes de combate',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'disciplinas/muay-thai',
    title: 'Thai Kombat | Muay Thai en Tandil — Miguel Badone',
    loadComponent: () => import('./features/muay-thai/muay-thai.page').then((m) => m.MuayThaiPage),
  },
  {
    path: 'articulos',
    title: 'Artículos de entrenamiento | Miguel Badone Combat Team',
    loadComponent: () => import('./features/articles/articles.page').then((m) => m.ArticlesPage),
  },
  {
    path: 'eventos',
    title: 'Eventos de combate | Miguel Badone Combat Team',
    loadComponent: () => import('./features/events/events.page').then((m) => m.EventsPage),
  },
  {
    path: 'vlog',
    title: 'Vlog de combate | Miguel Badone Combat Team',
    loadComponent: () => import('./features/vlog/vlog.page').then((m) => m.VlogPage),
  },
  {
    path: 'disciplinas/:slug',
    title: 'Disciplinas | Miguel Badone Combat Team',
    loadComponent: () => import('./features/discipline-placeholder/discipline-placeholder.page').then((m) => m.DisciplinePlaceholderPage),
  },
  { path: '**', redirectTo: '' },
];
