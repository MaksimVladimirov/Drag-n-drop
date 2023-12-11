import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';

import { classNames } from '@/lib';
import { TaskCard } from '@/components';
import { IColumnContainerProps } from './ColumnContainerProps';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import cls from './ColumnContainter.module.scss';

export const ColumnContainer = (props: IColumnContainerProps) => {
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
