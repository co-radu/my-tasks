import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TaskService } from './shared/services/task.service';

@Component({
  selector: 'my-tasks-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public searchInput = new FormControl('');
  public title = 'My Tasks';
  public currentSearch: Observable<string> = this.taskService.getCurrentSearchString();

  constructor(
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe(
      (value: string) => {
        this.taskService.setCurrentSearchString(value);
      }
    )
  }

  redirectTo(destination: string): void {
    switch (destination) {
      case 'GitHub':
        window.open('https://github.com/co-radu', '_blank');
        break;
      case 'LinkedIn':
        window.open('https://linkedin.com/in/corentin-radureau-93289a139', '_blank');
        break;
    }
  }
}