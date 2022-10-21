import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { Posts } from '../../posts/interfaces/posts.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDoc(data: Auth, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection(path: string) {
    const collection = this.firestore.collection(path);
    return collection.valueChanges();
  }

  getCollectionPost<Posts>(path: string) {
    const collection = this.firestore.collection<Posts>(path);
    return collection.valueChanges();
  }

  getDoc<Auth>(path: string, id: string) {
    return this.firestore.collection(path).doc<Auth>(id).valueChanges();
  }

  getPost(path: string, id: string) {
    return this.firestore.collection(path).doc(id).valueChanges();
  }

  updateDoc(path: string, id: string, data: any) {
    return this.firestore.collection(path).doc(id).update(data);
  }

  deleteDoc(path: string, id: string) {
    return this.firestore.collection(path).doc(id).delete();
  }
}
