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

import cls from './KanbanBoard.module.scss';
import {
    moveTaskToNameColumn, moveTasksToNames, setActiveTask,
} from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';
import TaskCard from '@/shared/ui/TaskCard/TaskCard';
import { BoardTypeEnum } from '@/pages/BoardPage/ui/BoardPage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ColumnContainer } from '@/features/ColumnContainer';

export const UserTasksKanbanBoard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.kanbanSlice.tasks);
    const activeTask = useSelector((state: RootState) => state.kanbanSlice.activeTask);
    const uniqueUserNames = [...new Set(tasks.map((task) => task.userName))];

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
            dispatch(moveTasksToNames({ activeId, overId }));
        }

        const isOverAColumn = over.data.current?.type === BoardTypeEnum.SWITCH_BETWEEN_STATUSES;

        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToNameColumn({ activeId, overId }));
        }
    }

    return (
        <div className={classNames(cls.KanbanBoard)}>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className={classNames(cls.KanbanBoard_container)}>
                    {uniqueUserNames.map((userName) => (
                        <ColumnContainer
                            switchType={BoardTypeEnum.SWITCH_BETWEEN_USERS}
                            key={userName}
                            columnName={userName}
                            tasks={tasks.filter((task) => task.userName === userName)}
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
};
