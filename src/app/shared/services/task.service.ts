import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable()

export class TaskService {

    private url: string = environment.url;
    public currentSearchStringSubject = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) { }

    getTasks(pageNumber: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.url}/api/items/?page=${pageNumber}`);
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.url}/api/items/${id}.json`);
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.url}/api/items.json`, task);
    }

    deleteTask(task: Task) {
        return this.http.delete(`${this.url}/api/items/${task.id}.json`);
    }

    editTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.url}/api/items/${task.id}.json`, task);
    }

    setCurrentSearchString(searchString: string): void {
        this.currentSearchStringSubject.next(searchString);
    }

    getCurrentSearchString(): Observable<string> {
        return this.currentSearchStringSubject.asObservable();
    }
}