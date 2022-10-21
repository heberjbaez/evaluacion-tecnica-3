import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/posts/services/posts.service';
import { Comments } from 'src/app/posts/interfaces/comments.interface';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../auth/services/firestore.service';
import { Like } from '../../interfaces/likes.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  comments: Comments[] = [];
  likeComment: boolean = false;

  constructor(
    private postsService: PostsService,
    private firestore: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getComments();
    this.loadUsersLikes();
  }

  getComments() {
    const id = this.firestore.getId();
    const path = 'Posts/' + this.post + '/Comments/';
    this.firestore.getCollectionComment<Comments>(path).subscribe((res) => {
      this.comments = res;
      console.log(res);
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

  async like() {
    const path = 'Posts/' + this.post + '/Likes/';
    const uid = await this.authService.getUid();
    const data: Like = {
      uid,
      date: new Date(),
      like: !this.likeComment,
    };
    console.log(data.like);

    this.firestore.createDoc(data, path, uid);
  }

  async loadUsersLikes() {
    const path = 'Posts/' + this.post + '/Likes/';
    const uid = (await this.authService.getUid()) as string;
    this.firestore.getDoc<Like>(path, uid).subscribe((res) => {
      if (res) {
        if (res.like) {
          this.likeComment = res.like;
        }
      }
    });
  }
}
