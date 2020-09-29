import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
    selector: 'add-task',
    templateUrl: 'add-task.component.html',
    styleUrls: ['add-task.component.css'],
})

export class AddTaskComponent implements OnInit {

    public form: FormGroup;
    public tasks: Task[] = [];
    public task: Task;

    constructor(
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            label: new FormControl(this.task ? this.task.label : '', Validators.required),
            description: new FormControl(this.task ? this.task.description : ''),
            position: new FormControl(this.task ? this.task.position : 0),
            createdDate: new FormControl(this.task ? this.task.createdDate : new Date),
            isActive: new FormControl(this.task ? this.task.isActive : true),
        });
        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                if (params && params.get('id')) {
                    this.taskService.getTask(parseInt(params.get('id'))).subscribe(
                        apiResponse => {
                            this.task = apiResponse;
                        }
                    );
                }
            }
        );
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
        if (this.task) {
            task.updatedDate = new Date;
            task.id = this.task.id;
            this.taskService.editTask(task).subscribe(
                () => {
                    this.router.navigate([''])
                }, error => {
                    console.error('ERREUR' + error);
                }
            );
        } else {
            this.taskService.addTask(task).subscribe(
                () => {
                    this.router.navigate([''])
                }, error => {
                    console.error('ERREUR' + error);
                }
            );
        }
    }

    onCancel(): void {
        this.router.navigate(['']);
    }
}