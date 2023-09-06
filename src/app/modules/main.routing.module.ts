import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/views/main/task.component';

const routes: Routes = [
    {
        path: 'tasks',
        children: [
            {
                path: '',
                component: TaskComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
