import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MockAuthService } from '../../../core/services/mock-auth.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-2xl w-full space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">
            🎯 Projet - Gestion des Stages
          </h2>
          <p class="mt-2 text-gray-600">Choisissez un rôle pour tester</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🎓
            </div>
            <h3 class="text-lg font-semibold">Étudiant</h3>
            <p class="text-sm text-gray-600 mb-4">Rechercher des stages</p>
            <div class="text-xs text-gray-500 mb-4">
              <p>Email: etudiant&#64;test.com</p>
              <p>Mot de passe: 123456</p>
            </div>
            <button (click)="loginAs('etudiant@test.com', '123456')"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Se connecter
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🏢
            </div>
            <h3 class="text-lg font-semibold">Entreprise</h3>
            <p class="text-sm text-gray-600 mb-4">Publier des offres</p>
            <div class="text-xs text-gray-500 mb-4">
              <p>Email: entreprise&#64;test.com</p>
              <p>Mot de passe: 123456</p>
            </div>
            <button (click)="loginAs('entreprise@test.com', '123456')"
                    class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Se connecter
            </button>
          </div>
        </div>

        <div class="text-center">
          <a routerLink="/auth/login" class="text-indigo-600 hover:text-indigo-500">
            ← Connexion manuelle
          </a>
        </div>
      </div>
    </div>
  `
})
export class DemoComponent {
  private mockAuthService = inject(MockAuthService);
  private router = inject(Router);

  loginAs(email: string, password: string) {
    this.mockAuthService.login(email, password).subscribe({
      next: (response) => {
        const userRole = response.user.role.toLowerCase();
        this.router.navigate([`/${userRole}`]);
      }
    });
  }
}