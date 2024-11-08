import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../services/google-books.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {
  books: any[] = [];
  searchTerm: string = '';

  constructor(private googleBooksService: GoogleBooksService) {}

  ngOnInit() {}

  searchBooks() {
    if (this.searchTerm) {
      this.googleBooksService
        .searchBooks(this.searchTerm)
        .subscribe((response) => {
          this.books = response.items || [];
        });
    }
  }
}
