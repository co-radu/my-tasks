import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-tasks-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'My Tasks';

  constructor(private router: Router) { }
}