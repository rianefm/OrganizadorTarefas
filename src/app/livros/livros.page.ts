import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {
  books: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.searchBooks('JavaScript'); 
  }

  searchBooks(query: string) {
    const apiKey = 'AIzaSyBFz4LcC5rzT3uk3s6zQX63FPgB9NzylfY';
    this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
      .subscribe((data: any) => {
        this.books = data.items;
      });
  }

  viewBookDetails(bookId: string) {
    localStorage.setItem('selectedBookId', bookId);
    this.router.navigate(['/book-details']);
  }
}
