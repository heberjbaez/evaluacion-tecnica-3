import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Posts } from 'src/app/posts/interfaces/posts.interface';
import { PostsService } from 'src/app/posts/services/posts.service';
import { FirestoreService } from '../../../auth/services/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  post!: any;
  lastComment = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.viewDetails();
  }

  viewDetails() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.firestore.getPost('Posts', id)))
      .subscribe((post) => {
        this.post = post;
      });
  }

  viewLastComment(data: string) {
    this.lastComment = data;
  }
}
