import { useSortable } from '@dnd-kit/sortable';

import { Task } from '@/app/store/KanbanStore';
import { classNames } from '@/shared/lib/classNames/classNames';
import Avatar from '@/shared/assets/icons/avatar.svg';
import TodoStatus from '@/shared/assets/icons/taskStatuses/todo.svg';
import InReviewStatus from '@/shared/assets/icons/taskStatuses/review.svg';
import CompletedStatus from '@/shared/assets/icons/taskStatuses/completed.svg';
import AtWorkStatus from '@/shared//assets/icons/taskStatuses/at_work.svg';
import cls from './TaskCard.module.scss';

interface Props {
    task: Task
}

const TaskStatusesSvgs = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,

};
export const TaskCard = ({ task }: Props) => {
    const {
        setNodeRef, attributes, listeners, isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                className={classNames(cls.TaskCard__dragging)}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={classNames(cls.TaskCard)}
        >
            <div className={classNames(cls.TaskCard__user_field)}>
                <p className={classNames(cls.TaskCard__user_field__title)}>{task.name}</p>
                <img src={Avatar} alt="" />
            </div>
            <div className={classNames(cls.TaskCard__task_description_field)}>
                Задание:
                {' '}
                {task.content}
            </div>
            <div className={classNames(cls.TaskCard__status_field)}>
                <p className={classNames(cls.TaskCard__status_field__title)}>{task.status}</p>
                <img src={TaskStatusesSvgs[task.status as keyof typeof TaskStatusesSvgs]} alt="" />
            </div>
        </div>
    );
};

export default TaskCard;
