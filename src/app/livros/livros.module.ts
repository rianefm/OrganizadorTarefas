import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivrosPageRoutingModule } from './livros-routing.module';

import { LivrosPage } from './livros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivrosPageRoutingModule
  ],
  declarations: [LivrosPage]
})
export class LivrosPageModule {}
