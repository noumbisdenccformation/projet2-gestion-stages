import { Routes } from '@angular/router';

export const entrepriseRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'offres',
    loadComponent: () => import('./offres/mes-offres.component').then(m => m.MesOffresComponent)
  },
  {
    path: 'offres/nouvelle',
    loadComponent: () => import('./offres/nouvelle-offre.component').then(m => m.NouvelleOffreComponent)
  },
  {
    path: 'candidatures',
    loadComponent: () => import('./candidatures/gestion-candidatures.component').then(m => m.GestionCandidaturesComponent)
  }
];