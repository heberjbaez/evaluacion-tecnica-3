import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  hide = true;
  newComment: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comments: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
  });

  constructor(private postService: PostsService, private router: Router) {}

  ngOnInit(): void {}

  addComment(): void {
    const comment = this.newComment.value;

    console.log(comment);
  }
}
