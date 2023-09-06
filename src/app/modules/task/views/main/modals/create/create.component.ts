import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TASK_STATUS, Task } from '../../../../models/task.model';
import { TaskService } from '../../../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TastkCreateDto } from '../../../../models/task-create.dto';
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
  titleForm: string = 'Create Task'

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  createForm() {
    this.taskForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })

    if (this.data) {
      this.taskForm.patchValue({
        title: this.data.title,
        description: this.data.description
      })
      this.titleForm = 'Update Task'
    }
  }

  ngOnInit() {
    this.createForm()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async create() {
    const body: TastkCreateDto = {
      ...this.taskForm.value,
      status: TASK_STATUS.PENDING
    }
    const { message, info } = await this.taskService.create(body)

    this.itemAdded$.emit({ isCreated: true, item: info });

    this.openSnackBar(message as string, 'success')
  }

  async update() {
    const body: TastkCreateDto = {
      ...this.taskForm.value,
      status: this.data?.status
    }
    const { message, info } = await this.taskService.update(this.data!.id, body)

    this.itemAdded$.emit({ isCreated: false, item: info });

    this.openSnackBar(message as string, 'success')
  }

  async onSaveForm(): Promise<void> {
    try {
      this.loading = true;

      if (!this.data) await this.create()

      if (this.data) await this.update()

      this.dialogRef.close();

    } catch (error) {
      this.openSnackBar((error as any).message as string, 'error')
    } finally {
      this.loading = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }


}
