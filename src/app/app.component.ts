import { Component, OnInit } from '@angular/core';
import { TaskService } from './tasks/tasks.service';
import { Task } from './shared/models/task.model';

@Component({
  selector: 'my-tasks-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My Tasks';

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        console.log(tasks);
        tasks.forEach(
          (task: Task) => {
            console.log(task.label);
          }
        );
      }
    );

  }

}

