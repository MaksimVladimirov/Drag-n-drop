import { TaskStatusesType } from './TaskStatuses';

export interface ITask {
    taskId: number;
    taskStatus: TaskStatusesType;
    taskDescription: string;
    userName: string;
    deadline?: string;
    taskPriority?: string;
    comment?: string
}
