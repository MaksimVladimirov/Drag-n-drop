import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { Column, Task } from '@/widgets/types';
import TaskCard from '../TaskCard/TaskCard';

import cls from './ColumnContainter.module.scss';

interface Props {
    column: Column;
    tasks: Task[];
}

function ColumnContainer(props: Props) {
    const { column, tasks } = props;
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
            className={cls.ColumnContainer}
            ref={setNodeRef}
        >
            <p>{column.status}</p>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
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
