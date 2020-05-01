import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/models/task.model';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html'
})

export class AddTaskComponent implements OnInit {

    public form : FormGroup;

    constructor(
        private taskService: TaskService,
        public dialogRef: MatDialogRef<AddTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            label: new FormControl('', Validators.required),
            description: new FormControl(''),
            position: new FormControl(0),
            createdDate: new FormControl(new Date),
            isActive: new FormControl(true),
        })
    }

    addTask(): void {
        if (this.form.invalid)
            return;
        const task: Task = {
            label: this.form.get('label').value,
            description: this.form.get('description').value,
            position: this.form.get('position').value,
            createdDate: this.form.get('createdDate').value,
            isActive: this.form.get('isActive').value,
        };
        this.taskService.addTask(task).subscribe(
        );
        this.onNoClick();
        error => {
            console.log('ERREUR' + error);
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
      }
}