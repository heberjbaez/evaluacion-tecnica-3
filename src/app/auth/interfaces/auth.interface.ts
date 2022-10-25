export interface Auth {
  username: string;
  name: string;
  email: string;
  password: string;
  uid: string;
  rol: 'user' | 'admin';
  img?: string;
}
