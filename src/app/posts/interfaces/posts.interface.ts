import { Auth } from 'src/app/auth/interfaces/user.interface';

export interface Posts {
  title: string;
  body: string;
  author: Auth;
  postId: string;
  date: Date;
}
