import { ChangeEvent, useState } from 'react';

import { KanbanBoard } from '@/components';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { classNames } from '@/lib';

import cls from './BoardPage.module.scss';

const BoardPage = () => {
    const [boardType, setBoardType] = useState<BoardTypeEnum>(BoardTypeEnum.SWITCH_BETWEEN_USERS);
    const [taskParametersToDisplay, setTaskParametersToDisplay] = useState<string[]>([]);
    const handleChangeBoardType = (e: ChangeEvent<HTMLSelectElement>) => {
        setBoardType(e.target.value as BoardTypeEnum);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (taskParametersToDisplay.includes(value)) {
            setTaskParametersToDisplay(taskParametersToDisplay.filter((taskParameter) => taskParameter !== value));
        } else {
            setTaskParametersToDisplay([...taskParametersToDisplay, value]);
        }
    };

    return (
        <div className={classNames(cls.BoardPage)}>
            <h2 className={classNames(cls.BoardPage_title)}> Доска</h2>
            <select className={classNames(cls.BoardPage_select)} onChange={handleChangeBoardType}>
                <option value="switchingBetweenUsers">Переключение между пользователями</option>
                <option value="switchingBetweenStatuses">Переключение между статусами</option>
            </select>

            <div className={classNames(cls.BoardPage_additional_params)}>
                <div className={classNames(cls.BoardPage_additional_params_block)}>
                    <input
                        className={classNames(cls.BoardPage_additional_params_block__checkbox)}
                        type="checkbox"
                        value="comments"
                        checked={taskParametersToDisplay.includes('comments')}
                        onChange={handleCheckboxChange}
                    />
                    Отобразить комментарии задач
                </div>
                <div className={classNames(cls.BoardPage_additional_params_block)}>
                    <input
                        className={classNames(cls.BoardPage_additional_params_block__checkbox)}
                        type="checkbox"
                        value="deadlines"
                        checked={taskParametersToDisplay.includes('deadlines')}
                        onChange={handleCheckboxChange}
                    />
                    Отобразить сроки выполнения задач
                </div>
                <div className={classNames(cls.BoardPage_additional_params_block)}>
                    <input
                        className={classNames(cls.BoardPage_additional_params_block__checkbox)}
                        type="checkbox"
                        value="priority"
                        checked={taskParametersToDisplay.includes('priority')}
                        onChange={handleCheckboxChange}
                    />
                    Отобразить приоритетность задач
                </div>
            </div>
            <KanbanBoard boardType={boardType} taskParametersToDisplay={taskParametersToDisplay} />
        </div>
    );
};

export default BoardPage;
