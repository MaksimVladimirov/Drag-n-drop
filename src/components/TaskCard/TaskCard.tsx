/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-date-picker';
import { TaskParameter } from '@/components';
import CompletedStatus from '@/assets/icons/taskStatuses/completed.svg';
import InReviewStatus from '@/assets/icons/taskStatuses/review.svg';
import AtWorkStatus from '@/assets/icons/taskStatuses/at_work.svg';
import TodoStatus from '@/assets/icons/taskStatuses/todo.svg';
import { addNewField, addTaskPriority, addTaskComment } from '@/store/slices/kanbanBoardSlice';
import { TaskStatusesType } from '@/types/TaskStatuses';
import CheckMark from '@/assets/icons/check-mark.svg';
import ResetIcon from '@/assets/icons/reset.svg';
import { ITaskCardProps } from './TaskCardProps';
import Avatar from '@/assets/icons/avatar.svg';
import { classNames } from '@/lib';

import cls from './TaskCard.module.scss';

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

const options = [
    { value: AddingTaskParameters.ADD_COMMENT, label: 'Добавить комментарий' },
    { value: AddingTaskParameters.ADD_DEADLINE, label: 'Добавить время' },
    { value: AddingTaskParameters.ADD_PRIORITY, label: 'Добавить приоритетность' },
];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const TaskCard = (props: ITaskCardProps) => {
    const [value, onChange] = useState<Value>(new Date());
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

    // const onTaskParameterFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addNewTaskParameter(task.taskId);
    //     } else if (event.key === 'Escape') {
    //         clearTaskParameterField();
    //     }
    // };

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

            {task.taskPriority && (
                <div className={classNames(cls.TaskCard__priority_field)}>
                    {`Приоритеность ${task.taskPriority}`}
                </div>
            )}

            {task.parameters && task.parameters?.map((parameter) => (
                <TaskParameter key={parameter.paramId} parameterText={parameter.paramText} />
            ))}

            {(addingParam === AddingTaskParameters.ADD_PRIORITY && !task.taskPriority) && (
                <select onChange={handlePriorityChange}>
                    <option value="" disabled selected hidden>Приоритетность</option>
                    <option value="низкая">Низкая</option>
                    <option value="средняя">Средняя</option>
                    <option value="высокая">Высокая</option>

                </select>
            )}

            {(addingParam === AddingTaskParameters.ADD_DEADLINE && !task.deadline) && (
                <DatePicker
                    onChange={onChange}
                    value={value}
                />
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
