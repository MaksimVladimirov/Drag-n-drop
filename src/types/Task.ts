import { TaskStatusesType } from './TaskStatuses';

export interface TaskParameters {
    paramId: number,
    paramText: string
}

export interface ITask {
    id: number;
    status: TaskStatusesType;
    content: string;
    name: string;
    parameters: TaskParameters[]
}
