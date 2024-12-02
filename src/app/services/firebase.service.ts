import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async createUser(user: any) {
    const userRef = collection(this.firestore, 'users');
    return await addDoc(userRef, user);
  }
}
