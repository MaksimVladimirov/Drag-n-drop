/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import { addTaskPriority, addTaskComment, addTaskDeadline } from '@/store/slices/kanbanBoardSlice';
import CheckMark from '@/assets/icons/check-mark.svg';
import ResetIcon from '@/assets/icons/reset.svg';
import { ITaskCardProps } from './TaskCardProps';
import Avatar from '@/assets/icons/avatar.svg';
import { classNames } from '@/lib';
import { AddingTaskParameters } from '@/types/AddingTaskParametersEnum';
import { TaskStatusesSvgs } from './taskObjects/TaskStatusesSvgs';
import { TaskPrioritiesSvgs } from './taskObjects/TaskPrioritiesSvgs';

import cls from './TaskCard.module.scss';

const options = [
    { value: AddingTaskParameters.ADD_COMMENT, label: 'Добавить комментарий' },
    { value: AddingTaskParameters.ADD_DEADLINE, label: 'Добавить дэдлайн' },
    { value: AddingTaskParameters.ADD_PRIORITY, label: 'Добавить приоритетность' },
];

export const TaskCard = (props: ITaskCardProps) => {
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

    const handleDatePickerChange = (date: any, dateString: string) => {
        console.log(date);
        const id = task.taskId;
        dispatch(addTaskDeadline({ dateString, id }));
        setAddingParam('');
    };

    const clearTaskParameterField = () => {
        setComment('');
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

            {/* Комментарии к задаче */}
            {task.comment && (
                <div className={classNames(cls.TaskCard__comment_field)}>
                    {task.comment}
                </div>
            )}

            {/* Добавления нового параметра к задаче */}
            {(addingParam === AddingTaskParameters.ADD_PRIORITY && !task.taskPriority) && (
                <select onChange={handlePriorityChange}>
                    <option value="" disabled selected hidden>Приоритетность</option>
                    <option value="низкая">Низкая</option>
                    <option value="средняя">Средняя</option>
                    <option value="высокая">Высокая</option>

                </select>
            )}

            {(addingParam === AddingTaskParameters.ADD_DEADLINE && !task.deadline) && (
                <DatePicker size="small" onChange={handleDatePickerChange} />
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

            {/* Сроки выполнения */}
            {task.deadline && (
                <div className={classNames(cls.TaskCard__deadline_field)}>
                    {`Сделать до ${task.deadline}`}
                </div>
            )}

            {/* Приоритетность задачи */}
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

            {/* Список параметров для добавления */}
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
