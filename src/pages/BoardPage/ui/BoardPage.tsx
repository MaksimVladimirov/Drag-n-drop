import { ChangeEvent, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BoardPage.module.scss';
import { KanbanBoard } from '@/widgets/KanbanBoard';

export enum BoardTypeEnum {
    SWITCH_BETWEEN_USERS = 'switchingBetweenUsers',
    SWITCH_BETWEEN_STATUSES = 'switchingBetweenStatuses'
}

const BoardPage = () => {
    const [boardType, setBoardType] = useState<BoardTypeEnum>(BoardTypeEnum.SWITCH_BETWEEN_USERS);

    const handleChangeBoardType = (e: ChangeEvent<HTMLSelectElement>) => {
        setBoardType(e.target.value as BoardTypeEnum);
    };

    return (
        <div className={classNames(cls.BoardPage)}>
            <h2 className={classNames(cls.BoardPage_title)}> Доска</h2>
            <select className={classNames(cls.BoardPage_select)} onChange={handleChangeBoardType}>
                <option value="switchingBetweenUsers">Переключение между пользователями</option>
                <option value="switchingBetweenStatuses">Переключение между статусами</option>
            </select>
            <KanbanBoard boardType={boardType} />
        </div>
    );
};

export default BoardPage;
