import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: any;
  safeDescription: SafeHtml | undefined;
  isFavorite = false;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const bookId = localStorage.getItem('selectedBookId');
    if (bookId) {
      this.getBookDetails(bookId);
    }
  }

  getBookDetails(bookId: string) {
    const apiKey = 'AIzaSyBFz4LcC5rzT3uk3s6zQX63FPgB9NzylfY';
    this.http
      .get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`
      )
      .subscribe((data: any) => {
        this.book = data;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
          this.book.volumeInfo.description
        );
        this.checkIfFavorite();
      });
  }

  checkIfFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some((fav: any) => fav.id === this.book.id);
  }

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (this.isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== this.book.id
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = {
        id: this.book.id,
        title: this.book.volumeInfo.title,
        image: this.book.volumeInfo.imageLinks?.thumbnail,
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    this.isFavorite = !this.isFavorite;
  }
}
