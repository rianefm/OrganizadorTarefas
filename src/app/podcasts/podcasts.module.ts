import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodcastsPageRoutingModule } from './podcasts-routing.module';

import { PodcastsPage } from './podcasts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastsPageRoutingModule
  ],
  declarations: [PodcastsPage]
})
export class PodcastsPageModule {}
