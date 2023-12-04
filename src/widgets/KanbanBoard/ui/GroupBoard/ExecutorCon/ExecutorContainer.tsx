import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { RootState } from '@/app/store/store';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import { Task } from '@/widgets/types';

interface ExecutorContainerProps {
    user: string;
    tasks: any
}

export const ExecutorContainer: FC<ExecutorContainerProps> = (props) => {
    const { user, tasks } = props;
    const columns = useSelector((state: RootState) => state.kanbanSlice.columns);
    const columnsId = useMemo(() => columns.map((column) => column.status), [columns]);
    const { setNodeRef } = useSortable({
        id: user,
        data: {
            type: 'User',
        },
    });

    return (
        <div ref={setNodeRef}>
            <h3>{user}</h3>
            <SortableContext items={columnsId}>
                {columns.map((col) => (
                    <ColumnContainer
                        key={col.status}
                        column={col}
                        tasks={tasks.filter((task: Task) => (
                            task.taskStatus === col.status
                            && task.executor === user))}
                        executor={user}
                    />
                ))}
            </SortableContext>

        </div>
    );
};
