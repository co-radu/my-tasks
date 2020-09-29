import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DeleteTaskComponent } from './delete/delete-task.component';

export interface DialogData {
    task: Task;
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
    private totalTaskNumber: number;
    private taskNumber: number = 10;
    public pageNumber: number = 1;


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
        this.taskService.getTasks(this.pageNumber).subscribe(
            (tasks: any) => {
                this.allTasks = tasks['hydra:member'];
                this.filteredTasks = tasks['hydra:member'];
                this.totalTaskNumber = tasks['hydra:totalItems'];
                this.filterTasks();
            }
        );
    }

    newTask(): void {
        this.router.navigate(['/add-task']);
    }

    editTask(task: Task): void {
        this.router.navigate([`edit-task/${task.id}`]);
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

    onScroll(): void {
        if (this.totalTaskNumber > 10 && this.taskNumber < this.totalTaskNumber) {
            this.pageNumber++;
            this.taskService.getTasks(this.pageNumber).subscribe(
                (tasks: any) => {
                    tasks['hydra:member'].forEach(
                        (task: Task) => {
                            this.taskNumber++;
                            this.filteredTasks.push(task);
                            this.filterTasks();
                        }
                    );
                }
            );
        } else {
            null;
        }
    }
}
