import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { TaskService } from './shared/services/task.service';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { DeleteTaskComponent } from './task/list/delete/delete-task.component';
import { TaskListComponent } from './task/list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    DeleteTaskComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    DragDropModule,
    InfiniteScrollModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    TaskService
  ],
  entryComponents: [
    AddTaskComponent,
    DeleteTaskComponent,
  ],
})
export class AppModule { }
