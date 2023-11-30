/* eslint-disable react/jsx-no-bind */
import {
    DndContext,
    type DragEndEvent,
    type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import TaskCard from '../TaskCard/TaskCard';
import cls from './KanbanBoard.module.scss';
import {
    moveColumns, moveTaskToColumn, moveTasks, setActiveTask,
} from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';

interface KanbanBoardProps {
    boardType: string
}

export function FlatKanbanBoard(props: KanbanBoardProps) {
    const { boardType } = props;
    const dispatch = useDispatch();

    const columns = useSelector((state: RootState) => state.kanbanSlice.columns);
    const tasks = useSelector((state: RootState) => state.kanbanSlice.tasks);
    const activeTask = useSelector((state: RootState) => state.kanbanSlice.activeTask);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task') {
            dispatch(setActiveTask(event.active.data.current.task));
        }
    }

    function onDragEnd(event: DragEndEvent) {
        dispatch(setActiveTask(null));

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === 'Column';
        if (!isActiveAColumn) return;

        dispatch(moveColumns({ activeId, overId }));
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            dispatch(moveTasks({ activeId, overId }));
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }));
        }
    }

    return (
        <div className={cls.KanbanBoard}>
            <DndContext
                sensors={sensors}
                // TODO: Fix
                // eslint-disable react/jsx-no-bind
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className={cls.column_container}>
                    {columns.map((col) => (
                        <ColumnContainer
                            key={col.status}
                            column={col}
                            tasks={tasks.filter((task) => task.taskStatus === col.status)}
                            boardType={boardType}
                        />
                    ))}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body,
                )}
            </DndContext>
        </div>
    );
}
