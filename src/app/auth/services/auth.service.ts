import { Injectable } from '@angular/core';

import { Auth } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authFirebase: AngularFireAuth,
    private firestore: Firestore
  ) {}

  addUser(user: Auth) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

  getUser(): Observable<Auth[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<Auth[]>;
  }

  registerUser(data: Auth) {
    return this.authFirebase.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  logOut() {
    this.authFirebase.signOut();
  }

  stateUser() {
    return this.authFirebase.authState;
  }

  async getUid() {
    const user = await this.authFirebase.currentUser;
    if (user) {
      return user.uid;
    } else {
      return undefined;
    }
  }
}
