import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/demo',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./features/etudiant/etudiant.routes').then(m => m.etudiantRoutes),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ETUDIANT'] }
  },
  {
    path: 'entreprise',
    loadChildren: () => import('./features/entreprise/entreprise.routes').then(m => m.entrepriseRoutes),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ENTREPRISE'] }
  },
  {
    path: 'enseignant',
    loadChildren: () => import('./features/enseignant/enseignant.routes').then(m => m.enseignantRoutes),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ENSEIGNANT'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'messagerie',
    loadChildren: () => import('./features/messagerie/messagerie.routes').then(m => m.messagerieRoutes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];