export interface Task {
    id: string;
    title: string;
    description: string;
    expirationDate: string;
    tags: string[];
    priority: Priority
    status: Status
}

export type Tag = {
    color : string
    name : string
    key : string
    edit?:boolean
}

export enum Priority {
    URGENT = 'Urgente',
    IMPORTANT = 'Importante',
}

export enum Status {
    COMPLETED = 'completado',
    EXPIRED = 'expirado',
    PENDING = 'pendiente'
}