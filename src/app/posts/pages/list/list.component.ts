import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../interfaces/posts.interface';
import { FirestoreService } from '../../../auth/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit, OnInit {
  hide = true;
  uid!: string;
  userInfo!: Auth;
  loading: boolean = false;
  displayedColumns: string[] = ['author', 'id', 'title', 'actions'];

  listPaginator = new MatTableDataSource<Posts>([]);
  newPostForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    postId: [this.firestore.getId()],
    author: [],
    date: [],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postsService: PostsService,
    private firestore: FirestoreService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.listPaginator.paginator = this.paginator;

    this.authService.stateUser().subscribe((res) => {
      this.getUid();
    });
    this.getUid();
  }

  ngAfterViewInit() {}

  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      this.getUserData();
    } else {
      console.log('error al obtener los datos del usuario');
    }
  }

  getUserData() {
    const id = this.uid;
    this.firestore.getDoc<Auth>('Users', id).subscribe((res) => {
      if (res) {
        this.userInfo = res;
      }
    });
  }

  loadPosts() {
    this.firestore.getCollectionPost<Posts>('Posts').subscribe((res) => {
      if (res) {
        this.listPaginator.data = res;
      }
    });
  }

  async saveNewPost() {
    const datePublishedPost = new Date();
    this.newPostForm.value.date = datePublishedPost;
    this.newPostForm.value.author = this.userInfo;

    await this.firestore.createDoc(
      this.newPostForm.value,
      'Posts',
      this.newPostForm.value.postId
    );
    this.loading = false;
    Swal.fire('Post creado con exito!');
  }

  editPost(post: Posts) {
    console.log('editar', post);
    this.newPostForm.setValue(post);
  }

  async deletePost(post: Posts) {
    const res = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro/a de eliminar este Post?',
      showConfirmButton: true,
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'CANCELAR',
      cancelButtonColor: '#d33',
      buttonsStyling: true,
    });
    this.loading = true;
    if (res.isConfirmed === true) {
      await this.firestore.deleteDoc('Posts', post.postId);
      Swal.fire('El post se ha eliminado con éxito');
      this.loading = false;
    }
  }
}
