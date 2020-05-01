import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../task.service';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html'
})

export class AddTaskComponent {

    constructor(
        private taskService: TaskService,
        public dialogRef: MatDialogRef<AddTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

}