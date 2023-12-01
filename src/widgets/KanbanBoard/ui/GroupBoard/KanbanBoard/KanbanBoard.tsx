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
import { moveTaskToColumn, moveTasks, setActiveTask } from '@/app/store/KanbanStore';
import { RootState } from '@/app/store/store';

interface KanbanBoardProps {
    boardType: string
}

export function GroupKanbanBoard(props: KanbanBoardProps) {
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

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }));
        }
    }

    // Уникальные исполнители
    const executors = [...new Set(tasks.map((task) => task.executor))];

    return (
        <div className={cls.KanbanBoard}>

            <div className={cls.column_container}>

                {executors.map((executor) => (
                    <DndContext
                        sensors={sensors}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                    >
                        <div key={executor}>
                            <h3>{executor}</h3>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.status}
                                    column={col}
                                    tasks={tasks.filter((task) => (
                                        task.taskStatus === col.status
                                        && task.executor === executor))}
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
                ))}
            </div>
        </div>
    );
}
