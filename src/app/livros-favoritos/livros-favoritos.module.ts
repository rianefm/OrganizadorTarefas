import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivrosFavoritosPageRoutingModule } from './livros-favoritos-routing.module';

import { LivrosFavoritosPage } from './livros-favoritos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivrosFavoritosPageRoutingModule
  ],
  declarations: [LivrosFavoritosPage]
})
export class LivrosFavoritosPageModule {}
