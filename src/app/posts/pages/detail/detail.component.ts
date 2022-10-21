import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Posts } from 'src/app/posts/interfaces/posts.interface';
import { PostsService } from 'src/app/posts/services/posts.service';
import Swal from 'sweetalert2';
import { FirestoreService } from '../../../auth/services/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  post!: any;
  lastComment = '';
  loading: boolean = false;

  newCommentForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    postId: [this.firestore.getId()],
    author: [],
    date: [],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private firestore: FirestoreService,
    private fb: FormBuilder
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

  newComment() {}

  viewLastComment(data: string) {
    this.lastComment = data;
  }

  async saveNewComment() {
    const datePublishedPost = new Date();
    this.newCommentForm.value.date = datePublishedPost;
    const path = 'Posts/' + this.post.postId + '/Comments/';

    await this.firestore.createDoc(
      this.newCommentForm.value,
      path,
      this.newCommentForm.value.postId
    );

    this.loading = false;
    Swal.fire('Comentario creado con exito!');
  }

  editComment(post: Posts) {
    this.newCommentForm.setValue(post);
  }
}
