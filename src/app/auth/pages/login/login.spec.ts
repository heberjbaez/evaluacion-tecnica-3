import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

xdescribe('LoginPageComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        provideFirestore(() => getFirestore()),
      ],
      declarations: [LoginComponent],
      providers: [FormBuilder, Firestore],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be return a invalid credentials', () => {
    const mock = {
      email: 'heberjbaez@gmail.com',
      password: 'juniorxd16',
    };

    const email = component.loginForm.get('email');
    const password = component.loginForm.get('password');

    email?.setValue(mock.email);
    password?.setValue(mock.password);

    expect(component.loginForm.invalid).toEqual(true);
  });
});
