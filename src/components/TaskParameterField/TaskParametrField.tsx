/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

import cls from './TaskParametrField.module.scss';

interface TaskParametrFieldProps {
    className?: string;
}

export const TaskParametrField: FC<TaskParametrFieldProps> = (props) => {
    const { className } = props;
    return (
        <div>
            <input
                onChange={(event) => handleInputChange(event)}
                className={classNames(cls.TaskCard__input)}
            />
            <button
                onClick={() => addField(task.id)}
                type="button"
            >
                <img src={CheckMark} alt="" />
            </button>
            <button onClick={onRemoveField} type="button">
                <img src={TrashIcon} alt="" />
            </button>
        </div>
    );
};
