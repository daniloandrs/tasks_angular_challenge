import { Component, ElementRef, ViewChild } from '@angular/core';
import { Status, Tag, Task } from '../../models/task.model';
import { TaskLocalService } from '../../services/task-local.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './modals/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Time } from '../../../../shared/utils/time';
import { TagLocalService } from '../../services/tag-local.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  tasks!: Array<Task>;
  tagsStored: Array<Tag> = [];
  @ViewChild('endOfPage') endOfPage!: ElementRef;

  constructor(
    private taskLocalService: TaskLocalService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tagService: TagLocalService,
  ) { }
  ngOnInit() {
     this.getTasks();
     this.getTags();
  }

  openDialog(item: Task | null): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: item,
      width: '600px'
    });

    dialogRef.componentInstance.itemAdded$.subscribe({
      next : ( {
        isCreated,item
      }:{
        isCreated: boolean,
        item: Task
      }) => {
        this.getTasks()
        if (isCreated) {
          this.scrollToBottom()
        }
      },
      
    })
  }

  edit(task: Task) {
    this.openDialog(task)
  }

  addTaskToList(task: Task) {
    const newTasksArray = this.tasks;
    newTasksArray.unshift(task);
    this.tasks = [...newTasksArray];
  }

  updateTaskToList(task: Task) {
    this.taskLocalService.updateTask(task).subscribe({
      complete:() => {
        this.getTasks()
      }
    })
  }

  deleteTaskToList(task: Task) {
    const newUsersArray = this.tasks;
    const findIndex = newUsersArray.findIndex(item => item.id === task.id)
    if (findIndex > -1) newUsersArray.splice(findIndex, 1);
    this.tasks = [...newUsersArray];
  }

  async delete(element: Task) {
    try {
      this.taskLocalService.deleteTask(element.id).subscribe({
        complete: () => {
          this.snackBar.open('Tarea eliminada','success', { duration: 3000 });
          this.getTasks()
        }
      });
    } catch (error) {
      this.snackBar.open((error as any).message as string, 'error', { duration: 3000 });
    }
  }

  toggleStatus (task:Task) {
    const updtedTask = {
      ...task,
      status: task.status === Status.PENDING ? Status.COMPLETED : Status.PENDING
    }
    this.updateTaskToList(updtedTask)
  }

  getTagsPeerTask(keys:string[]) {
    return this.tagsStored.filter(item => keys.includes(item.key))
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe({
        next: tags =>{
          this.tagsStored = tags
        }
    });
  }

  getTasks() {
    this.taskLocalService.getAllTasks().subscribe({
      next: tasks => this.tasks = tasks
    });
  }

   expiredDate(dateString:string) {
    const expiredDate = new Date(dateString);
    const currentDate = new Date();
    return expiredDate < currentDate;
  }

  colorStatus (status:Status,dateString:string) {
    if (status === Status.EXPIRED || this.expiredDate(dateString)) {
      return '#4BCE97';
    }
    else if (status === Status.PENDING) {
      return '#F5CD47';
    }
    else if (status === Status.COMPLETED) {
      return '#4BCE97';
    }
    
    return "white";
    
  }

  formatDate (string:string) {
    return Time.format(string);
  }

  remainingTime(task:Task) {
    if (task.status === Status.COMPLETED)
        return "Esta tarea esta completada."
    const unixTime = Date.parse(task.expirationDate);
    return Time.remainingTime2(unixTime)
  }

  scrollToBottom(): void {
    this.endOfPage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
}
