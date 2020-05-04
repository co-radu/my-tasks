import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskService } from './task/task.service';
import { TaskListComponent } from './task/list/task-list.component';
import { AddTaskComponent } from './task/list/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DeleteTaskComponent } from './task/list/delete/delete-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    DeleteTaskComponent
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
  ],
  bootstrap: [AppComponent],
  providers: [TaskService],
})
export class AppModule { }
