import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
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
    private firestore: Firestore,
    private authFirebase: AngularFireAuth
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
}
