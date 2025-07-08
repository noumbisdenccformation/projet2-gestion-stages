import { Routes } from '@angular/router';

export const enseignantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'conventions',
    loadComponent: () => import('./conventions/conventions.component').then(m => m.ConventionsComponent)
  }
];