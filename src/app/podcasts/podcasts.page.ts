// src/app/pages/podcasts/podcasts.page.ts
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.page.html',
  styleUrls: ['./podcasts.page.scss'],
})
export class PodcastsPage implements OnInit {
  searchTerm: string = '';
  podcasts: any[] = [];

  constructor(
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {}

  searchPodcasts() {
    if (this.searchTerm.trim() === '') return;

    // Busca no Spotify
    this.spotifyService.searchPodcasts(this.searchTerm).subscribe((data: any) => {
      this.podcasts = [...this.podcasts, ...data.shows.items];
    });
  }
}
