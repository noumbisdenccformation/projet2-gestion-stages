import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Offre, Candidature } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class MockOffresService {
  private mockOffres: Offre[] = [
    {
      id: 1,
      titre: 'Stage Développeur Full Stack',
      description: 'Développement d\'applications web avec Angular et Spring Boot',
      entrepriseId: 2,
      entrepriseNom: 'TechCorp',
      secteur: 'Informatique',
      domaine: 'informatique',
      duree: 3,
      localisation: 'Paris',
      competencesRequises: ['Angular', 'Spring Boot', 'PostgreSQL'],
      datePublication: new Date('2024-01-01'),
      dateDebut: new Date('2024-03-01'),
      dateFin: new Date('2024-06-01'),
      statut: 'ACTIVE'
    },
    {
      id: 2,
      titre: 'Stage Marketing Digital',
      description: 'Gestion des campagnes publicitaires et analyse des performances',
      entrepriseId: 3,
      entrepriseNom: 'MarketPro',
      secteur: 'Marketing',
      domaine: 'marketing',
      duree: 6,
      localisation: 'Lyon',
      competencesRequises: ['Google Ads', 'Analytics', 'SEO'],
      datePublication: new Date('2024-01-05'),
      dateDebut: new Date('2024-02-15'),
      dateFin: new Date('2024-08-15'),
      statut: 'ACTIVE'
    }
  ];

  getOffres(filters?: any): Observable<Offre[]> {
    let filteredOffres = [...this.mockOffres];
    
    if (filters) {
      if (filters.domaine) {
        filteredOffres = filteredOffres.filter(o => o.domaine === filters.domaine);
      }
      if (filters.duree) {
        filteredOffres = filteredOffres.filter(o => o.duree.toString() === filters.duree);
      }
      if (filters.localisation) {
        filteredOffres = filteredOffres.filter(o => 
          o.localisation.toLowerCase().includes(filters.localisation.toLowerCase())
        );
      }
    }
    
    return of(filteredOffres).pipe(delay(500));
  }

  getOffreById(id: number): Observable<Offre> {
    const offre = this.mockOffres.find(o => o.id === id);
    return of(offre!).pipe(delay(300));
  }

  createOffre(offre: Partial<Offre>): Observable<Offre> {
    const newOffre: Offre = {
      id: this.mockOffres.length + 1,
      ...offre as Offre
    };
    this.mockOffres.push(newOffre);
    return of(newOffre).pipe(delay(800));
  }

  getCandidatures(): Observable<Candidature[]> {
    const mockCandidatures: Candidature[] = [
      {
        id: 1,
        offreId: 1,
        etudiantId: 1,
        lettreMotivation: 'Je suis très intéressé par ce poste...',
        cvPath: 'cv_jean_dupont.pdf',
        statut: 'EN_ATTENTE',
        datePostulation: new Date('2024-01-10')
      }
    ];
    return of(mockCandidatures).pipe(delay(400));
  }

  postuler(offreId: number, candidature: Partial<Candidature>): Observable<Candidature> {
    const newCandidature: Candidature = {
      id: Date.now(),
      offreId,
      ...candidature as Candidature
    };
    return of(newCandidature).pipe(delay(1000));
  }
}