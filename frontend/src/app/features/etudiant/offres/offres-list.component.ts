import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Offre } from '../../../core/models/offre.model';
import { OffresService } from '../../../core/services/offres.service';

@Component({
  selector: 'app-offres-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Offres de Stage</h1>
      
      <!-- Filtres -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <form [formGroup]="filterForm" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Domaine</label>
            <select formControlName="domaine" class="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Tous les domaines</option>
              <option value="informatique">Informatique</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Durée</label>
            <select formControlName="duree" class="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Toutes durées</option>
              <option value="1">1 mois</option>
              <option value="3">3 mois</option>
              <option value="6">6 mois</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
            <input formControlName="localisation" type="text" placeholder="Ville..." 
                   class="w-full p-2 border border-gray-300 rounded-md">
          </div>
          
          <div class="flex items-end">
            <button (click)="applyFilters()" type="button" 
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Rechercher
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des offres -->
      <div class="grid gap-6">
        <div *ngFor="let offre of filteredOffres" class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ offre.titre }}</h3>
              <p class="text-gray-600">{{ offre.entrepriseNom }} - {{ offre.localisation }}</p>
            </div>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {{ offre.domaine }}
            </span>
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
              <span class="ml-4">Publié le: {{ offre.datePublication | date:'short' }}</span>
            </div>
            <button (click)="postuler(offre)" 
                    class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Postuler
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OffresListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private offresService = inject(OffresService);

  offres: Offre[] = [];
  filteredOffres: Offre[] = [];

  filterForm = this.fb.group({
    domaine: [''],
    duree: [''],
    localisation: ['']
  });

  ngOnInit() {
    this.loadOffres();
  }

  loadOffres() {
    this.offresService.getOffres().subscribe(offres => {
      this.offres = offres;
      this.filteredOffres = offres;
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.filteredOffres = this.offres.filter(offre => {
      return (!filters.domaine || offre.domaine === filters.domaine) &&
             (!filters.duree || offre.duree.toString() === filters.duree) &&
             (!filters.localisation || offre.localisation.toLowerCase().includes(filters.localisation!.toLowerCase()));
    });
  }

  postuler(offre: Offre) {
    // Navigation vers formulaire de candidature
    console.log('Postuler à:', offre.titre);
  }
}