/* eslint-disable react/jsx-no-bind */
import {
    DndContext,
    DragOverlay,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useMemo } from 'react';
import { moveTaskToColumn, moveTasks, setActiveTask } from '@/store/slices/kanbanBoardSlice';
import { ColumnContainer, TaskCard } from '@/components';
import {
    getActiveTask, getInitialTasks, getUserNames, getUserStatuses,
} from '@/store/selectors/kanbanBoardSelectors';
import { IKanbanBoardProps } from './KanbanBoardProps';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { classNames } from '@/lib';

import cls from './KanbanBoard.module.scss';

export const KanbanBoard: FC<IKanbanBoardProps> = (props) => {
    const { boardType, taskParametersToDisplay } = props;
    const userStatusesColumns = useSelector(getUserStatuses);
    const userNamesColumns = useSelector(getUserNames);
    const activeTask = useSelector(getActiveTask);
    const tasks = useSelector(getInitialTasks);
    const dispatch = useDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const filterTasksByColumnName = useMemo(() => (columnName: string) => {
        let filteredTasks = null;
        if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
            filteredTasks = tasks.filter((task) => task.userName === columnName);
        } else {
            filteredTasks = tasks.filter((task) => task.taskStatus === columnName);
        }
        return filteredTasks;
    }, [boardType, tasks]);

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task') {
            dispatch(setActiveTask(event.active.data.current.task));
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask: boolean = active.data.current?.type === 'Task';
        const isOverATask: boolean = over.data.current?.type === 'Task';
        const isOverAStatusColumn: boolean = over.data.current?.type === boardType;
        const isOverANameColumn: boolean = over.data.current?.type === boardType;
        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            dispatch(moveTasks({ activeId, overId, boardType }));
        }

        if (isActiveATask && (isOverAStatusColumn || isOverANameColumn)) {
            dispatch(moveTaskToColumn({ activeId, overId, boardType }));
        }
        dispatch(setActiveTask(null));
    }

    return (
        <div className={classNames(cls.KanbanBoard)}>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <div className={classNames(cls.KanbanBoard_container)}>
                    {(boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES
                        ? userStatusesColumns
                        : userNamesColumns)
                        .map((columnName) => (
                            <ColumnContainer
                                switchType={boardType}
                                key={columnName}
                                columnName={columnName}
                                tasks={filterTasksByColumnName(columnName)}
                                taskParametersToDisplay={taskParametersToDisplay}
                            />
                        ))}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                taskParametersToDisplay={taskParametersToDisplay}
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
