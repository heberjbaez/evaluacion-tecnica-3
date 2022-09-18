import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'actions'];
  listPaginator = new MatTableDataSource<Posts>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.listPaginator.paginator = this.paginator;
  }

  loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (resultList) => {
        this.listPaginator.data = resultList;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
