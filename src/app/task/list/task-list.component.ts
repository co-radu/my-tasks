import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

export interface DialogData {
    task?: Task;
}

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css'],
})

export class TaskListComponent implements OnInit {

    public tasks: Task[] = [];

    constructor(
        private router: Router,
        private taskService: TaskService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.taskService.getTasks().subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
            }
        );
    }

    openDialog(task? : Task): void {
        const dialogRef = this.dialog.open(AddTaskComponent, {
            width: '300px',
            data: {
                task: task ? task : ''
            },
        });
        dialogRef.afterClosed().subscribe(
            (returnTask: Task) => {
                if (returnTask && task) {
                    this.tasks = [...this.tasks.filter(
                        (filterTask: Task) => filterTask.id !== returnTask.id
                    ), returnTask];
                } else if(returnTask && !task) {
                    this.tasks.push(returnTask);
                }
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

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    }
}