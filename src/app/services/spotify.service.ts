// src/app/services/spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private clientId = '1f9a658299fc4e25b2ed3645b6d9bff0';
  private clientSecret = 'e855351312b94c539f5f728036dcef53';
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  /**
   * Obtém o token de acesso do Spotify usando o fluxo Client Credentials.
   * Note: Para acessar `me/shows`, é necessário um token autenticado pelo usuário.
   */
  private getAccessToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    });
    const body = 'grant_type=client_credentials';

    return this.http.post<any>(this.tokenUrl, body, { headers }).pipe(
      switchMap((response) => {
        this.accessToken = response.access_token;
        return new Observable<string>((observer) => {
          observer.next(this.accessToken);
          observer.complete();
        });
      }),
      catchError((error) => {
        console.error('Erro ao obter o token de acesso:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Gera os cabeçalhos com o token de autorização.
   * @returns HttpHeaders
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });
  }

  /**
   * Busca podcasts salvos pelo usuário.
   * Endpoint: `https://api.spotify.com/v1/me/shows`
   * @returns Observable<any> - Lista de podcasts.
   */
  getUserPodcasts(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(() => {
        const headers = this.getHeaders();
        return this.http.get(`${this.apiUrl}/me/shows`, { headers });
      }),
      catchError((error) => {
        console.error('Erro ao buscar podcasts salvos pelo usuário:', error);
        return throwError(error);
      })
    );
  }
}
