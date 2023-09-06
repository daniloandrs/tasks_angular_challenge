import { NgModule } from '@angular/core';
import { TaskComponent } from './views/main/task.component';
import { TaskService } from './services/task.service';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/Material.module';
import { CreateComponent } from './views/main/modals/create/create.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        TaskComponent,
        CreateComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
        TaskService
    ]
})
export class TaskModule { }
