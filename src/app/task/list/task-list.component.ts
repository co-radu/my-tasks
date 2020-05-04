import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DeleteTaskComponent } from './delete/delete-task.component';

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
        this.taskService.getCurrentSearchString().subscribe(
            (value: string) => {
                if (this.tasks) {
                    const filterValue: string = value.toLowerCase();
                    this.tasks.filter((task: Task) => {
                        return task.label.toLowerCase().includes(filterValue) || task.description.toLowerCase().includes(filterValue) ? task : null;
                    });
                }
            }
        );
        this.taskService.getTasks().subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
            }
        );
    }

    openDialog(task?: Task): void {
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
                } else if (returnTask && !task) {
                    this.tasks.push(returnTask);
                }
            }
        );
    }

    openDeleteDialog(task: Task): void {
        const deleteDialogRef = this.dialog.open(DeleteTaskComponent, {
            width: '400px',
            data: {
                task: task ? task : ''
            },
        });
        deleteDialogRef.afterClosed().subscribe(
            (taskIdDeleted: number) => {
                if (taskIdDeleted) {
                    this.tasks = [...this.tasks.filter(
                        (filterTask: Task) => filterTask.id !== taskIdDeleted
                    )];
                } else {
                    null;
                }
            }
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    }
}