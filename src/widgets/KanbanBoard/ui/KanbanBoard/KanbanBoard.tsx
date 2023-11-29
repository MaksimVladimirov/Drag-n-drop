import { useMemo, useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Column, Id, Task } from "@/widgets/types";
import ColumnContainer from "../ColumnContainer/ColumnContainer";
import TaskCard from "../TaskCard/TaskCard";
import cls from './KanbanBoard.module.scss';

const defaultCols: Column[] = [
    {
        id: "todo",
        title: "Todo",
    },
    {
        id: "doing",
        title: "In progress",
    },
    {
        id: "review",
        title: "Code review",
    },
    {
        id: "done",
        title: "Done",
    },
];

const defaultTasks: Task[] = [
    {
        id: "1",
        columnId: "todo",
        content: "Покрасить кнопку",
    },
    {
        id: "2",
        columnId: "todo",
        content: "Покрасить кнопку",
    },
    {
        id: "3",
        columnId: "doing",
        content: "Покрасить кнопку",
    },
    {
        id: "4",
        columnId: "review",
        content: "Покрасить кнопку",
    },
    {
        id: "5",
        columnId: "done",
        content: "Покрасить кнопку",
    },
    {
        id: "6",
        columnId: "review",
        content: "Покрасить кнопку",
    },
    {
        id: "7",
        columnId: "done",
        content: "Покрасить кнопку",
    },
    {
        id: "8",
        columnId: "todo",
        content: "Покрасить кнопку",
    },
    {
        id: "9",
        columnId: "todo",
        content: "Покрасить кнопку",
    },
    {
        id: "10",
        columnId: "review",
        content: "Покрасить кнопку",
    },
    {
        id: "11",
        columnId: "review",
        content: "Покрасить кнопку",
    },
    {
        id: "12",
        columnId: "doing",
        content: "Покрасить кнопку",
    },
    {
        id: "13",
        columnId: "doing",
        content: "Покрасить кнопку",
    },
];

export function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tasks, setTasks] = useState<Task[]>(defaultTasks);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <div className={cls.KanbanBoard}>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="m-auto flex gap-4">
                    <div className={cls.column_container}>
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                </div>

                {activeColumn && (
                    <ColumnContainer
                        column={activeColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                        tasks={tasks.filter(
                            (task) => task.columnId === activeColumn.id
                        )}
                    />
                )}
                {createPortal(
                    
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
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

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
}

function generateId() {

    return Math.floor(Math.random() * 10001);
}
