import { TaskStatusesType } from '@/types/TaskStatuses';
import CompletedStatus from '@/assets/icons/taskStatuses/completed.svg';
import InReviewStatus from '@/assets/icons/taskStatuses/review.svg';
import AtWorkStatus from '@/assets/icons/taskStatuses/at_work.svg';
import TodoStatus from '@/assets/icons/taskStatuses/todo.svg';

export const TaskStatusesSvgs: Record<TaskStatusesType, string> = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,
};
