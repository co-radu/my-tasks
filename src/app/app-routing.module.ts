import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found.component";
import { AddTaskComponent } from './task/add-task/add-task.component';
import { TaskListComponent } from './task/list/task-list.component';


const routes: Routes = [
  { path: 'edit-task/:id', component: AddTaskComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: '', component: TaskListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
