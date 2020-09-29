import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { DialogData } from '../task-list.component';

@Component({
    selector: 'delete-task',
    templateUrl: 'delete-task.component.html',
    styleUrls: ['delete-task.component.css'],
})

export class DeleteTaskComponent {

    public tasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        public deleteDialogRef: MatDialogRef<DeleteTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    deleteTask(task: Task): void {
        this.taskService.deleteTask(task).subscribe(
            () => {
                this.deleteDialogRef.close(this.data.task.id);
            }, error => {
                console.error(error);
            }
        );
    }

    onCancel(): any {
        this.deleteDialogRef.close();
    }
}