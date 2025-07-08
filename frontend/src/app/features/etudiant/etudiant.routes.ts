import { Routes } from '@angular/router';

export const etudiantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'offres',
    loadComponent: () => import('./offres/offres-list.component').then(m => m.OffresListComponent)
  },
  {
    path: 'candidatures',
    loadComponent: () => import('./candidatures/candidatures.component').then(m => m.CandidaturesComponent)
  }
];