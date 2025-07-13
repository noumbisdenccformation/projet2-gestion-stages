import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { OffresService } from '../../../core/services/offres.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nouvelle-offre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar 
        title="Nouvelle Offre de Stage" 
        [navLinks]="navLinks">
      </app-navbar>
      
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <form [formGroup]="offreForm" (ngSubmit)="creerOffre()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Titre -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Titre du stage *</label>
                <input formControlName="titre" type="text" 
                       class="w-full p-3 border border-gray-300 rounded-md"
                       placeholder="Ex: Stage Développeur Web">
              </div>

              <!-- Domaine -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Domaine *</label>
                <select formControlName="domaine" class="w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Sélectionner un domaine</option>
                  <option value="informatique">Informatique</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="rh">Ressources Humaines</option>
                  <option value="ingenierie">Ingénierie</option>
                </select>
              </div>

              <!-- Durée -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Durée (mois) *</label>
                <select formControlName="duree" class="w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Sélectionner</option>
                  <option value="1">1 mois</option>
                  <option value="2">2 mois</option>
                  <option value="3">3 mois</option>
                  <option value="4">4 mois</option>
                  <option value="5">5 mois</option>
                  <option value="6">6 mois</option>
                </select>
              </div>

              <!-- Localisation -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
                <select formControlName="localisation" class="w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Sélectionner une ville</option>
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Nkongsamba">Nkongsamba</option>
                  <option value="Garoua">Garoua</option>
                  <option value="Bamenda">Bamenda</option>
                </select>
              </div>

              <!-- Secteur -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Secteur *</label>
                <input formControlName="secteur" type="text" 
                       class="w-full p-3 border border-gray-300 rounded-md"
                       placeholder="Ex: Technologies">
              </div>

              <!-- Description -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea formControlName="description" rows="4" 
                          class="w-full p-3 border border-gray-300 rounded-md"
                          placeholder="Décrivez les missions du stage..."></textarea>
              </div>

              <!-- Compétences -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Compétences requises</label>
                <input formControlName="competences" type="text" 
                       class="w-full p-3 border border-gray-300 rounded-md"
                       placeholder="Ex: JavaScript, React, Node.js (séparées par des virgules)">
              </div>

              <!-- Dates -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de début *</label>
                <input formControlName="dateDebut" type="date" 
                       class="w-full p-3 border border-gray-300 rounded-md">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin *</label>
                <input formControlName="dateFin" type="date" 
                       class="w-full p-3 border border-gray-300 rounded-md">
              </div>

              <!-- Salaire -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Salaire (optionnel)</label>
                <input formControlName="salaire" type="number" 
                       class="w-full p-3 border border-gray-300 rounded-md"
                       placeholder="Montant en FCFA">
              </div>
            </div>

            <!-- Boutons -->
            <div class="flex justify-end space-x-4 mt-8">
              <button type="button" (click)="annuler()" 
                      class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit" [disabled]="offreForm.invalid || loading"
                      class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                {{ loading ? 'Création...' : 'Publier l\'offre' }}
              </button>
            </div>
          </form>

          <!-- Message -->
          <div *ngIf="message" class="mt-4 p-3 rounded-md" 
               [class]="messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class NouvelleOffreComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private offresService = inject(OffresService);
  private authService = inject(AuthService);

  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  
  navLinks = [
    { path: '/entreprise', label: 'Accueil' },
    { path: '/entreprise/offres', label: 'Mes offres' },
    { path: '/entreprise/candidatures', label: 'Candidatures' }
  ];

  offreForm = this.fb.group({
    titre: ['', [Validators.required, Validators.minLength(5)]],
    domaine: ['', Validators.required],
    duree: ['', Validators.required],
    localisation: ['', Validators.required],
    secteur: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]],
    competences: [''],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    salaire: ['']
  });

  creerOffre() {
    if (this.offreForm.valid) {
      this.loading = true;
      const currentUser = this.authService.getCurrentUser();
      
      const formValue = this.offreForm.value;
      const offreData = {
        titre: formValue.titre || '',
        domaine: formValue.domaine || '',
        duree: parseInt(formValue.duree || '0'),
        localisation: formValue.localisation || '',
        secteur: formValue.secteur || '',
        description: formValue.description || '',
        dateDebut: new Date(formValue.dateDebut || ''),
        dateFin: new Date(formValue.dateFin || ''),
        entrepriseId: currentUser?.id || 0,
        entrepriseNom: currentUser?.nom || 'Entreprise',
        competencesRequises: formValue.competences ? 
          formValue.competences.split(',').map(c => c.trim()) : [],
        datePublication: new Date(),
        statut: 'ACTIVE' as any,
        salaire: formValue.salaire ? parseFloat(formValue.salaire) : undefined
      };

      this.offresService.createOffre(offreData).subscribe({
        next: () => {
          this.message = 'Offre créée avec succès !';
          this.messageType = 'success';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/entreprise/offres']);
          }, 2000);
        },
        error: () => {
          this.message = 'Erreur lors de la création de l\'offre';
          this.messageType = 'error';
          this.loading = false;
        }
      });
    }
  }

  annuler() {
    this.router.navigate(['/entreprise/offres']);
  }
}