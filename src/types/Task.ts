import { TaskParameters } from './TaskParameters';
import { TaskStatusesType } from './TaskStatuses';

export interface ITask {
    taskId: number;
    taskStatus: TaskStatusesType;
    taskDescription: string;
    userName: string;
    parameters: TaskParameters[];
    deadline?: string;
    taskPriority?: string;
    comment?: string
}
