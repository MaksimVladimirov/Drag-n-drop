import { useSortable } from '@dnd-kit/sortable';
import { Task } from '@/widgets/types';

import { classNames } from '@/shared/lib/classNames/classNames';
import TaskCard from '@/shared/ui/TaskCard/TaskCard';
import { BoardTypeEnum } from '@/pages/BoardPage/ui/BoardPage';
import cls from './ColumnContainter.module.scss';

interface Props {
    columnName: string;
    tasks: Task[];
    switchType: BoardTypeEnum;
}

export const ColumnContainer = (props: Props) => {
    const { columnName, tasks, switchType } = props;

    const { setNodeRef } = useSortable({
        id: columnName,
        data: {
            type: switchType,
        },
    });

    return (
        <div
            className={classNames(cls.ColumnContainer)}
            ref={setNodeRef}
        >
            <div className={classNames(cls.ColumnContainer_title)}>
                {switchType === BoardTypeEnum.SWITCH_BETWEEN_USERS
                    && 'Задачи пользователя '}
                <span>{columnName}</span>
            </div>

            <div>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};
