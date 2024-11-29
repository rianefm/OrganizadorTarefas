import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-livros-favoritos',
  templateUrl: './livros-favoritos.page.html',
  styleUrls: ['./livros-favoritos.page.scss'],
})
export class LivrosFavoritosPage implements OnInit {
  favoriteBooks: any[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    this.favoriteBooks = favorites ? JSON.parse(favorites) : [];
  }

  removeFavorite(bookId: string) {
    const updatedFavorites = this.favoriteBooks.filter(
      (book) => book.id !== bookId
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    this.favoriteBooks = updatedFavorites;
  }

  navigateBack() {
    this.navCtrl.back();
  }
}
