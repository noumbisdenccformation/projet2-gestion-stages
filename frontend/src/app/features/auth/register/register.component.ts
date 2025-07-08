import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Inscription</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-4">
            <select formControlName="role" class="w-full p-3 border border-gray-300 rounded-md">
              <option value="">Sélectionner un rôle</option>
              <option value="ETUDIANT">Étudiant</option>
              <option value="ENTREPRISE">Entreprise</option>
              <option value="ENSEIGNANT">Enseignant</option>
            </select>
            
            <input formControlName="email" type="email" placeholder="Email" 
                   class="w-full p-3 border border-gray-300 rounded-md">
            
            <input formControlName="password" type="password" placeholder="Mot de passe" 
                   class="w-full p-3 border border-gray-300 rounded-md">
            
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="nom" placeholder="Nom" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              <input formControlName="prenom" placeholder="Prénom" 
                     class="w-full p-3 border border-gray-300 rounded-md">
            </div>

            <!-- Champs spécifiques Étudiant -->
            <div *ngIf="registerForm.get('role')?.value === 'ETUDIANT'" class="space-y-4">
              <input formControlName="filiere" placeholder="Filière" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              <select formControlName="niveau" class="w-full p-3 border border-gray-300 rounded-md">
                <option value="">Niveau d'études</option>
                <option value="L1">Licence 1</option>
                <option value="L2">Licence 2</option>
                <option value="L3">Licence 3</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
              </select>
            </div>

            <!-- Champs spécifiques Entreprise -->
            <div *ngIf="registerForm.get('role')?.value === 'ENTREPRISE'" class="space-y-4">
              <input formControlName="nomEntreprise" placeholder="Nom de l'entreprise" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              <input formControlName="secteur" placeholder="Secteur d'activité" 
                     class="w-full p-3 border border-gray-300 rounded-md">
            </div>

            <!-- Champs spécifiques Enseignant -->
            <div *ngIf="registerForm.get('role')?.value === 'ENSEIGNANT'" class="space-y-4">
              <input formControlName="departement" placeholder="Département" 
                     class="w-full p-3 border border-gray-300 rounded-md">
              <input formControlName="specialite" placeholder="Spécialité" 
                     class="w-full p-3 border border-gray-300 rounded-md">
            </div>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || loading"
                  class="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50">
            {{ loading ? 'Inscription...' : "S'inscrire" }}
          </button>

          <div class="text-center">
            <a routerLink="/auth/login" class="text-indigo-600 hover:text-indigo-500">
              Déjà un compte ? Se connecter
            </a>
          </div>

          <div *ngIf="error" class="text-red-600 text-center">{{ error }}</div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  registerForm = this.fb.group({
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    filiere: [''],
    niveau: [''],
    nomEntreprise: [''],
    secteur: [''],
    departement: [''],
    specialite: ['']
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: (err) => {
          this.error = 'Erreur lors de l\'inscription';
          this.loading = false;
        }
      });
    }
  }
}