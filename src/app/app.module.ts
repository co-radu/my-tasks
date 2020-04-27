import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TaskService } from './task/task.service';
import { TaskListComponent } from './task/list/task-list.component';
import { DetailTaskComponent } from './task/detail/detail-task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    DetailTaskComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserAnimationsModule, 
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [TaskService],
})
export class AppModule { }
