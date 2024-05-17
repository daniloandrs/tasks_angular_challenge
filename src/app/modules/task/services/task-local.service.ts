import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class TaskLocalService {
    private readonly localStorageKey = 'tasks';
  
    constructor() {}
  
    private getTasks(): Task[] {
      const data = localStorage.getItem(this.localStorageKey);
      return data ? JSON.parse(data) : [];
    }
  
    private saveTasks(tasks: Task[]): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  
    getAllTasks(): Observable<Task[]> {
      return of(this.getTasks()).pipe(delay(200));
    }
  
    getTaskById(id: string): Task | undefined {
      return this.getTasks().find(task => task.id === id);
    }
  
    createTask(task: Task): Observable<void> {
      const tasks = this.getTasks();
      tasks.push(task);
      this.saveTasks(tasks);
      return of().pipe(delay(200));
    }
  
    updateTask(updatedTask: Task): Observable<void>  {
      const tasks = this.getTasks();
      const index = tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
        this.saveTasks(tasks);
      }
      return of().pipe(delay(200));
    }
  
    deleteTask(id: string): Observable<void>  {
      const tasks = this.getTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);
      this.saveTasks(filteredTasks);
      return of().pipe(delay(200));
    }
  }