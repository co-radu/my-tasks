import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
    selector: 'detail-task',
    templateUrl: 'detail-task.component.html'
})

export class DetailTaskComponent implements OnInit {

    private task: Task

    constructor(private router: Router, private taskService: TaskService) {}

    ngOnInit(): void {
        this.taskService.getTask(this.task.id).subscribe(
            task => this.task = task
        )
    }
}