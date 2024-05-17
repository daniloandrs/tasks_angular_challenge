import { NgModule } from '@angular/core';
import { HttpService } from './api/http.service';

@NgModule({
    exports: [],
    imports: [],
    providers: [
        HttpService,
    ]
})
export class SharedModule { }