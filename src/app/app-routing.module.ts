import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./cadastro/cadastro.module').then((m) => m.CadastroPageModule),
  },
  {
    path: 'sobre',
    loadChildren: () =>
      import('./sobre/sobre.module').then((m) => m.SobrePageModule),
  },
  {
    path: 'livros',
    loadChildren: () =>
      import('./livros/livros.module').then((m) => m.LivrosPageModule),
  },

  {
    path: 'book-details',
    loadChildren: () =>
      import('./book-details/book-details.module').then(
        (m) => m.BookDetailsPageModule
      ),
  },
  {
    path: 'livros-favoritos',
    loadChildren: () => import('./livros-favoritos/livros-favoritos.module').then( m => m.LivrosFavoritosPageModule)
  },
  {
    path: 'pomodoro',
    loadChildren: () => import('./pomodoro/pomodoro.module').then( m => m.PomodoroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
