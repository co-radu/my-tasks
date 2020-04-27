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

  redirectTo(destination: string): void {
    switch (destination) {
      case 'Git-Hub':
        window.open('https://github.com/co-radu', '_blank');
        break;
    }
  }
}
