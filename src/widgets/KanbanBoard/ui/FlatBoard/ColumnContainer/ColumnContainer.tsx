import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { Column, Task } from '@/widgets/types';

import cls from './ColumnContainter.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import TaskCard from '../TaskCard/TaskCard';

interface Props {
    column: Column;
    tasks: Task[];
    boardType: string
}

function ColumnContainer(props: Props) {
    const { column, tasks, boardType } = props;
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const { setNodeRef } = useSortable({
        id: column.status,
        data: {
            type: 'Column',
            column,
        },
    });

    return (
        <div
            className={classNames(cls.ColumnContainer, {}, [boardType])}
            ref={setNodeRef}
        >
            <h4 className={cls.column_title}>{column.status}</h4>
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
}

export default ColumnContainer;
