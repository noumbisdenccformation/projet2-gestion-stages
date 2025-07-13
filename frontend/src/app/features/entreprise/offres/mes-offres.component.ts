import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { OffresService } from '../../../core/services/offres.service';

@Component({
  selector: 'app-mes-offres',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Mes Offres de Stage" 
        [navLinks]="navLinks">
      </app-navbar>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Actions -->
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold">Mes offres publiées</h2>
          <a routerLink="/entreprise/offres/nouvelle" 
             class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block">
            + Nouvelle offre
          </a>
        </div>

        <!-- Liste des offres -->
        <div class="space-y-6">
          <div *ngFor="let offre of mesOffres" class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{{ offre.titre }}</h3>
                <p class="text-gray-600">{{ offre.localisation }} • {{ offre.duree }} mois</p>
                <p class="text-sm text-gray-500">
                  Publié le {{ offre.datePublication | date:'short' }}
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <span [class]="getStatusClass(offre.statut)"
                      class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ offre.statut }}
                </span>
                <button class="text-blue-600 hover:text-blue-800">⚙️</button>
              </div>
            </div>
            
            <p class="text-gray-700 mb-4">{{ offre.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span *ngFor="let competence of offre.competencesRequises" 
                    class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                {{ competence }}
              </span>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600">
                <span class="font-medium">{{ offre.candidatures.length }}</span> candidatures reçues
              </div>
              <div class="space-x-2">
                <button (click)="voirCandidatures(offre)" 
                        class="text-green-600 hover:text-green-800 text-sm">
                  Voir candidatures ({{ offre.candidatures.length }})
                </button>
                <button [routerLink]="['/entreprise/offres/modifier', offre.id]" class="text-blue-600 hover:text-blue-800 text-sm">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal candidatures -->
        <div *ngIf="showCandidaturesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold">Candidatures pour: {{ selectedOffre?.titre }}</h3>
              <button (click)="closeCandidaturesModal()" class="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div class="space-y-4">
              <div *ngFor="let candidature of selectedOffre?.candidatures" 
                   class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-semibold">{{ candidature.etudiantNom }}</h4>
                    <p class="text-sm text-gray-600">{{ candidature.etudiantEmail }}</p>
                    <p class="text-sm text-gray-500">
                      Postulé le {{ candidature.datePostulation | date:'short' }}
                    </p>
                  </div>
                  <span [class]="getStatusClass(candidature.statut)"
                        class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ candidature.statut }}
                  </span>
                </div>
                
                <div class="mb-3">
                  <h5 class="font-medium mb-1">Lettre de motivation:</h5>
                  <p class="text-gray-700 text-sm">{{ candidature.lettreMotivation }}</p>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">CV: {{ candidature.cvPath }}</span>
                  <div class="space-x-2" *ngIf="candidature.statut === 'EN_ATTENTE'">
                    <button (click)="accepterCandidature(candidature)" 
                            class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Accepter
                    </button>
                    <button (click)="refuserCandidature(candidature)" 
                            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MesOffresComponent implements OnInit {
  private offresService = inject(OffresService);

  mesOffres: any[] = [];
  showCandidaturesModal = false;
  selectedOffre: any = null;
  
  navLinks = [
    { path: '/entreprise', label: 'Accueil' },
    { path: '/entreprise/offres', label: 'Mes offres' },
    { path: '/entreprise/candidatures', label: 'Candidatures' }
  ];

  ngOnInit() {
    this.loadMesOffres();
  }

  loadMesOffres() {
    // Simulation des offres de l'entreprise avec candidatures
    this.mesOffres = [
      {
        id: 1,
        titre: 'Stage Développeur Full Stack',
        description: 'Développement d\'applications web avec Angular et Spring Boot',
        localisation: 'Douala',
        duree: 3,
        statut: 'ACTIVE',
        datePublication: new Date('2024-01-01'),
        competencesRequises: ['Angular', 'Spring Boot', 'PostgreSQL'],
        candidatures: [
          {
            id: 1,
            etudiantNom: 'Jean Dupont',
            etudiantEmail: 'jean.dupont@email.com',
            lettreMotivation: 'Je suis très intéressé par ce poste car il correspond parfaitement à mes compétences...',
            cvPath: 'cv_jean_dupont.pdf',
            statut: 'EN_ATTENTE',
            datePostulation: new Date('2024-01-15')
          },
          {
            id: 2,
            etudiantNom: 'Marie Martin',
            etudiantEmail: 'marie.martin@email.com',
            lettreMotivation: 'Mon parcours en développement web et ma passion pour les nouvelles technologies...',
            cvPath: 'cv_marie_martin.pdf',
            statut: 'ACCEPTEE',
            datePostulation: new Date('2024-01-12')
          }
        ]
      },
      {
        id: 2,
        titre: 'Stage Marketing Digital',
        description: 'Gestion des campagnes publicitaires et analyse des performances',
        localisation: 'Bafoussam',
        duree: 6,
        statut: 'ACTIVE',
        datePublication: new Date('2024-01-05'),
        competencesRequises: ['Google Ads', 'Analytics', 'SEO'],
        candidatures: [
          {
            id: 3,
            etudiantNom: 'Paul Nguyen',
            etudiantEmail: 'paul.nguyen@email.com',
            lettreMotivation: 'Votre entreprise m\'attire particulièrement pour son approche innovante...',
            cvPath: 'cv_paul_nguyen.pdf',
            statut: 'EN_ATTENTE',
            datePostulation: new Date('2024-01-18')
          }
        ]
      }
    ];
  }

  getStatusClass(statut: string): string {
    const classes = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-800',
      'ACCEPTEE': 'bg-green-100 text-green-800',
      'REFUSEE': 'bg-red-100 text-red-800'
    };
    return classes[statut as keyof typeof classes] || '';
  }

  voirCandidatures(offre: any) {
    this.selectedOffre = offre;
    this.showCandidaturesModal = true;
  }

  closeCandidaturesModal() {
    this.showCandidaturesModal = false;
    this.selectedOffre = null;
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