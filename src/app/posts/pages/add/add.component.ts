import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { emailPattern } from '../../shared/validators/validations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() post: number = 0;

  newComment: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    body: ['', [Validators.required, Validators.maxLength(200)]],
  });

  constructor(
    private postService: PostsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  addComment(): void {
    this.postService
      .addPostComments(this.post, this.newComment.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }
}
