import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.css']
})

export class TaskListComponent implements OnInit {

    public tasks: Task[] = [];
    public form: FormGroup;

    constructor(private router: Router, private taskService: TaskService) { }

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
            (newTask: Task) => {
                this.tasks.push(newTask);
            }
        );
        error => {
            console.log('ERREUR' + error);
        };
    }

}