import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Candidature } from '../../../core/models/offre.model';
import { OffresService } from '../../../core/services/offres.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Mes Candidatures" 
        [navLinks]="navLinks">
      </app-navbar>

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
                <button (click)="voirOffre(candidature)" 
                        class="text-blue-600 hover:text-blue-800 text-sm">
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

      <!-- Modal d'affichage de l'offre -->
      <div *ngIf="showOffreModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold">{{ selectedOffre?.titre }}</h3>
            <button (click)="closeOffreModal()" class="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div *ngIf="selectedOffre" class="space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-lg font-medium">{{ selectedOffre.entrepriseNom }}</p>
                <p class="text-gray-600">{{ selectedOffre.localisation }}</p>
              </div>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {{ selectedOffre.domaine }}
              </span>
            </div>
            
            <div class="border-t pt-4">
              <h4 class="font-semibold mb-2">Description</h4>
              <p class="text-gray-700">{{ selectedOffre.description }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold mb-2">Durée</h4>
                <p>{{ selectedOffre.duree }} mois</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Secteur</h4>
                <p>{{ selectedOffre.secteur }}</p>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">Compétences requises</h4>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let competence of selectedOffre.competencesRequises" 
                      class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  {{ competence }}
                </span>
              </div>
            </div>
            
            <div class="border-t pt-4">
              <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Publié le:</strong> {{ selectedOffre.datePublication | date:'short' }}
                </div>
                <div>
                  <strong>Début:</strong> {{ selectedOffre.dateDebut | date:'short' }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end mt-6">
            <button (click)="closeOffreModal()" 
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Fermer
            </button>
          </div>
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
  showOffreModal = false;
  selectedOffre: any = null;
  
  navLinks = [
    { path: '/etudiant', label: 'Accueil' },
    { path: '/etudiant/offres', label: 'Offres de stage' },
    { path: '/etudiant/candidatures', label: 'Mes candidatures' }
  ];

  ngOnInit() {
    this.loadCandidatures();
  }

  loadCandidatures() {
    // Simulation de données avec offreId pour récupérer les détails
    this.candidatures = [
      {
        id: 1,
        offreId: 1,
        offreTitre: 'Stage Développeur Full Stack',
        entrepriseNom: 'TechCorp',
        statut: 'EN_ATTENTE',
        datePostulation: new Date('2024-01-15'),
        lettreMotivation: 'Je suis très intéressé par ce poste car il correspond parfaitement à mes compétences en développement web...',
        cvPath: 'cv_john_doe.pdf'
      },
      {
        id: 2,
        offreId: 3,
        offreTitre: 'Stage Marketing Digital',
        entrepriseNom: 'MarketPro',
        statut: 'ACCEPTEE',
        datePostulation: new Date('2024-01-10'),
        lettreMotivation: 'Votre entreprise m\'attire particulièrement pour son approche innovante du marketing digital...',
        cvPath: 'cv_john_doe.pdf'
      },
      {
        id: 3,
        offreId: 5,
        offreTitre: 'Stage Analyste Financier',
        entrepriseNom: 'FinanceExpert',
        statut: 'REFUSEE',
        datePostulation: new Date('2024-01-05'),
        lettreMotivation: 'Mon parcours en finance et ma passion pour l\'analyse des marchés...',
        cvPath: 'cv_john_doe.pdf',
        feedback: 'Profil intéressant mais nous recherchons quelqu\'un avec plus d\'expérience en analyse quantitative.'
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

  voirOffre(candidature: any) {
    // Récupérer les détails de l'offre via le service
    this.offresService.getOffreById(candidature.offreId).subscribe({
      next: (offre) => {
        this.selectedOffre = offre;
        this.showOffreModal = true;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'offre:', err);
        // Fallback avec données basiques si l'offre n'existe plus
        this.selectedOffre = {
          titre: candidature.offreTitre,
          entrepriseNom: candidature.entrepriseNom,
          description: 'Cette offre n\'est plus disponible ou a été archivée.',
          domaine: 'Non spécifié',
          duree: 'Non spécifié',
          secteur: 'Non spécifié',
          localisation: 'Non spécifié',
          competencesRequises: [],
          datePublication: candidature.datePostulation,
          dateDebut: null
        };
        this.showOffreModal = true;
      }
    });
  }

  closeOffreModal() {
    this.showOffreModal = false;
    this.selectedOffre = null;
  }
}