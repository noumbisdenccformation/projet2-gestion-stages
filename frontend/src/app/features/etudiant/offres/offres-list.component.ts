import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Offre } from '../../../core/models/offre.model';
import { OffresService } from '../../../core/services/offres.service';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-offres-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Offres de Stage" 
        [navLinks]="navLinks">
      </app-navbar>
      
      <div class="container mx-auto px-4 py-8">
      
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
            <button (click)="openCandidatureModal(offre)" 
                    class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Postuler
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de candidature -->
      <div *ngIf="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold mb-4">Postuler pour: {{ selectedOffre?.titre }}</h3>
          
          <form [formGroup]="candidatureForm" (ngSubmit)="submitCandidature()">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Lettre de motivation</label>
              <textarea formControlName="lettreMotivation" rows="4" 
                        class="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Expliquez pourquoi vous êtes intéressé par ce stage..."></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">CV (fichier PDF)</label>
              <input type="file" accept=".pdf" (change)="onFileSelected($event)"
                     class="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
              <p class="text-sm text-gray-500 mt-1">Fichier sélectionné: {{ selectedFileName || 'Aucun fichier' }}</p>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button type="button" (click)="closeModal()" 
                      class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit" [disabled]="candidatureForm.invalid || !selectedFile || loading"
                      class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
                {{ loading ? 'Envoi...' : 'Envoyer ma candidature' }}
              </button>
            </div>
          </form>
          
          <div *ngIf="message" class="mt-4 p-3 rounded-md" 
               [class]="messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class OffresListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private offresService = inject(OffresService);
  private authService = inject(AuthService);

  offres: Offre[] = [];
  filteredOffres: Offre[] = [];
  showModal = false;
  selectedOffre: Offre | null = null;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  selectedFileName = '';
  selectedFile: File | null = null;
  
  navLinks = [
    { path: '/etudiant', label: 'Accueil' },
    { path: '/etudiant/offres', label: 'Offres de stage' },
    { path: '/etudiant/candidatures', label: 'Mes candidatures' }
  ];

  filterForm = this.fb.group({
    domaine: [''],
    duree: [''],
    localisation: ['']
  });

  candidatureForm = this.fb.group({
    lettreMotivation: ['', [Validators.required, Validators.minLength(50)]]
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

  openCandidatureModal(offre: Offre) {
    this.selectedOffre = offre;
    this.showModal = true;
    this.message = '';
    this.selectedFileName = '';
    this.selectedFile = null;
    this.candidatureForm.reset();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      if (file) {
        alert('Veuillez sélectionner un fichier PDF uniquement.');
      }
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedOffre = null;
    this.message = '';
  }

  submitCandidature() {
    if (this.candidatureForm.valid && this.selectedFile && this.selectedOffre) {
      this.loading = true;
      const currentUser = this.authService.getCurrentUser();
      
      const formValue = this.candidatureForm.value;
      const candidatureData = {
        lettreMotivation: formValue.lettreMotivation || '',
        cvPath: this.selectedFileName,
        etudiantId: currentUser?.id || 0,
        statut: 'EN_ATTENTE' as any,
        datePostulation: new Date()
      };

      this.offresService.postuler(this.selectedOffre.id, candidatureData).subscribe({
        next: () => {
          this.message = 'Candidature envoyée avec succès !';
          this.messageType = 'success';
          this.loading = false;
          setTimeout(() => this.closeModal(), 2000);
        },
        error: () => {
          this.message = 'Erreur lors de l\'envoi de la candidature';
          this.messageType = 'error';
          this.loading = false;
        }
      });
    }
  }
}