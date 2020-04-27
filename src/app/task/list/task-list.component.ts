import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css']
})

export class TaskListComponent implements OnInit {

    public tasks: Task[] = [];

    constructor(private router: Router, private taskService: TaskService) { }

    ngOnInit(): void {
        this.taskService.getTasks().subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
                /*this.deleteTask(this.tasks[0]);*/
            }
        );
    }

    deleteTask(task: Task): void {
        this.taskService.deleteTask(task.id).subscribe(
            () => {
                this.tasks.splice(0, 1);
            }, error => {
                console.log('ERREUR' + error);
            }
        );
    }

    addTask(task: Task) {
        this.taskService.addTask(task).subscribe(
            (task: Task) => {
                this.addTask(task);
            }, error =>{
                console.log('ERREUR' + error)
            }
        );
    }
}



//     drop(event: CdkDragDrop<string[]>) {
//         moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
//     }


