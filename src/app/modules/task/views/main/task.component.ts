import { Component } from '@angular/core';
import { TASK_STATUS, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './modals/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Time } from '../../../../shared/utils/time';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  displayedColumns: string[] = ['position', 'title', 'description', 'status', 'date', 'actions'];
  tasks!: Array<Task>;

  public taskEnum = TASK_STATUS;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  async ngOnInit() {
    await this.getTasks();
  }

  openDialog(item: Task | null): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: item,
      height: '370px',
      width: '600px'
    });

    dialogRef.componentInstance.itemAdded$.subscribe((result: {
      isCreated: boolean,
      item: Task
    }) => {
      if (result.isCreated) this.addTaskToList(result.item)
      if (!result.isCreated) this.updateTaskToList(result.item)
    })
  }

  edit(task: Task) {
    this.openDialog(task)
  }

  addTaskToList(task: Task) {
    const newUsersArray = this.tasks;
    newUsersArray.unshift(task);
    this.tasks = [...newUsersArray];
  }

  updateTaskToList(task: Task) {
    const newUsersArray = this.tasks;
    const findIndex = newUsersArray.findIndex(item => item.id === task.id)
    if (findIndex > -1) newUsersArray[findIndex] = task;
    this.tasks = [...newUsersArray];
  }

  deleteTaskToList(task: Task) {
    const newUsersArray = this.tasks;
    const findIndex = newUsersArray.findIndex(item => item.id === task.id)
    if (findIndex > -1) newUsersArray.splice(findIndex, 1);
    this.tasks = [...newUsersArray];
  }

  async delete(element: Task) {
    try {
      const { message, info } = await this.taskService.delete(element.id);
      this.snackBar.open(message as string, 'success', { duration: 3000 });
      this.deleteTaskToList(info)
    } catch (error) {
      this.snackBar.open((error as any).message as string, 'error', { duration: 3000 });
    }
  }

  async markAsCompleted(element: Task) {
    try {
      const { message, info } = await this.taskService.markCompleted(element.id);
      this.snackBar.open(message as string, 'success', { duration: 3000 });
      this.updateTaskToList(info)
    } catch (error) {
      this.snackBar.open((error as any).message as string, 'error', { duration: 3000 });
    }
  }

  async getTasks() {
    this.tasks = await this.taskService.all()
  }

  timeAgo(unixDate: number) {
    return Time.timeAgo(unixDate)
  }
}
