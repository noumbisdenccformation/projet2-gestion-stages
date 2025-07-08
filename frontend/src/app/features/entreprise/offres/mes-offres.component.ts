import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Offre } from '../../../core/models/offre.model';
import { OffresService } from '../../../core/services/offres.service';

@Component({
  selector: 'app-mes-offres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Mes Offres de Stage</h1>
          <button (click)="showCreateForm = !showCreateForm" 
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            {{ showCreateForm ? 'Annuler' : 'Nouvelle offre' }}
          </button>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4">
        <!-- Formulaire de création -->
        <div *ngIf="showCreateForm" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4">Créer une nouvelle offre</h2>
          <form [formGroup]="offreForm" (ngSubmit)="createOffre()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input formControlName="titre" placeholder="Titre du stage" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              
              <select formControlName="domaine" class="w-full p-3 border border-gray-300 rounded-md">
                <option value="">Sélectionner un domaine</option>
                <option value="informatique">Informatique</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="rh">Ressources Humaines</option>
              </select>
              
              <input formControlName="localisation" placeholder="Localisation" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              
              <select formControlName="duree" class="w-full p-3 border border-gray-300 rounded-md">
                <option value="">Durée</option>
                <option value="1">1 mois</option>
                <option value="2">2 mois</option>
                <option value="3">3 mois</option>
                <option value="6">6 mois</option>
              </select>
            </div>
            
            <textarea formControlName="description" rows="4" placeholder="Description du stage"
                      class="w-full p-3 border border-gray-300 rounded-md"></textarea>
            
            <input formControlName="competences" placeholder="Compétences requises (séparées par des virgules)"
                   class="w-full p-3 border border-gray-300 rounded-md">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input formControlName="dateDebut" type="date" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              <input formControlName="dateFin" type="date" 
                     class="w-full p-3 border border-gray-300 rounded-md">
            </div>
            
            <div class="flex justify-end space-x-4">
              <button type="button" (click)="showCreateForm = false"
                      class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit" [disabled]="offreForm.invalid"
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                Publier l'offre
              </button>
            </div>
          </form>
        </div>

        <!-- Liste des offres -->
        <div class="space-y-6">
          <div *ngFor="let offre of offres" class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{{ offre.titre }}</h3>
                <p class="text-gray-600">{{ offre.domaine }} • {{ offre.localisation }}</p>
                <p class="text-sm text-gray-500">
                  Publié le {{ offre.datePublication | date:'short' }}
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <span [class]="getStatusClass(offre.statut)"
                      class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ offre.statut }}
                </span>
                <button class="text-blue-600 hover:text-blue-800">Modifier</button>
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
              <div class="text-sm text-gray-500">
                <span>Durée: {{ offre.duree }} mois</span>
                <span class="ml-4">{{ offre.candidaturesCount || 0 }} candidature(s)</span>
              </div>
              <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Voir les candidatures
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MesOffresComponent implements OnInit {
  private fb = inject(FormBuilder);
  private offresService = inject(OffresService);

  showCreateForm = false;
  offres: any[] = [];

  offreForm = this.fb.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    domaine: ['', Validators.required],
    duree: ['', Validators.required],
    localisation: ['', Validators.required],
    competences: [''],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required]
  });

  ngOnInit() {
    this.loadOffres();
  }

  loadOffres() {
    // Simulation de données
    this.offres = [
      {
        id: 1,
        titre: 'Stage Développeur Full Stack',
        description: 'Développement d\'applications web avec Angular et Spring Boot',
        domaine: 'informatique',
        duree: 3,
        localisation: 'Paris',
        competencesRequises: ['Angular', 'Spring Boot', 'PostgreSQL'],
        datePublication: new Date('2024-01-01'),
        statut: 'ACTIVE',
        candidaturesCount: 5
      }
    ];
  }

  createOffre() {
    if (this.offreForm.valid) {
      const formData = this.offreForm.value;
      const offre = {
        ...formData,
        competencesRequises: formData.competences?.split(',').map(c => c.trim()) || []
      };
      
      console.log('Création offre:', offre);
      this.showCreateForm = false;
      this.offreForm.reset();
    }
  }

  getStatusClass(status: string): string {
    const classes = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'FERMEE': 'bg-gray-100 text-gray-800',
      'POURVUE': 'bg-blue-100 text-blue-800'
    };
    return classes[status as keyof typeof classes] || '';
  }
}