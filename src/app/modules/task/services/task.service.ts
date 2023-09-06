import { Injectable } from "@angular/core";
import { HttpService, ResponseSuccess } from '../../../shared/api/http.service';
import { Task } from "../models/task.model";
import { TastkCreateDto } from "../models/task-create.dto";


@Injectable()
export class TaskService {

    private module: string = 'task/'

    constructor(private httpService: HttpService) { }

    async all(): Promise<Array<Task>> {
        return await this.httpService.get<Array<Task>>(this.module + 'all');
    }

    async create(body: TastkCreateDto): Promise<ResponseSuccess<Task>> {
        return await this.httpService.post<Task, TastkCreateDto>(this.module + 'create', body);
    }

    async update(id: string, body: TastkCreateDto): Promise<ResponseSuccess<Task>> {
        return await this.httpService.put<Task, TastkCreateDto>(this.module + 'update/' + id, body);
    }

    async delete(id: string): Promise<ResponseSuccess<Task>> {
        return await this.httpService.delete<Task>(this.module + 'delete/' + id);
    }

    async markCompleted(id: string): Promise<ResponseSuccess<Task>> {
        return await this.httpService.put<Task, {}>(this.module + 'mark_completed/' + id, {});
    }

}

