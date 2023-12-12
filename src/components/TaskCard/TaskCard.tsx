/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@/assets/icons/avatar.svg';
import CompletedStatus from '@/assets/icons/taskStatuses/completed.svg';
import InReviewStatus from '@/assets/icons/taskStatuses/review.svg';
import AtWorkStatus from '@/assets/icons/taskStatuses/at_work.svg';
import TodoStatus from '@/assets/icons/taskStatuses/todo.svg';
import { addNewField } from '@/store/slices/kanbanBoardSlice';
import { TaskStatusesType } from '@/types/TaskStatuses';
import CheckMark from '@/assets/icons/check-mark.svg';
import TrashIcon from '@/assets/icons/trash-ico.svg';
import { ITaskCardProps } from './TaskCardProps';
import { classNames } from '@/lib';

import cls from './TaskCard.module.scss';

const TaskStatusesSvgs: Record<TaskStatusesType, string> = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,

};

export const TaskCard = (props: ITaskCardProps) => {
    const dispatch = useDispatch();
    const { task } = props;
    const [taskParameterFieldIsOpen, setTaskParameterFieldIsOpen] = useState<boolean>(false);
    const [parameterText, setParameterText] = useState<string>('');
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

    const addNewTaskParameter = (id: number) => {
        dispatch(addNewField({ parameterText, id }));
        setTaskParameterFieldIsOpen((prev) => !prev);
        setParameterText('');
    };

    const onTaskParameterFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setParameterText(event.target.value);
    };

    const clearTaskParameterField = () => {
        setTaskParameterFieldIsOpen((prev) => !prev);
        setParameterText('');
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
                <p className={classNames(cls.TaskCard__user_field__title)}>{task.name}</p>
                <img src={Avatar} alt="" />
            </div>
            <div className={classNames(cls.TaskCard__task_description_field)}>
                Задание:
                {task.content}
            </div>
            <div className={classNames(cls.TaskCard__status_field)}>
                <p className={classNames(cls.TaskCard__status_field__title)}>{task.status}</p>
                <img src={TaskStatusesSvgs[task.status as keyof typeof TaskStatusesSvgs]} alt="" />
            </div>

            {task.parameters && task.parameters?.map((parameter) => (
                <div>
                    {parameter}
                </div>
            ))}

            {!taskParameterFieldIsOpen ? (
                <button
                    type="button"
                    onClick={() => setTaskParameterFieldIsOpen((prev) => !prev)}
                    className={classNames(cls.TaskCard__show_parameter_field__btn)}
                >
                    +
                </button>
            ) : (
                <>
                    <input
                        onChange={(event) => onTaskParameterFieldChange(event)}
                        className={classNames(cls.TaskCard__parameter_field__input)}
                    />
                    <button
                        onClick={() => addNewTaskParameter(task.id)}
                        type="button"
                    >
                        <img src={CheckMark} alt="" />
                    </button>
                    <button onClick={clearTaskParameterField} type="button">
                        <img src={TrashIcon} alt="" />
                    </button>
                </>
            )}

        </div>
    );
};
