import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Avatar from '@/assets/icons/avatar.svg';
import TodoStatus from '@/assets/icons/taskStatuses/todo.svg';
import InReviewStatus from '@/assets/icons/taskStatuses/review.svg';
import CompletedStatus from '@/assets/icons/taskStatuses/completed.svg';
import AtWorkStatus from '@/assets/icons/taskStatuses/at_work.svg';
import { ITaskCardProps } from './TaskCardProps';
import { classNames } from '@/lib';
import cls from './TaskCard.module.scss';

const TaskStatusesSvgs = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,

};

export const TaskCard = ({ task }: ITaskCardProps) => {
    const {
        setNodeRef, attributes, listeners, isDragging, transition, transform,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={classNames(cls.TaskCard__dragging)}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
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
