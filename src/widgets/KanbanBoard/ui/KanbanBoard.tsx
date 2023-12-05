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

import { FC } from 'react';
import cls from './KanbanBoard.module.scss';
import {
    moveTaskToColumn,
    moveTaskToNameColumn, moveTasks, moveTasksToNames, setActiveTask,
} from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';
import TaskCard from '@/shared/ui/TaskCard/TaskCard';
import { BoardTypeEnum } from '@/pages/BoardPage/ui/BoardPage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ColumnContainer } from '@/features/ColumnContainer';

interface Props {
    boardType: BoardTypeEnum
}

export const KanbanBoard: FC<Props> = (props) => {
    const { boardType } = props;
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.kanbanSlice.tasks);
    const activeTask = useSelector((state: RootState) => state.kanbanSlice.activeTask);
    const statusColumns = useSelector((state: RootState) => state.kanbanSlice.statusColumns);
    const nameColumns = useSelector((state: RootState) => state.kanbanSlice.nameColumns);

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
        const isOverAStatusColumn = over.data.current?.type === BoardTypeEnum.SWITCH_BETWEEN_STATUSES;
        const isOverANameColumn = over.data.current?.type === BoardTypeEnum.SWITCH_BETWEEN_USERS;

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            dispatch(moveTasks({ activeId, overId, isOverAStatusColumn }));
        }


        if (isActiveATask && (isOverAStatusColumn || isOverANameColumn)) {
            dispatch(moveTaskToColumn({ activeId, overId, isOverAStatusColumn }));
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
                    {(boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES
                        ? statusColumns
                        : nameColumns)
                        .map((column) => (
                            <ColumnContainer
                                switchType={boardType}
                                key={column}
                                columnName={column}
                                tasks={boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS
                                    ? tasks.filter((task) => task.name === column)
                                    : tasks.filter((task) => task.status === column)}
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
