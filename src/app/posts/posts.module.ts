import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { UpperLowerPipe } from './pipes/upper-lower.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    CommentsComponent,
    ListComponent,
    DetailComponent,
    AddComponent,
    EditComponent,
    UpperLowerPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PostsModule {}
