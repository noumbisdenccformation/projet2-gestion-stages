import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">{{ title }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span>{{ currentUser?.prenom }} {{ currentUser?.nom }}</span>
            <button (click)="logout()" class="text-red-600 hover:text-red-800">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex space-x-8">
          <a *ngFor="let link of navLinks" 
             [routerLink]="link.path" 
             routerLinkActive="bg-indigo-800"
             class="text-white px-3 py-4 hover:bg-indigo-700">
            {{ link.label }}
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Input() title = '';
  @Input() navLinks: {path: string, label: string}[] = [];
  
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.getCurrentUser();

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/demo']);
  }
}