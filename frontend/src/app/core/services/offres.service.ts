import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Offre, Candidature } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffresService {
  private mockOffres: Offre[] = [
    // Informatique
    {
      id: 1,
      titre: 'Stage Développeur Full Stack',
      description: 'Développement d\'applications web avec Angular et Spring Boot',
      entrepriseId: 2,
      entrepriseNom: 'TechCorp',
      secteur: 'Informatique',
      domaine: 'informatique',
      duree: 3,
      localisation: 'Douala',
      competencesRequises: ['Angular', 'Spring Boot', 'PostgreSQL'],
      datePublication: new Date('2024-01-01'),
      dateDebut: new Date('2024-03-01'),
      dateFin: new Date('2024-06-01'),
      statut: 'ACTIVE'
    },
    {
      id: 2,
      titre: 'Stage Développeur Mobile',
      description: 'Création d\'applications mobiles iOS et Android avec React Native',
      entrepriseId: 4,
      entrepriseNom: 'MobileTech',
      secteur: 'Informatique',
      domaine: 'informatique',
      duree: 4,
      localisation: 'Yaoundé',
      competencesRequises: ['React Native', 'JavaScript', 'Firebase'],
      datePublication: new Date('2024-01-08'),
      dateDebut: new Date('2024-03-15'),
      dateFin: new Date('2024-07-15'),
      statut: 'ACTIVE'
    },
    // Marketing
    {
      id: 3,
      titre: 'Stage Marketing Digital',
      description: 'Gestion des campagnes publicitaires et analyse des performances',
      entrepriseId: 3,
      entrepriseNom: 'MarketPro',
      secteur: 'Marketing',
      domaine: 'marketing',
      duree: 6,
      localisation: 'Bafoussam',
      competencesRequises: ['Google Ads', 'Analytics', 'SEO'],
      datePublication: new Date('2024-01-05'),
      dateDebut: new Date('2024-02-15'),
      dateFin: new Date('2024-08-15'),
      statut: 'ACTIVE'
    },
    {
      id: 4,
      titre: 'Stage Communication & Réseaux Sociaux',
      description: 'Gestion des réseaux sociaux et création de contenu marketing',
      entrepriseId: 5,
      entrepriseNom: 'SocialBoost',
      secteur: 'Marketing',
      domaine: 'marketing',
      duree: 3,
      localisation: 'Nkongsamba',
      competencesRequises: ['Community Management', 'Photoshop', 'Canva'],
      datePublication: new Date('2024-01-12'),
      dateDebut: new Date('2024-04-01'),
      dateFin: new Date('2024-07-01'),
      statut: 'ACTIVE'
    },
    // Finance
    {
      id: 5,
      titre: 'Stage Analyste Financier',
      description: 'Analyse des marchés financiers et gestion de portefeuille',
      entrepriseId: 6,
      entrepriseNom: 'FinanceExpert',
      secteur: 'Finance',
      domaine: 'finance',
      duree: 6,
      localisation: 'Douala',
      competencesRequises: ['Excel', 'Bloomberg', 'Analyse financière'],
      datePublication: new Date('2024-01-10'),
      dateDebut: new Date('2024-03-01'),
      dateFin: new Date('2024-09-01'),
      statut: 'ACTIVE'
    },
    {
      id: 6,
      titre: 'Stage Contrôleur de Gestion',
      description: 'Suivi budgétaire et reporting financier',
      entrepriseId: 7,
      entrepriseNom: 'ControlFin',
      secteur: 'Finance',
      domaine: 'finance',
      duree: 4,
      localisation: 'Garoua',
      competencesRequises: ['SAP', 'Excel', 'Comptabilité'],
      datePublication: new Date('2024-01-15'),
      dateDebut: new Date('2024-04-15'),
      dateFin: new Date('2024-08-15'),
      statut: 'ACTIVE'
    },
    // Ressources Humaines
    {
      id: 7,
      titre: 'Stage Recrutement & Talent Acquisition',
      description: 'Participation au processus de recrutement et sourcing de candidats',
      entrepriseId: 8,
      entrepriseNom: 'HRSolutions',
      secteur: 'Ressources Humaines',
      domaine: 'rh',
      duree: 3,
      localisation: 'Bamenda',
      competencesRequises: ['LinkedIn Recruiter', 'Entretiens', 'ATS'],
      datePublication: new Date('2024-01-18'),
      dateDebut: new Date('2024-03-20'),
      dateFin: new Date('2024-06-20'),
      statut: 'ACTIVE'
    },
    {
      id: 8,
      titre: 'Stage Formation & Développement RH',
      description: 'Conception de programmes de formation et gestion des compétences',
      entrepriseId: 9,
      entrepriseNom: 'TalentDev',
      secteur: 'Ressources Humaines',
      domaine: 'rh',
      duree: 5,
      localisation: 'Maroua',
      competencesRequises: ['Ingénierie pédagogique', 'SIRH', 'Gestion projet'],
      datePublication: new Date('2024-01-20'),
      dateDebut: new Date('2024-04-01'),
      dateFin: new Date('2024-09-01'),
      statut: 'ACTIVE'
    },
    // Ingénierie
    {
      id: 9,
      titre: 'Stage Ingénieur Mécanique',
      description: 'Conception et développement de pièces mécaniques avec CAO',
      entrepriseId: 10,
      entrepriseNom: 'MecaTech',
      secteur: 'Ingénierie',
      domaine: 'ingenierie',
      duree: 6,
      localisation: 'Bertoua',
      competencesRequises: ['SolidWorks', 'AutoCAD', 'Résistance des matériaux'],
      datePublication: new Date('2024-01-22'),
      dateDebut: new Date('2024-02-01'),
      dateFin: new Date('2024-08-01'),
      statut: 'ACTIVE'
    },
    {
      id: 10,
      titre: 'Stage Ingénieur Électronique',
      description: 'Développement de circuits électroniques et systèmes embarqués',
      entrepriseId: 11,
      entrepriseNom: 'ElectroSys',
      secteur: 'Ingénierie',
      domaine: 'ingenierie',
      duree: 4,
      localisation: 'Ebolowa',
      competencesRequises: ['Altium Designer', 'C/C++', 'Microcontrôleurs'],
      datePublication: new Date('2024-01-25'),
      dateDebut: new Date('2024-03-10'),
      dateFin: new Date('2024-07-10'),
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
    
    return of(filteredOffres).pipe(delay(300));
  }

  getOffreById(id: number): Observable<Offre> {
    const offre = this.mockOffres.find(o => o.id === id);
    return of(offre!).pipe(delay(200));
  }

  createOffre(offre: Partial<Offre>): Observable<Offre> {
    const newOffre: Offre = {
      ...offre as Offre,
      id: this.mockOffres.length + 1
    };
    this.mockOffres.push(newOffre);
    return of(newOffre).pipe(delay(500));
  }

  updateOffre(id: number, offre: Partial<Offre>): Observable<Offre> {
    const index = this.mockOffres.findIndex(o => o.id === id);
    if (index !== -1) {
      this.mockOffres[index] = { ...this.mockOffres[index], ...offre };
      return of(this.mockOffres[index]).pipe(delay(400));
    }
    throw new Error('Offre non trouvée');
  }

  deleteOffre(id: number): Observable<void> {
    const index = this.mockOffres.findIndex(o => o.id === id);
    if (index !== -1) {
      this.mockOffres.splice(index, 1);
    }
    return of(void 0).pipe(delay(300));
  }

  postuler(offreId: number, candidature: Partial<Candidature>): Observable<Candidature> {
    const newCandidature: Candidature = {
      ...candidature as Candidature,
      id: Date.now(),
      offreId
    };
    return of(newCandidature).pipe(delay(800));
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
    return of(mockCandidatures).pipe(delay(300));
  }
}