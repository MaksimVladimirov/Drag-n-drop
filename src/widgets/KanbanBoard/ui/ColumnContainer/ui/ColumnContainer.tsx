import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TaskCard } from '@/shared/ui/TaskCard/TaskCard';
import { BoardTypeEnum } from '@/pages/BoardPage/ui/BoardPage';
import { Task } from '@/app/store/KanbanStore';
import cls from './ColumnContainter.module.scss';

interface Props {
    columnName: string;
    tasks: Task[];
    switchType: BoardTypeEnum;
}

export const ColumnContainer = (props: Props) => {
    const { columnName, tasks, switchType } = props;
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const { setNodeRef, transition, transform } = useSortable({
        id: columnName,
        data: {
            type: switchType,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            className={classNames(cls.ColumnContainer)}
            ref={setNodeRef}
            style={style}
        >
            <div className={classNames(cls.ColumnContainer_title)}>
                {switchType === BoardTypeEnum.SWITCH_BETWEEN_USERS
                    && 'Задачи пользователя '}
                <span>{columnName}</span>
            </div>

            <div>
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};
