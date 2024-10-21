import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa o AngularFireAuth
import firebase from 'firebase/compat/app'; // Importa o Firebase
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { } // Injeta o serviço de autenticação e o roteador

  ngOnInit() {}

  // Método para fazer login com Google
  loginWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('Login bem-sucedido:', result);
        this.router.navigate(['/home']); // Redireciona para a página inicial após o login
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  }

}
