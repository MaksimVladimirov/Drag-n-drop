import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from '@/store/slices/kanbanBoardSlice';
import Avatar from '@/shared/assets/icons/avatar.svg';
import TodoStatus from '@/shared/assets/icons/taskStatuses/todo.svg';
import InReviewStatus from '@/shared/assets/icons/taskStatuses/review.svg';
import CompletedStatus from '@/shared/assets/icons/taskStatuses/completed.svg';
import AtWorkStatus from '@/shared//assets/icons/taskStatuses/at_work.svg';
import { classNames } from '@/lib/classNames';
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
