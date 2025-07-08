import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Candidature } from '../../../core/models/offre.model';
import { OffresService } from '../../../core/services/offres.service';

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header simple -->
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Mes Candidatures</h1>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4">
        <!-- Filtres de statut -->
        <div class="mb-6 flex space-x-4">
          <button (click)="filterByStatus('ALL')" 
                  [class]="selectedFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Toutes ({{ candidatures.length }})
          </button>
          <button (click)="filterByStatus('EN_ATTENTE')"
                  [class]="selectedFilter === 'EN_ATTENTE' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            En attente ({{ getCountByStatus('EN_ATTENTE') }})
          </button>
          <button (click)="filterByStatus('ACCEPTEE')"
                  [class]="selectedFilter === 'ACCEPTEE' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Acceptées ({{ getCountByStatus('ACCEPTEE') }})
          </button>
          <button (click)="filterByStatus('REFUSEE')"
                  [class]="selectedFilter === 'REFUSEE' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Refusées ({{ getCountByStatus('REFUSEE') }})
          </button>
        </div>

        <!-- Liste des candidatures -->
        <div class="space-y-6">
          <div *ngFor="let candidature of filteredCandidatures" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ candidature.offreTitre }}
                </h3>
                <p class="text-gray-600">{{ candidature.entrepriseNom }}</p>
                <p class="text-sm text-gray-500">
                  Postulé le {{ candidature.datePostulation | date:'short' }}
                </p>
              </div>
              
              <span [class]="getStatusClass(candidature.statut)"
                    class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusLabel(candidature.statut) }}
              </span>
            </div>

            <!-- Lettre de motivation (extrait) -->
            <div class="mb-4">
              <p class="text-gray-700">
                {{ candidature.lettreMotivation.substring(0, 150) }}...
              </p>
            </div>

            <!-- Feedback si refusé -->
            <div *ngIf="candidature.feedback && candidature.statut === 'REFUSEE'" 
                 class="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p class="text-red-800 text-sm">
                <strong>Feedback :</strong> {{ candidature.feedback }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                CV: {{ candidature.cvPath }}
              </div>
              <div class="space-x-2">
                <button class="text-blue-600 hover:text-blue-800 text-sm">
                  Voir l'offre
                </button>
                <button *ngIf="candidature.statut === 'EN_ATTENTE'" 
                        class="text-red-600 hover:text-red-800 text-sm">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Message si aucune candidature -->
        <div *ngIf="filteredCandidatures.length === 0" 
             class="text-center py-12">
          <p class="text-gray-500 text-lg">Aucune candidature trouvée</p>
          <a routerLink="/etudiant/offres" 
             class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Découvrir les offres
          </a>
        </div>
      </div>
    </div>
  `
})
export class CandidaturesComponent implements OnInit {
  private offresService = inject(OffresService);

  candidatures: any[] = [];
  filteredCandidatures: any[] = [];
  selectedFilter = 'ALL';

  ngOnInit() {
    this.loadCandidatures();
  }

  loadCandidatures() {
    // Simulation de données
    this.candidatures = [
      {
        id: 1,
        offreTitre: 'Stage Développeur Web',
        entrepriseNom: 'TechCorp',
        statut: 'EN_ATTENTE',
        datePostulation: new Date('2024-01-15'),
        lettreMotivation: 'Je suis très intéressé par ce poste car il correspond parfaitement à mes compétences...',
        cvPath: 'cv_john_doe.pdf'
      },
      {
        id: 2,
        offreTitre: 'Stage Marketing Digital',
        entrepriseNom: 'MarketPro',
        statut: 'ACCEPTEE',
        datePostulation: new Date('2024-01-10'),
        lettreMotivation: 'Votre entreprise m\'attire particulièrement pour son approche innovante...',
        cvPath: 'cv_john_doe.pdf'
      }
    ];
    this.filteredCandidatures = this.candidatures;
  }

  filterByStatus(status: string) {
    this.selectedFilter = status;
    this.filteredCandidatures = status === 'ALL' 
      ? this.candidatures 
      : this.candidatures.filter(c => c.statut === status);
  }

  getCountByStatus(status: string): number {
    return this.candidatures.filter(c => c.statut === status).length;
  }

  getStatusClass(status: string): string {
    const classes = {
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-800',
      'ACCEPTEE': 'bg-green-100 text-green-800',
      'REFUSEE': 'bg-red-100 text-red-800'
    };
    return classes[status as keyof typeof classes] || '';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'EN_ATTENTE': 'En attente',
      'ACCEPTEE': 'Acceptée',
      'REFUSEE': 'Refusée'
    };
    return labels[status as keyof typeof labels] || status;
  }
}