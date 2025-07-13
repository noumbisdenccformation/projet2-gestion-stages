import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OffresService } from '../../../core/services/offres.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-entreprise-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Dashboard Entreprise" 
        [navLinks]="navLinks">
      </app-navbar>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Mes offres</h3>
            <p class="text-3xl font-bold text-blue-600">{{ stats.offres }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Candidatures reçues</h3>
            <p class="text-3xl font-bold text-green-600">{{ stats.candidatures }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">En attente</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.enAttente }}</p>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium mb-4">Actions rapides</h3>
            <div class="space-y-3">
              <a routerLink="/entreprise/offres/nouvelle" 
                 class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700">
                Publier une nouvelle offre
              </a>
              <a routerLink="/entreprise/candidatures" 
                 class="block w-full bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700">
                Voir les candidatures
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium mb-4">Mes dernières offres</h3>
            <div class="space-y-2">
              <div *ngFor="let offre of mesOffres" class="border-l-4 border-blue-500 pl-3">
                <p class="font-medium">{{ offre.titre }}</p>
                <p class="text-sm text-gray-600">{{ offre.candidatures }} candidatures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private offresService = inject(OffresService);

  stats = { offres: 0, candidatures: 0, enAttente: 0 };
  mesOffres: any[] = [];
  
  navLinks = [
    { path: '/entreprise', label: 'Accueil' },
    { path: '/entreprise/offres', label: 'Mes offres' },
    { path: '/entreprise/candidatures', label: 'Candidatures' }
  ];

  ngOnInit() {
    this.loadStats();
    this.loadMesOffres();
  }

  loadStats() {
    this.stats = { offres: 4, candidatures: 12, enAttente: 8 };
  }

  loadMesOffres() {
    this.mesOffres = [
      { titre: 'Stage Développeur Full Stack', candidatures: 5 },
      { titre: 'Stage Marketing Digital', candidatures: 3 },
      { titre: 'Stage Analyste Financier', candidatures: 4 }
    ];
  }
}