import { useSortable } from '@dnd-kit/sortable';
import { type Task } from '@/widgets/types';
import cls from './TaskCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Avatar from '../../assets/icons/avatar.svg';
import TodoStatus from '../../assets/icons/taskStatuses/todo.svg';
import InReviewStatus from '../../assets/icons/taskStatuses/review.svg';
import CompletedStatus from '../../assets/icons/taskStatuses/completed.svg';
import AtWorkStatus from '../../assets/icons/taskStatuses/at_work.svg';

interface Props {
    task: Task
}

const TaskStatusesSvgs = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,

};
function TaskCard({ task }: Props) {
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
                <p className={classNames(cls.TaskCard__user_field__title)}>{task.userName}</p>
                <img src={Avatar} alt="" />
            </div>
            <div className={classNames(cls.TaskCard__task_description_field)}>
                Задание:
                {' '}
                {task.content}
            </div>
            <div className={classNames(cls.TaskCard__status_field)}>
                <p className={classNames(cls.TaskCard__status_field__title)}>{task.taskStatus}</p>
                <img src={TaskStatusesSvgs[task.taskStatus as keyof typeof TaskStatusesSvgs]} alt="" />
            </div>
        </div>
    );
}

export default TaskCard;
