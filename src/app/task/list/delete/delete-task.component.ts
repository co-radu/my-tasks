import { Component, Inject } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../task-list.component';
import { TaskListComponent } from '../task-list.component';

@Component({
    selector: 'delete-task',
    templateUrl: 'delete-task.component.html',
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
            (taskIdDeleted: number) => {
                this.deleteDialogRef.close(this.data.task.id);
            }, error => {
                console.error('ERREUR' + error);
            }
        );
    }

    onCancel(): any {
        this.deleteDialogRef.close();
    }
}