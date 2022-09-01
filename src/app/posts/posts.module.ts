import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from '../material/material.module';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [CommentsComponent, ListComponent, DetailComponent, HomeComponent, AddComponent, EditComponent],
  imports: [CommonModule, PostsRoutingModule, MaterialModule],
})
export class PostsModule {}
