import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-gestion-candidatures',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Gestion des Candidatures" 
        [navLinks]="navLinks">
      </app-navbar>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Filtres -->
        <div class="mb-6 flex space-x-4">
          <button (click)="filterByStatus('ALL')" 
                  [class]="selectedFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Toutes ({{ allCandidatures.length }})
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
        </div>

        <!-- Liste des candidatures -->
        <div class="space-y-6">
          <div *ngFor="let candidature of filteredCandidatures" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ candidature.etudiantNom }}
                </h3>
                <p class="text-gray-600">{{ candidature.etudiantEmail }}</p>
                <p class="text-sm text-gray-500">
                  Pour: {{ candidature.offreTitre }} • Postulé le {{ candidature.datePostulation | date:'short' }}
                </p>
              </div>
              
              <span [class]="getStatusClass(candidature.statut)"
                    class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusLabel(candidature.statut) }}
              </span>
            </div>

            <div class="mb-4">
              <h4 class="font-medium mb-2">Lettre de motivation:</h4>
              <p class="text-gray-700">{{ candidature.lettreMotivation }}</p>
            </div>

            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                CV: {{ candidature.cvPath }}
              </div>
              <div class="space-x-2" *ngIf="candidature.statut === 'EN_ATTENTE'">
                <button (click)="accepterCandidature(candidature)" 
                        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Accepter
                </button>
                <button (click)="refuserCandidature(candidature)" 
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GestionCandidaturesComponent implements OnInit {
  allCandidatures: any[] = [];
  filteredCandidatures: any[] = [];
  selectedFilter = 'ALL';
  
  navLinks = [
    { path: '/entreprise', label: 'Accueil' },
    { path: '/entreprise/offres', label: 'Mes offres' },
    { path: '/entreprise/candidatures', label: 'Candidatures' }
  ];

  ngOnInit() {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.allCandidatures = [
      {
        id: 1,
        etudiantNom: 'Jean Dupont',
        etudiantEmail: 'jean.dupont@email.com',
        offreTitre: 'Stage Développeur Full Stack',
        lettreMotivation: 'Je suis très intéressé par ce poste car il correspond parfaitement à mes compétences en développement web...',
        cvPath: 'cv_jean_dupont.pdf',
        statut: 'EN_ATTENTE',
        datePostulation: new Date('2024-01-15')
      },
      {
        id: 2,
        etudiantNom: 'Marie Martin',
        etudiantEmail: 'marie.martin@email.com',
        offreTitre: 'Stage Développeur Full Stack',
        lettreMotivation: 'Mon parcours en développement web et ma passion pour les nouvelles technologies me motivent à rejoindre votre équipe...',
        cvPath: 'cv_marie_martin.pdf',
        statut: 'ACCEPTEE',
        datePostulation: new Date('2024-01-12')
      },
      {
        id: 3,
        etudiantNom: 'Paul Nguyen',
        etudiantEmail: 'paul.nguyen@email.com',
        offreTitre: 'Stage Marketing Digital',
        lettreMotivation: 'Votre entreprise m\'attire particulièrement pour son approche innovante du marketing digital...',
        cvPath: 'cv_paul_nguyen.pdf',
        statut: 'EN_ATTENTE',
        datePostulation: new Date('2024-01-18')
      }
    ];
    this.filteredCandidatures = this.allCandidatures;
  }

  filterByStatus(status: string) {
    this.selectedFilter = status;
    this.filteredCandidatures = status === 'ALL' 
      ? this.allCandidatures 
      : this.allCandidatures.filter(c => c.statut === status);
  }

  getCountByStatus(status: string): number {
    return this.allCandidatures.filter(c => c.statut === status).length;
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

  accepterCandidature(candidature: any) {
    candidature.statut = 'ACCEPTEE';
    console.log('Candidature acceptée:', candidature);
  }

  refuserCandidature(candidature: any) {
    candidature.statut = 'REFUSEE';
    console.log('Candidature refusée:', candidature);
  }
}