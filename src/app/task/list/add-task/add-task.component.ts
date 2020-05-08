import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/models/task.model';
import { DialogData } from '../task-list.component';

@Component({
    selector: 'add-task',
    templateUrl: 'add-task.component.html',
    styleUrls: ['add-task.component.css'],
})

export class AddTaskComponent implements OnInit {

    public form: FormGroup;
    public tasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        public dialogRef: MatDialogRef<AddTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            label: new FormControl(this.data.task ? this.data.task.label : '', Validators.required),
            description: new FormControl(this.data.task ? this.data.task.description : ''),
            position: new FormControl(this.data.task ? this.data.task.position : 0),
            createdDate: new FormControl(this.data.task ? this.data.task.createdDate : new Date),
            isActive: new FormControl(this.data.task ? this.data.task.isActive : true),
        })
    }

    submitTask(): void {
        if (this.form.invalid)
            return;
        let task: Task = {
            label: this.form.get('label').value,
            description: this.form.get('description').value,
            position: this.form.get('position').value,
            createdDate: this.form.get('createdDate').value,
            isActive: this.form.get('isActive').value,
        };
        if (this.data.task) {
            task.updatedDate = new Date;
            task.id = this.data.task.id;
            this.taskService.editTask(task).subscribe(
                (updatedTask: Task) => {
                    this.dialogRef.close(updatedTask);
                }, error => {
                    console.error('ERREUR' + error);
                }
            );
        } else {
            this.taskService.addTask(task).subscribe(
                (newTask: Task) => {
                    this.dialogRef.close(newTask)
                }, error => {
                    console.error('ERREUR' + error);
                }
            );
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}