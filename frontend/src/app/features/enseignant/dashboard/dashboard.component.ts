import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enseignant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow mb-8">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard Enseignant</h1>
        </div>
      </header>
      
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a routerLink="/enseignant/conventions" 
             class="block p-6 bg-white rounded-lg shadow hover:shadow-md">
            <h3 class="text-lg font-semibold mb-2">Conventions à valider</h3>
            <p class="text-gray-600">Gérer les conventions de stage</p>
          </a>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}