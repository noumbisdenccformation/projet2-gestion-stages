export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  telephone?: string;
  adresse?: string;
}

export interface Etudiant extends User {
  filiere: string;
  niveau: string;
  cv?: string;
}

export interface Entreprise extends User {
  nomEntreprise: string;
  secteur: string;
  siren: string;
  adresseSiege: string;
}

export interface Enseignant extends User {
  departement: string;
  specialite: string;
}

export type UserRole = 'ETUDIANT' | 'ENTREPRISE' | 'ENSEIGNANT' | 'ADMIN';

export interface AuthResponse {
  token: string;
  user: User;
}