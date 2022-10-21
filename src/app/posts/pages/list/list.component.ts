import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../interfaces/posts.interface';
import { FirestoreService } from '../../../auth/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit, OnInit {
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'title', 'actions'];

  listPaginator = new MatTableDataSource<Posts>([]);
  newPostForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    postId: [this.firestore.getId()],
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
  }

  ngAfterViewInit() {
    this.listPaginator.paginator = this.paginator;
  }

  // loadPosts() {
  //   this.postsService.getPosts().subscribe({
  //     next: (resultList) => {
  //       this.listPaginator.data = resultList;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  loadPosts() {
    this.firestore.getCollectionPost<Posts>('Posts').subscribe((res) => {
      if (res) {
        this.listPaginator.data = res;
      }
    });
  }

  newPost() {
    // this.newPostForm.reset();
  }

  async saveNewPost() {
    this.loading = true;
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
