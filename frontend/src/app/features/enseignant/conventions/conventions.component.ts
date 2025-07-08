import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conventions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Validation des Conventions</h1>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4">
        <!-- Filtres -->
        <div class="mb-6 flex space-x-4">
          <button (click)="filterConventions('ALL')" 
                  [class]="selectedFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Toutes
          </button>
          <button (click)="filterConventions('EN_ATTENTE')"
                  [class]="selectedFilter === 'EN_ATTENTE' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            En attente de validation
          </button>
          <button (click)="filterConventions('VALIDEE')"
                  [class]="selectedFilter === 'VALIDEE' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'"
                  class="px-4 py-2 rounded-md border">
            Validées
          </button>
        </div>

        <!-- Liste des conventions -->
        <div class="space-y-6">
          <div *ngFor="let convention of filteredConventions" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ convention.etudiantNom }} {{ convention.etudiantPrenom }}
                </h3>
                <p class="text-gray-600">{{ convention.filiere }} - {{ convention.niveau }}</p>
                <p class="text-gray-600">{{ convention.entrepriseNom }}</p>
                <p class="text-sm text-gray-500">
                  Stage: {{ convention.dateDebut | date:'short' }} - {{ convention.dateFin | date:'short' }}
                </p>
              </div>
              
              <span [class]="getStatusClass(convention.statut)"
                    class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusLabel(convention.statut) }}
              </span>
            </div>

            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">Sujet du stage:</h4>
              <p class="text-gray-700">{{ convention.sujetStage }}</p>
            </div>

            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">Objectifs:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li *ngFor="let objectif of convention.objectifs">{{ objectif }}</li>
              </ul>
            </div>

            <!-- Actions pour les conventions en attente -->
            <div *ngIf="convention.statut === 'EN_ATTENTE'" 
                 class="flex justify-between items-center pt-4 border-t">
              <button class="text-blue-600 hover:text-blue-800">
                📄 Télécharger PDF
              </button>
              <div class="space-x-3">
                <button (click)="rejeterConvention(convention.id)"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Rejeter
                </button>
                <button (click)="validerConvention(convention.id)"
                        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Valider
                </button>
              </div>
            </div>

            <!-- Informations pour les conventions validées -->
            <div *ngIf="convention.statut === 'VALIDEE'" 
                 class="flex justify-between items-center pt-4 border-t">
              <span class="text-sm text-gray-500">
                Validée le {{ convention.dateValidation | date:'short' }}
              </span>
              <button class="text-blue-600 hover:text-blue-800">
                📄 Télécharger PDF signé
              </button>
            </div>
          </div>
        </div>

        <!-- Message si aucune convention -->
        <div *ngIf="filteredConventions.length === 0" 
             class="text-center py-12">
          <p class="text-gray-500 text-lg">Aucune convention à valider</p>
        </div>
      </div>
    </div>
  `
})
export class ConventionsComponent implements OnInit {
  conventions: any[] = [];
  filteredConventions: any[] = [];
  selectedFilter = 'ALL';

  ngOnInit() {
    this.loadConventions();
  }

  loadConventions() {
    // Simulation de données
    this.conventions = [
      {
        id: 1,
        etudiantNom: 'Dupont',
        etudiantPrenom: 'Jean',
        filiere: 'Informatique',
        niveau: 'M1',
        entrepriseNom: 'TechCorp',
        sujetStage: 'Développement d\'une application web de gestion',
        objectifs: [
          'Maîtriser le framework Angular',
          'Développer des API REST',
          'Travailler en équipe agile'
        ],
        dateDebut: new Date('2024-03-01'),
        dateFin: new Date('2024-06-01'),
        statut: 'EN_ATTENTE'
      },
      {
        id: 2,
        etudiantNom: 'Martin',
        etudiantPrenom: 'Sophie',
        filiere: 'Marketing',
        niveau: 'M2',
        entrepriseNom: 'MarketPro',
        sujetStage: 'Stratégie marketing digital',
        objectifs: [
          'Analyser le marché cible',
          'Créer des campagnes publicitaires',
          'Mesurer le ROI'
        ],
        dateDebut: new Date('2024-02-15'),
        dateFin: new Date('2024-05-15'),
        statut: 'VALIDEE',
        dateValidation: new Date('2024-01-20')
      }
    ];
    this.filteredConventions = this.conventions;
  }

  filterConventions(status: string) {
    this.selectedFilter = status;
    this.filteredConventions = status === 'ALL' 
      ? this.conventions 
      : this.conventions.filter(c => c.statut === status);
  }

  validerConvention(id: number) {
    const convention = this.conventions.find(c => c.id === id);
    if (convention) {
      convention.statut = 'VALIDEE';
      convention.dateValidation = new Date();
      this.filterConventions(this.selectedFilter);
    }
  }

  rejeterConvention(id: number) {
    const convention = this.conventions.find(c => c.id === id);
    if (convention) {
      convention.statut = 'REJETEE';
      this.filterConventions(this.selectedFilter);
    }
  }

  getStatusClass(status: string): string {
    const classes = {
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-800',
      'VALIDEE': 'bg-green-100 text-green-800',
      'REJETEE': 'bg-red-100 text-red-800'
    };
    return classes[status as keyof typeof classes] || '';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'EN_ATTENTE': 'En attente',
      'VALIDEE': 'Validée',
      'REJETEE': 'Rejetée'
    };
    return labels[status as keyof typeof labels] || status;
  }
}