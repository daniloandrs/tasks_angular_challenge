import { NgModule } from '@angular/core';
import { TaskComponent } from './views/main/task.component';
import { TagComponent } from './views/main/components/tag/tag.component';
import { TaskService } from './services/task.service';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/Material.module';
import { CreateComponent } from './views/main/modals/create/create.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskLocalService } from './services/task-local.service';
import { TagLocalService } from './services/tag-local.service';
import { NgxColorsModule } from 'ngx-colors';
import { FilterComponent } from './views/main/components/filter/filter.component';
@NgModule({
    declarations: [
        TaskComponent,
        CreateComponent,
        TagComponent,
        FilterComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxColorsModule
    ],
    providers: [
        TaskService,
        TaskLocalService,
        TagLocalService
    ]
})
export class TaskModule { }
