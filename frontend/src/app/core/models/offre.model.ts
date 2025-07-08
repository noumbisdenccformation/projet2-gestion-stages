export interface Offre {
  id: number;
  titre: string;
  description: string;
  entrepriseId: number;
  entrepriseNom: string;
  secteur: string;
  domaine: string;
  duree: number;
  localisation: string;
  competencesRequises: string[];
  datePublication: Date;
  dateDebut: Date;
  dateFin: Date;
  statut: OffreStatut;
  salaire?: number;
}

export interface Candidature {
  id: number;
  offreId: number;
  etudiantId: number;
  lettreMotivation: string;
  cvPath: string;
  statut: CandidatureStatut;
  datePostulation: Date;
  feedback?: string;
}

export type OffreStatut = 'ACTIVE' | 'FERMEE' | 'POURVUE';
export type CandidatureStatut = 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';