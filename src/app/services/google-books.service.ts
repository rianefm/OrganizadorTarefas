import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyBFz4LcC5rzT3uk3s6zQX63FPgB9NzylfY'; 

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
