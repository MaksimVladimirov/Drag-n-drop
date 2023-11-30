/* eslint-disable react/jsx-no-bind */
import { useMemo, useState } from 'react';
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
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { type Column, type Task } from '@/widgets/types';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import TaskCard from '../TaskCard/TaskCard';
import cls from './KanbanBoard.module.scss';

const defaultCols: Column[] = [
    {
        status: 'Сделать',
    },
    {
        status: 'В работе',

    },
    {
        status: 'На ревью',

    },
    {
        status: 'Сделано',

    },
];

const defaultTasks: Task[] = [
    {
        id: '1',
        taskStatus: 'Сделать',
        content: 'Покрасить кнопку',
    },
    {
        id: '2',
        taskStatus: 'Сделать',
        content: 'Покрасить кнопку',
    },
    {
        id: '3',
        taskStatus: 'В работе',
        content: 'Покрасить кнопку',
    },
    {
        id: '4',
        taskStatus: 'На ревью',
        content: 'Покрасить кнопку',
    },
    {
        id: '5',
        taskStatus: 'Сделано',
        content: 'Покрасить кнопку',
    },
    {
        id: '6',
        taskStatus: 'На ревью',
        content: 'Покрасить кнопку',
    },
    {
        id: '7',
        taskStatus: 'Сделано',
        content: 'Покрасить кнопку',
    },
    {
        id: '8',
        taskStatus: 'Сделать',
        content: 'Покрасить кнопку',
    },
    {
        id: '9',
        taskStatus: 'Сделать',
        content: 'Покрасить кнопку',
    },
    {
        id: '10',
        taskStatus: 'На ревью',
        content: 'Покрасить кнопку',
    },
    {
        id: '11',
        taskStatus: 'На ревью',
        content: 'Покрасить кнопку',
    },
    {
        id: '12',
        taskStatus: 'В работе',
        content: 'Покрасить кнопку',
    },
    {
        id: '13',
        taskStatus: 'В работе',
        content: 'Покрасить кнопку',
    },
];

export function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.status), [columns]);

    const [tasks, setTasks] = useState<Task[]>(defaultTasks);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === 'Column';
        if (!isActiveAColumn) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.status === activeId);

            const overColumnIndex = columns.findIndex((col) => col.status === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
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
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].taskStatus !== tasks[overIndex].taskStatus) {
                    // TODO: fix
                    // eslint-disable-next-line no-param-reassign
                    tasks[activeIndex].taskStatus = tasks[overIndex].taskStatus;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                // TODO: fix
                // eslint-disable-next-line no-param-reassign
                tasks[activeIndex].taskStatus = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
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
                <div className="m-auto flex gap-4">
                    <div className={cls.column_container}>
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.status}
                                    column={col}
                                    tasks={tasks.filter((task) => task.taskStatus === col.status)}
                                />
                            ))}
                        </SortableContext>
                    </div>
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
