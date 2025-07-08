import { Routes } from '@angular/router';

export const messagerieRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent)
  }
];