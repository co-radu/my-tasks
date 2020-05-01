import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css']
})

export class TaskListComponent implements OnInit {

    public tasks: Task[] = [];
    public form: FormGroup;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            label: new FormControl('', Validators.required),
            description: new FormControl(''),
            position: new FormControl(0),
            createdDate: new FormControl(new Date),
            isActive: new FormControl(true),
        });

        this.taskService.getTasks().subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
                /*this.deleteTask(this.tasks[0]);*/
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddTaskComponent, {
            width: '300px',
            data: {},
        });
        dialogRef.afterClosed().subscribe(
            (newTask: Task) => {
                if (newTask) {
                    this.tasks.push(newTask);
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
        error => {
            console.log('ERREUR' + error);
        };
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    }
}