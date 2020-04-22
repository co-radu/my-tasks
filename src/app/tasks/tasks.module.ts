import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { ListTasksComponent } from './list/list-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from './tasks.service';



@NgModule({
    declarations: [
      ListTasksComponent,
      AddTaskComponent,
    ],
    imports: [
      MaterialModule,
    ],
    providers: [
      TaskService,
    ],
  })

  export class TasksModule { }