import { TaskParameters } from './TaskParameters';
import { TaskStatusesType } from './TaskStatuses';

export interface ITask {
    id: number;
    status: TaskStatusesType;
    content: string;
    name: string;
    parameters: TaskParameters[]
}
