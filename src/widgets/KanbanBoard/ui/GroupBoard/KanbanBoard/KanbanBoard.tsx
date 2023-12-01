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
import TaskCard from '../TaskCard/TaskCard';
import cls from './KanbanBoard.module.scss';
import { moveTaskToColumn, moveTasks, setActiveTask } from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';
import { ExecutorContainer } from '../ExecutorCon/ExecutorContainer';

export function GroupKanbanBoard() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.kanbanSlice.users);
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

    function onDragEnd() {
        dispatch(setActiveTask(null));
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
        console.log(over.data.current?.type);
        const isOverAStatusColumn = over.data.current?.type === 'Status';
        if (isActiveATask && isOverAStatusColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }));
        }

        const isOverAUserColumn = over.data.current?.type === 'User';
        if (isActiveATask && isOverAUserColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }));
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
                    {users.map((users) => (
                        <DndContext
                            sensors={sensors}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onDragOver={onDragOver}
                        >
                            <ExecutorContainer key={users.name} user={users.name} tasks={tasks} />
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
                    ))}
                </div>
            </DndContext>

        </div>
    );
}
