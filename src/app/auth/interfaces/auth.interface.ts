export interface Auth {
  nombre: string;
  email: string;
  password: string;
  uid: string;
  rol: 'user' | 'admin';
}
