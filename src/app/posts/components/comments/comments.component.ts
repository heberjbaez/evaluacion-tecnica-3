import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/posts/services/posts.service';
import { Comments } from 'src/app/posts/interfaces/comments.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styles: [
    `
      .buttons-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .btn {
        margin: 0 5px;
      }
    `,
  ],
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

  emmitDate() {
    const strDate: string = this.date.toDateString();
    this.onDate.emit(strDate.slice(4, 15));
  }

  change() {
    this.upperLower = !this.upperLower;
  }
}
