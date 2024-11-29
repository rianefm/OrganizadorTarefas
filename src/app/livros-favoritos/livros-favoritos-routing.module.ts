import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivrosFavoritosPage } from './livros-favoritos.page';

const routes: Routes = [
  {
    path: '',
    component: LivrosFavoritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosFavoritosPageRoutingModule {}
