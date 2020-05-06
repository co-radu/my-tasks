import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Task } from '../shared/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {

    private url: string = environment.url;
    public currentSearchStringSubject = new BehaviorSubject<string>('');
    private pageNumber: number = 0;

    constructor(private http: HttpClient) { }

    getTasks(page?): Observable<Task[]> {
        return this.http.get<Task[]>(this.url + '/api/items?page=2');
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(this.url + '/api/items/' + id + '.json');
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.url + '/api/items.json', task);
    }

    deleteTask(task: Task) {
        return this.http.delete(this.url + '/api/items/' + task.id + '.json');
    }

    editTask(task: Task): Observable<Task> {
        return this.http.put<Task>(this.url + '/api/items/' + task.id + '.json', task);
    }

    setCurrentSearchString(searchString: string): void {
        this.currentSearchStringSubject.next(searchString);
    }

    getCurrentSearchString(): Observable<string> {
        return this.currentSearchStringSubject.asObservable();
    }

    counterPage(): void {
        for(let i = 1; i < this.pageNumber; i++) {
            this.pageNumber += i;
        }
    }
}