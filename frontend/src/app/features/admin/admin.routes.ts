import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'comptes',
    loadComponent: () => import('./gestion-comptes/gestion-comptes.component').then(m => m.GestionComptesComponent)
  }
];