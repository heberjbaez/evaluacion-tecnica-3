import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/posts/services/posts.service';
import { Comments } from 'src/app/posts/interfaces/comments.interface';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../auth/services/firestore.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() post!: string;
  @Output() onDate: EventEmitter<string> = new EventEmitter();
  date: Date = new Date();
  upperLower: boolean = true;
  comments!: any;

  constructor(
    private postsService: PostsService,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    // this.postsService.getPostComments(this.post).subscribe({
    //   next: (comments) => {
    //     this.comments = comments;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    const path = 'Posts/' + this.post + '/Comments/';
    this.firestore.getDoc(path, 'FbDix8M2yuAiM1l4ocD8').subscribe((res) => {
      this.comments = res;
      console.log(this.comments);
    });
  }

  deleteComment(index: number) {
    this.postsService.deleteComments(index).subscribe(() => {
      console.log('eliminado');
    });
  }

  emmitDate() {
    const strDate: string = this.date.toDateString();
    this.onDate.emit(strDate.slice(4, 15));
  }

  change() {
    this.upperLower = !this.upperLower;
  }
}
