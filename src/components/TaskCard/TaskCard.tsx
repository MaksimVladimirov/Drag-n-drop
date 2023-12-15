/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ITaskCardProps } from './TaskCardProps';
import Avatar from '@/assets/icons/avatar.svg';
import { classNames } from '@/lib';
import { TaskStatusesSvgs } from './taskObjects/TaskStatusesSvgs';
import { TaskPrioritiesSvgs } from './taskObjects/TaskPrioritiesSvgs';

import cls from './TaskCard.module.scss';

export const TaskCard = (props: ITaskCardProps) => {
    const { task, taskParametersToDisplay } = props;
    const {
        setNodeRef, attributes, listeners, isDragging, transition, transform,
    } = useSortable({
        id: task.taskId,
        data: {
            type: 'Task',
            task,
        },
    });

    // Стили для drag-n-drop
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
                {...attributes}
                {...listeners}
            />
        );
    }

    const taskParametersToDisplayMap = {
        deadlines: (
            <div className={classNames(cls.TaskCard__deadline_field)}>
                {`Сделать до ${task.deadline}`}
            </div>
        ),
        priority: (
            <div className={classNames(cls.TaskCard__priority_field)}>
                <img src={TaskPrioritiesSvgs[task.taskPriority as keyof typeof TaskPrioritiesSvgs]} alt="" />
                {`Приоритетность ${task.taskPriority}`}
            </div>
        ),
        comments: (
            <div className={classNames(cls.TaskCard__comment_field)}>
                {task.comment}
            </div>
        ),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={classNames(cls.TaskCard)}
        >
            <div className={classNames(cls.TaskCard__user_field)}>
                <p className={classNames(cls.TaskCard__user_field__title)}>{task.userName}</p>
                <img src={Avatar} alt="" />
            </div>
            <div className={classNames(cls.TaskCard__task_description_field)}>
                {`Задание: ${task.taskDescription}`}
            </div>

            <div className={classNames(cls.TaskCard__status_field)}>
                {task.taskStatus}
                <img src={TaskStatusesSvgs[task.taskStatus as keyof typeof TaskStatusesSvgs]} alt="" />
            </div>

            {/* Отображаем управляемые параметры задачи */}
            {Object.entries(taskParametersToDisplayMap).map(([param, element]) => (
                taskParametersToDisplay.includes(param) && element))}

        </div>
    );
};
