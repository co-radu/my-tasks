import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component ({
    selector: 'add-task',
    templateUrl: './add-task.component.html'
})

export class AddTaskComponent {

    constructor(
        private router: Router,
        private taskService: TaskService
    ) {}

}