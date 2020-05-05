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

    private allTasks: Task[] = [];
    public filteredTasks: Task[] = [];
    private currentSearchString: string;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.taskService.getCurrentSearchString().subscribe(
            (value: string) => {
                this.currentSearchString = value;
                this.filterTasks();
            }
        );
        this.taskService.getTasks().subscribe(
            (tasks: Task[]) => {
                this.allTasks = tasks;
                this.filteredTasks = tasks;
                this.filterTasks();
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
                    this.allTasks = [...this.allTasks.filter(
                        (filterTask: Task) => filterTask.id !== returnTask.id
                    ), returnTask];
                    this.filterTasks();
                } else if (returnTask && !task) {
                    this.allTasks.push(returnTask);
                    this.filterTasks();
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
                    this.allTasks = [...this.allTasks.filter(
                        (filterTask: Task) => filterTask.id !== taskIdDeleted
                    )];
                    this.filterTasks();
                } else {
                    null;
                }
            }
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.allTasks, event.previousIndex, event.currentIndex);
        this.filterTasks();
    }

    filterTasks(): void {
        if (this.currentSearchString && this.currentSearchString.length > 0) {
            this.filteredTasks = this.allTasks.filter(
                (task: Task) => {
                    return task.label.toLowerCase().includes(this.currentSearchString.toLowerCase()) || task.description.toLowerCase().includes(this.currentSearchString.toLowerCase()) ? task : null;
                }
            );
        } else {
            this.filteredTasks = this.allTasks;
        }
    }
}