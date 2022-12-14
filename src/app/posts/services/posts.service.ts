import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../interfaces/posts.interface';
import { Comments } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl: string = 'https://heber-baez-endpoint.herokuapp.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts[]> {
    const url = `${this.apiUrl}/posts`;
    return this.http.get<Posts[]>(url);
  }

  getPostDetail(id: string): Observable<Posts> {
    const url = `${this.apiUrl}/posts/${id}`;
    return this.http.get<Posts>(url);
  }

  getPostComments(postId: number): Observable<Comments[]> {
    const url = `${this.apiUrl}/comments?postId=${postId}`;
    return this.http.get<Comments[]>(url);
  }

  addPostComments(postId: number, comment: Comments): Observable<Comments[]> {
    const url = `${this.apiUrl}/comments?postId=${postId}`;
    return this.http.post<Comments[]>(url, comment);
  }

  editComments(Id: number, comment: Comments): Observable<Comments> {
    const url = `${this.apiUrl}/comments?id=${Id}`;
    return this.http.put<Comments>(url, comment);
  }

  deleteComments(Id: number): Observable<Comments> {
    const url = `${this.apiUrl}/comments?id=${Id}`;
    return this.http.delete<Comments>(url);
  }
}
