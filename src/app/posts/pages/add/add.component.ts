import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { emailPattern } from '../../shared/validators/validations';
import { FirestoreService } from '../../../auth/services/firestore.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() post: number = 0;
  commentId!: number;
  action = 'New';
  date: Date = new Date();

  newComment: FormGroup = this.fb.group({
    postId: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    body: ['', [Validators.required, Validators.maxLength(200)]],
  });

  constructor(
    private postService: PostsService,
    private router: Router,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private firestore: FirestoreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.commentId = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // if (this.commentId !== undefined) {
    //   this.action = 'Edit';
    // }
  }

  addComment(): void {
    console.log(this.post);
    const path = 'Posts/' + this.post + '/Comments/';
    this.firestore.createDoc(
      this.newComment.value,
      path,
      this.firestore.getId()
    );
    Swal.fire('Comentario agregado!');
  }

  editComment() {
    this.postService
      .editComments(this.commentId, this.newComment.value)
      .subscribe((data) => {
        console.log('New Data', data);
      });
  }
}
