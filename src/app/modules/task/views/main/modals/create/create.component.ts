import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority, Status, Tag, Task } from '../../../../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskLocalService } from '../../../../services/task-local.service';
import { TagLocalService } from '../../../../services/tag-local.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @Output() itemAdded$ = new EventEmitter<{
    isCreated: boolean
    item: Task
  }>();

  taskForm!: FormGroup;
  loading: boolean = false;
  titleForm: string = 'Nueva Tarea'
  priorityList : Priority[] = [
    Priority.URGENT,
    Priority.IMPORTANT
  ]

  tags : Tag[] = [];

  tagsStored: Tag[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private formBuilder: FormBuilder,
    private taskLocalService: TaskLocalService,
    private tagsLocalService: TagLocalService,
    private snackBar: MatSnackBar
  ) { }

  createForm() {
    this.taskForm = this.formBuilder.group({
      id : [this.generateRandomKey(32),[Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      expirationDate : [null, [Validators.required]],
      priority: [null, [Validators.required]],
      status: [Status.PENDING,[Validators.required]]
    })
  }

  loadTags(): void {
    this.tagsLocalService.getAllTags().subscribe({
        next: tags =>{
          this.tagsStored = tags
          if (this.data) {
            this.taskForm.patchValue({
              id:this.data.id,
              title: this.data.title,
              description: this.data.description,
              expirationDate:this.data.expirationDate,
              priority:this.data.priority,
              status:this.data.status
            })
            const tagsKeys = this.data.tags;
            this.tags = this.tagsStored.filter(item => tagsKeys.includes(item.key))
            this.titleForm = 'Editar tarea'
          }
        }
    });
  }


  ngOnInit() {
    this.createForm()
    this.loadTags()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  create() {
    const body: Task = {
      ...this.taskForm.value,
      tags : this.tags.map(item => item.key)
    }

    this.taskLocalService
    .createTask(body)
    .subscribe({
      next: () => {
        this.openSnackBar("Tarea creada correctamente.", 'success')
      },
      complete : () => {
        this.itemAdded$.emit({ isCreated: true, item: body });
        this.dialogRef.close();
      }
    })
   
  }

  changeTags (event:Tag[]) {
    console.log({event})
  }
  
  update() {
    const body: Task = {
      ...this.taskForm.value,
      tags : this.tags.map(item => item.key)
    }
    
    this.taskLocalService.updateTask(body)
    .subscribe({
      next: () => {
        this.openSnackBar("Tarea actualizada correctamente.", 'success')
      },
      complete : () => {
        this.itemAdded$.emit({ isCreated: false, item: body });
        this.dialogRef.close();
      }
    })
  }

  async onSaveForm(): Promise<void> {
    try {
      this.loading = true;

      if (!this.data)  {
        this.create()
      }

      if (this.data)  this.update()

    } catch (error) {
      this.openSnackBar((error as any).message as string, 'error')
    } finally {
      this.loading = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }


  generateRandomKey(length:number):string {
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}
