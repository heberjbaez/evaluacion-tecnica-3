import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '../interfaces/auth.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AuthService', () => {
  let firestore: Firestore;
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };
  let authFirebase: AngularFireAuth;

  let mockUser = {
    email: 'heberjbaez@gmail.com',
    password: 'juniorxd16',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    const serviceSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(authFirebase, firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should be return data and token user', () => {
    const user = mockUser;
    httpClientSpy.post.and.returnValue(of({ a: 1 }));

    authFirebase
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res);
      });
  });
});
