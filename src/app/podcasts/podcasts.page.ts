import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})
export class PodcastsPage {
  searchTerm: string = '';
  podcasts: any[] = [];
  errorMessage: string = '';

  constructor(private spotifyService: SpotifyService) {}

  searchPodcasts() {
    if (this.searchTerm.trim() === '') {
      this.errorMessage = 'Por favor, insira um termo de busca.';
      return;
    }

    // Corrigindo para o método correto
    this.spotifyService.getUserPodcasts().subscribe(
      (response) => {
        this.podcasts = response.items; // Ajuste conforme o formato da resposta da API
        this.errorMessage = '';
      },
      (error: any) => {
        console.error('Erro ao buscar podcasts:', error);
        this.errorMessage = 'Não foi possível carregar os podcasts. Tente novamente.';
      }
    );
  }
}
