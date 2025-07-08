import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OffresService } from '../../../core/services/offres.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold">Tableau de bord Étudiant</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span>{{ currentUser?.prenom }} {{ currentUser?.nom }}</span>
              <button (click)="logout()" class="text-red-600 hover:text-red-800">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="bg-indigo-600">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex space-x-8">
            <a routerLink="/etudiant" class="text-white px-3 py-4 hover:bg-indigo-700">
              Accueil
            </a>
            <a routerLink="/etudiant/offres" class="text-white px-3 py-4 hover:bg-indigo-700">
              Offres de stage
            </a>
            <a routerLink="/etudiant/candidatures" class="text-white px-3 py-4 hover:bg-indigo-700">
              Mes candidatures
            </a>
          </div>
        </div>
      </nav>

      <!-- Contenu principal -->
      <main class="max-w-7xl mx-auto py-6 px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Statistiques -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Candidatures</h3>
            <p class="text-3xl font-bold text-indigo-600">{{ stats.candidatures }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">En attente</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.enAttente }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Acceptées</h3>
            <p class="text-3xl font-bold text-green-600">{{ stats.acceptees }}</p>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium mb-4">Actions rapides</h3>
            <div class="space-y-3">
              <a routerLink="/etudiant/offres" 
                 class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                Rechercher des stages
              </a>
              <button class="block w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Mettre à jour mon CV
              </button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium mb-4">Dernières offres</h3>
            <div class="space-y-2">
              <div *ngFor="let offre of recentOffres" class="border-l-4 border-blue-500 pl-3">
                <p class="font-medium">{{ offre.titre }}</p>
                <p class="text-sm text-gray-600">{{ offre.entrepriseNom }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private offresService = inject(OffresService);

  currentUser = this.authService.getCurrentUser();
  stats = { candidatures: 0, enAttente: 0, acceptees: 0 };
  recentOffres: any[] = [];

  ngOnInit() {
    this.loadStats();
    this.loadRecentOffres();
  }

  loadStats() {
    // Simulation des statistiques
    this.stats = { candidatures: 5, enAttente: 3, acceptees: 1 };
  }

  loadRecentOffres() {
    this.offresService.getOffres().subscribe(offres => {
      this.recentOffres = offres.slice(0, 3);
    });
  }

  logout() {
    this.authService.logout();
  }
}