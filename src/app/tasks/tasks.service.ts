import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Task } from '../shared/models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TaskService {
    constructor(private http: HttpClient) {}

    deleteTask(): Observable<string> {
        return of('Hello');
    }

    getTasks() : Observable<Task[]> {
        return <Observable<Task[]>> this.http.get('https://agile-dusk-64287.herokuapp.com/api/items.json',
        {
            headers : new HttpHeaders({'Last-Modified': 'Wed, 06 Jul 2016 13:01:52 GMT'})
        }
        );
    }
}
