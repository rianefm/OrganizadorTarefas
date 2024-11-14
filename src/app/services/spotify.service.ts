// src/app/services/spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private clientId = '1f9a658299fc4e25b2ed3645b6d9bff0';
  private clientSecret = 'e855351312b94c539f5f728036dcef53';
  private accessToken!: string;

  constructor(private http: HttpClient) {
    this.getAccessToken().subscribe(token => this.accessToken = token.access_token);
  }

  private getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });
    const body = 'grant_type=client_credentials';
    return this.http.post('https://accounts.spotify.com/api/token', body, { headers });
  }

  searchPodcasts(query: string): Observable<any> {
    if (!this.accessToken) {
      return this.getAccessToken().pipe(
        switchMap((token: any) => { 
          this.accessToken = token.access_token;
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.accessToken,
          });
          return this.http.get(`${this.apiUrl}/search?q=${query}&type=show`, { headers });
        })
      );
    } else {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.accessToken,
      });
      return this.http.get(`${this.apiUrl}/search?q=${query}&type=show`, { headers });
    }
  }
}
