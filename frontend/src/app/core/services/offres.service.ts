import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre, Candidature } from '../models/offre.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffresService {
  private http = inject(HttpClient);

  getOffres(filters?: any): Observable<Offre[]> {
    let url = `${environment.apiUrl}/offres`;
    if (filters) {
      const params = new URLSearchParams(filters).toString();
      url += `?${params}`;
    }
    return this.http.get<Offre[]>(url);
  }

  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${environment.apiUrl}/offres/${id}`);
  }

  createOffre(offre: Partial<Offre>): Observable<Offre> {
    return this.http.post<Offre>(`${environment.apiUrl}/offres`, offre);
  }

  updateOffre(id: number, offre: Partial<Offre>): Observable<Offre> {
    return this.http.put<Offre>(`${environment.apiUrl}/offres/${id}`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/offres/${id}`);
  }

  postuler(offreId: number, candidature: Partial<Candidature>): Observable<Candidature> {
    return this.http.post<Candidature>(`${environment.apiUrl}/offres/${offreId}/candidatures`, candidature);
  }

  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${environment.apiUrl}/candidatures`);
  }
}