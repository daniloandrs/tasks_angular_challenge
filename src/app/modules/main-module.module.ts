import { NgModule } from '@angular/core';
import { TaskModule } from './task/task.module';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
    declarations: [],
    imports: [
        TaskModule,
        MainRoutingModule
    ]
})
export class MainModuleModule { }
