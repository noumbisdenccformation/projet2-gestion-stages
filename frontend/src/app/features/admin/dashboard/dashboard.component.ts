import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Tableau de bord Administrateur</h1>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4">
        <!-- Statistiques générales -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Utilisateurs</h3>
            <p class="text-3xl font-bold text-blue-600">{{ stats.totalUsers }}</p>
            <p class="text-sm text-gray-500">Total inscrits</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Offres actives</h3>
            <p class="text-3xl font-bold text-green-600">{{ stats.activeOffers }}</p>
            <p class="text-sm text-gray-500">En cours</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Candidatures</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.totalApplications }}</p>
            <p class="text-sm text-gray-500">Ce mois</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900">Conventions</h3>
            <p class="text-3xl font-bold text-purple-600">{{ stats.pendingConventions }}</p>
            <p class="text-sm text-gray-500">En attente</p>
          </div>
        </div>

        <!-- Graphiques et tableaux -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Répartition par filière -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Stages par filière</h3>
            <div class="space-y-3">
              <div *ngFor="let filiere of filiereStats" class="flex justify-between items-center">
                <span class="text-gray-700">{{ filiere.nom }}</span>
                <div class="flex items-center space-x-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" 
                         [style.width.%]="(filiere.count / maxFiliereCount) * 100"></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ filiere.count }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activité récente -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
            <div class="space-y-4">
              <div *ngFor="let activity of recentActivities" class="flex items-start space-x-3">
                <div [class]="getActivityIcon(activity.type)" 
                     class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">
                  {{ getActivityIconText(activity.type) }}
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500">{{ activity.timestamp | date:'short' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a routerLink="/admin/comptes" 
               class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <h4 class="font-medium text-gray-900">Gérer les comptes</h4>
              <p class="text-sm text-gray-600">Créer, modifier ou supprimer des utilisateurs</p>
            </a>
            
            <button class="block w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <h4 class="font-medium text-gray-900">Exporter les données</h4>
              <p class="text-sm text-gray-600">Générer des rapports Excel</p>
            </button>
            
            <button class="block w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <h4 class="font-medium text-gray-900">Paramètres système</h4>
              <p class="text-sm text-gray-600">Configuration de l'application</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    activeOffers: 0,
    totalApplications: 0,
    pendingConventions: 0
  };

  filiereStats: any[] = [];
  maxFiliereCount = 0;
  recentActivities: any[] = [];

  ngOnInit() {
    this.loadStats();
    this.loadFiliereStats();
    this.loadRecentActivities();
  }

  loadStats() {
    // Simulation de données
    this.stats = {
      totalUsers: 156,
      activeOffers: 23,
      totalApplications: 89,
      pendingConventions: 12
    };
  }

  loadFiliereStats() {
    this.filiereStats = [
      { nom: 'Informatique', count: 45 },
      { nom: 'Marketing', count: 32 },
      { nom: 'Finance', count: 28 },
      { nom: 'RH', count: 15 },
      { nom: 'Ingénierie', count: 36 }
    ];
    this.maxFiliereCount = Math.max(...this.filiereStats.map(f => f.count));
  }

  loadRecentActivities() {
    this.recentActivities = [
      {
        type: 'USER',
        description: 'Nouvel étudiant inscrit: Marie Dubois',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        type: 'OFFER',
        description: 'Nouvelle offre publiée par TechCorp',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        type: 'CONVENTION',
        description: 'Convention validée pour Jean Martin',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
      }
    ];
  }

  getActivityIcon(type: string): string {
    const icons = {
      'USER': 'bg-blue-500',
      'OFFER': 'bg-green-500',
      'CONVENTION': 'bg-purple-500'
    };
    return icons[type as keyof typeof icons] || 'bg-gray-500';
  }

  getActivityIconText(type: string): string {
    const texts = {
      'USER': 'U',
      'OFFER': 'O',
      'CONVENTION': 'C'
    };
    return texts[type as keyof typeof texts] || '?';
  }
}