export interface Auth {
  name: string;
  email: string;
  password: string;
  uid: string;
  rol: 'user' | 'admin';
}
