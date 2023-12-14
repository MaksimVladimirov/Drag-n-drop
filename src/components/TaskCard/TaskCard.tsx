/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import CompletedStatus from '@/assets/icons/taskStatuses/completed.svg';
import InReviewStatus from '@/assets/icons/taskStatuses/review.svg';
import AtWorkStatus from '@/assets/icons/taskStatuses/at_work.svg';
import LowPriority from '@/assets/icons/taskPriorities/low.svg';
import MediumPriority from '@/assets/icons//taskPriorities/medium.svg';
import HighPriority from '@/assets/icons/taskPriorities/high.svg';
import TodoStatus from '@/assets/icons/taskStatuses/todo.svg';
import { addTaskPriority, addTaskComment, addTaskDeadline } from '@/store/slices/kanbanBoardSlice';
import { TaskStatusesType } from '@/types/TaskStatuses';
import CheckMark from '@/assets/icons/check-mark.svg';
import ResetIcon from '@/assets/icons/reset.svg';
import { ITaskCardProps } from './TaskCardProps';
import Avatar from '@/assets/icons/avatar.svg';
import { classNames } from '@/lib';

import cls from './TaskCard.module.scss';
import { TaskPrioritiesType } from '@/types/TaskPrioritiesType';

export enum AddingTaskParameters {
    ADD_COMMENT = 'addComment',
    ADD_DEADLINE = 'addDeadline',
    ADD_PRIORITY = 'addPriority'
}

const TaskStatusesSvgs: Record<TaskStatusesType, string> = {
    Сделать: TodoStatus,
    'На ревью': InReviewStatus,
    Сделано: CompletedStatus,
    'В работе': AtWorkStatus,
};

const TaskPrioritiesSvgs: Record<TaskPrioritiesType, string> = {
    низкая: LowPriority,
    средняя: MediumPriority,
    высокая: HighPriority,
};

const options = [
    { value: AddingTaskParameters.ADD_COMMENT, label: 'Добавить комментарий' },
    { value: AddingTaskParameters.ADD_DEADLINE, label: 'Добавить дэдлайн' },
    { value: AddingTaskParameters.ADD_PRIORITY, label: 'Добавить приоритетность' },
];

export const TaskCard = (props: ITaskCardProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [taskParameterFieldIsOpen, setTaskParameterFieldIsOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [addingParam, setAddingParam] = useState<AddingTaskParameters | string>('');

    const dispatch = useDispatch();
    const { task } = props;
    const {
        setNodeRef, attributes, listeners, isDragging, transition, transform,
    } = useSortable({
        id: task.taskId,
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
                {...attributes}
                {...listeners}
            />
        );
    }

    const showTaskParametersSelect = () => {
        setComment('');
        setAddingParam('');
        setTaskParameterFieldIsOpen((prev) => !prev);
    };

    const addNewTaskParameter = (selectedAddingParam: AddingTaskParameters) => {
        setTaskParameterFieldIsOpen((prev) => !prev);
        setAddingParam(selectedAddingParam);
    };

    const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedTaskPriority = event.target.value;
        const id = task.taskId;
        dispatch(addTaskPriority({ selectedTaskPriority, id }));
        setAddingParam('');
    };

    const handleCommentChange = () => {
        const id = task.taskId;
        dispatch(addTaskComment({ comment, id }));
        setAddingParam('');
    };

    const clearTaskParameterField = () => {
        setComment('');
    };

    const handleDatePickerChange = (date: any, dateString: string) => {
        const id = task.taskId;
        dispatch(addTaskDeadline({ dateString, id }));
        setAddingParam('');
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

            {task.comment && (
                <div className={classNames(cls.TaskCard__comment_field)}>
                    {task.comment}
                </div>
            )}

            {(addingParam === AddingTaskParameters.ADD_PRIORITY && !task.taskPriority) && (
                <select onChange={handlePriorityChange}>
                    <option value="" disabled selected hidden>Приоритетность</option>
                    <option value="низкая">Низкая</option>
                    <option value="средняя">Средняя</option>
                    <option value="высокая">Высокая</option>

                </select>
            )}

            {(addingParam === AddingTaskParameters.ADD_DEADLINE && !task.deadline) && (
                <DatePicker size="small" showTime onChange={handleDatePickerChange} />
            )}

            {(addingParam === AddingTaskParameters.ADD_COMMENT && !task.comment) && (
                <>
                    <input
                        type="text"
                        value={comment}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => (
                            setComment(event.target.value))}
                    />
                    <button
                        onClick={handleCommentChange}
                        type="button"
                    >
                        <img src={CheckMark} alt="" />
                    </button>
                    <button onClick={clearTaskParameterField} type="button">
                        <img src={ResetIcon} alt="" />
                    </button>
                </>
            )}

            {task.deadline && (
                <div className={classNames(cls.TaskCard__priority_field)}>
                    {`Сделать до ${task.deadline}`}
                </div>
            )}

            {task.taskPriority && (
                <div className={classNames(cls.TaskCard__priority_field)}>
                    <img src={TaskPrioritiesSvgs[task.taskPriority as keyof typeof TaskPrioritiesSvgs]} alt="" />
                    {`Приоритетность ${task.taskPriority}`}
                </div>
            )}

            <button
                type="button"
                onClick={showTaskParametersSelect}
                className={classNames(cls.TaskCard__show_parameters)}
            >
                +
            </button>

            {taskParameterFieldIsOpen && (
                <div className={classNames(cls.TaskCard__parameters_option)}>
                    {options.map((option) => (
                        <button
                            type="button"
                            onClick={() => addNewTaskParameter(option.value)}
                            className={classNames(cls.TaskCard__parameters_option__select)}
                        >
                            {option.label}

                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
