import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const bookId = localStorage.getItem('selectedBookId');
    if (bookId) {
      this.getBookDetails(bookId);
    }
  }

  getBookDetails(bookId: string) {
    const apiKey = 'AIzaSyBFz4LcC5rzT3uk3s6zQX63FPgB9NzylfY';
    this.http
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`)
      .subscribe((data: any) => {
        this.book = data;
      });
  }
}
