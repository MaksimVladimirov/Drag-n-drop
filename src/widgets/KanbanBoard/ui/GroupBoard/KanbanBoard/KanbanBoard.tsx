/* eslint-disable react/jsx-no-bind */
import {
    DndContext,
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
    moveTaskToColumn, moveTaskToNameColumn, moveTasks, moveTasksToNames, setActiveTask,
} from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';

interface KanbanBoardProps {
    boardType: string
}

export function GroupKanbanBoard(props: KanbanBoardProps) {
    const { boardType } = props;
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.kanbanSlice.tasks);
    const activeTask = useSelector((state: RootState) => state.kanbanSlice.activeTask);
    const users = useSelector((state: RootState) => state.kanbanSlice.users);

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

    function onDragEnd() {
        dispatch(setActiveTask(null));
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        console.log(over.id);

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;
        if (isActiveATask && isOverATask) {
            dispatch(moveTasksToNames({ activeId, overId }));
        }

        const isOverAColumn = over.data.current?.type === 'Status';

        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToNameColumn({ activeId, overId }));
        }
    }

    return (
        <div className={cls.KanbanBoard}>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className={cls.column_container}>
                    {users.map((user) => (
                        <ColumnContainer
                            key={user.name}
                            column={user}
                            tasks={tasks.filter((task) => task.executor === user.name)}
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
