import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '../shared/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {

    private url: string = environment.url;
    
    constructor(private http: HttpClient) {}

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.url + '/api/items.json');
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(this.url + '/api/items/' + id + '.json');
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.url + '/api/items.json', task);
    }

    deleteTask (id: number) {
        return this.http.delete(this.url + '/api/items/' + id + '.json');
    }

    editTask (task: Task): Observable<Task> {
        return this.http.put<Task>(this.url + '/api/items/' + task.id + '.json', task);
    }
}