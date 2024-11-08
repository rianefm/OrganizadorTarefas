import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivrosPage } from './livros.page';

const routes: Routes = [
  {
    path: '',
    component: LivrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosPageRoutingModule {}
