// // src/app/services/listen-notes.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ListenNotesService {
//   private apiUrl = 'https://listen-api.listennotes.com/api/v2';
//   private apiKey = 'SUA_CHAVE_DA_API'; // Substitua pela sua chave de API

//   constructor(private http: HttpClient) {}

//   searchPodcasts(query: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'X-ListenAPI-Key': this.apiKey,
//     });
//     return this.http.get(`${this.apiUrl}/search?q=${query}`, { headers });
//   }
// }
