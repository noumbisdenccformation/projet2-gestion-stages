import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-comptes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Gestion des Comptes</h1>
        </div>
      </header>
      
      <div class="max-w-7xl mx-auto px-4">
        <p class="text-gray-600">Interface de gestion des comptes en cours de développement...</p>
      </div>
    </div>
  `
})
export class GestionComptesComponent {}