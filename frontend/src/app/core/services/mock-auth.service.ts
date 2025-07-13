import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Utilisateurs de test
  private mockUsers = [
    { id: 1, email: 'etudiant@test.com', password: '123456', nom: 'Dupont', prenom: 'Jean', role: 'ETUDIANT' as const },
    { id: 2, email: 'entreprise@test.com', password: '123456', nom: 'Martin', prenom: 'Sophie', role: 'ENTREPRISE' as const },
    { id: 3, email: 'enseignant@test.com', password: '123456', nom: 'Durand', prenom: 'Pierre', role: 'ENSEIGNANT' as const },
    { id: 4, email: 'admin@test.com', password: '123456', nom: 'Admin', prenom: 'System', role: 'ADMIN' as const }
  ];

  login(email: string, password: string): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = 'mock-jwt-token-' + user.id;
      const authResponse: AuthResponse = {
        token,
        user: { ...user }
      };
      
      localStorage.setItem('token', token);
      this.currentUserSubject.next(user);
      
      return of(authResponse).pipe(delay(1000)); // Simule délai réseau
    }
    
    return throwError(() => new Error('Identifiants incorrects')).pipe(delay(1000));
  }

  register(userData: any): Observable<AuthResponse> {
    const newUser = {
      id: this.mockUsers.length + 1,
      ...userData
    };
    
    this.mockUsers.push(newUser);
    
    return of({
      token: 'mock-jwt-token-' + newUser.id,
      user: newUser
    }).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }
}