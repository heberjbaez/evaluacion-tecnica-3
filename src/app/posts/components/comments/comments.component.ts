import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/posts/services/posts.service';
import { Comments } from 'src/app/posts/interfaces/comments.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() post: number = 0;
  @Output() onDate: EventEmitter<string> = new EventEmitter();
  date: Date = new Date();
  upperLower: boolean = true;
  comments: Comments[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.emmitComments();
  }

  emmitComments() {
    this.postsService.getPostComments(this.post).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.log(err);
      },
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
