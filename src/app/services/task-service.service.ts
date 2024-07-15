import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PeriodicElement } from '../types/TODO.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  httpClient = inject(HttpClient);

  constructor() { }

  getTaskList(){
    return this.httpClient.get<PeriodicElement[]>("http://localhost:3000/todos");
  }

  getTaskById(id: number){
    return this.httpClient.get<PeriodicElement>("http://localhost:3000/todos/"+id);
  }

  addTask(task: PeriodicElement){
    return this.httpClient.post<PeriodicElement>("http://localhost:3000/todos", task);
  }

  updateTaskById(task: PeriodicElement){
    return this.httpClient.put<PeriodicElement>("http://localhost:3000/todos/"+task.id, task );
  }

  deleteItemById(id: string): Observable<any> {
    return this.httpClient.delete<PeriodicElement>("http://localhost:3000/todos/"+id);
  }

}
