import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { IColumnContainerProps } from './ColumnContainerProps';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { TaskCard } from '@/components';
import { classNames } from '@/lib';

import cls from './ColumnContainter.module.scss';

export const ColumnContainer = (props: IColumnContainerProps) => {
    const {
        columnName, tasks, switchType, taskParametersToDisplay,
    } = props;
    const tasksIds: number[] = useMemo(() => tasks.map((task) => task.taskId), [tasks]);

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
        <div>
            <div
                className={classNames(cls.ColumnContainer)}
                ref={setNodeRef}
                style={style}
            >
                <div className={classNames(cls.ColumnContainer_title)}>
                    {switchType === BoardTypeEnum.SWITCH_BETWEEN_USERS
                        ? 'Задачи пользователя: ' : 'Задачи в статусе: '}
                    <span>{columnName}</span>
                </div>

                <div>
                    <SortableContext items={tasksIds}>
                        {tasks.map((task) => (
                            <TaskCard
                                taskParametersToDisplay={taskParametersToDisplay}
                                key={task.taskId}
                                task={task}
                            />
                        ))}
                    </SortableContext>
                </div>
            </div>
        </div>
    );
};
