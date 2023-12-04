import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Column, Task } from '@/widgets/types';

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

type Users = {
    name: string
}

const defaultUsers: Users[] = [
    {
        name: 'Samantha Davis',
    },
    {
        name: 'John Smith',

    },
    {
        name: 'Robert Pattinson',

    },
    {
        name: 'Bruce Wayne',

    },
];

const defaultTasks: Task[] = [
    {
        id: '1',
        taskStatus: 'Сделать',
        content: 'Покрасить кнопку',
        executor: 'Samantha Davis',
    },
    {
        id: '2',
        taskStatus: 'Сделать',
        content: 'Редизайн в соответсвии с Figma',
        executor: 'Samantha Davis',
    },
    {
        id: '3',
        taskStatus: 'В работе',
        content: 'Типизация данных',
        executor: 'John Smith',
    },
    {
        id: '4',
        taskStatus: 'На ревью',
        content: 'Изменить шрифты',
        executor: 'John Smith',
    },
    {
        id: '5',
        taskStatus: 'Сделано',
        content: 'Вынести в глобальные переменные',
        executor: 'Samantha Davis',
    },
    {
        id: '6',
        taskStatus: 'На ревью',
        content: 'Настроить линтер',
        executor: 'Robert Pattinson',
    },
    {
        id: '7',
        taskStatus: 'Сделано',
        content: 'Настроить prettier',
        executor: 'John Smith',
    },
    {
        id: '8',
        taskStatus: 'Сделать',
        content: 'Получение данных с бэка',
        executor: 'Robert Pattinson',
    },
    {
        id: '9',
        taskStatus: 'Сделать',
        content: 'Исправить местополодение пользователя',
        executor: 'Bruce Wayne',
    },
    {
        id: '10',
        taskStatus: 'На ревью',
        content: 'Сдвинуть кнопку на 10px',
        executor: 'Robert Pattinson',
    },
    {
        id: '11',
        taskStatus: 'На ревью',
        content: 'Покрасить кнопку',
        executor: 'John Smith',
    },
    {
        id: '12',
        taskStatus: 'В работе',
        content: 'Рефакторинг страницы',
        executor: 'John Smith',
    },
    {
        id: '13',
        taskStatus: 'В работе',
        content: 'Исправления после тестирования',
        executor: 'Bruce Wayne',
    },
];

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState: {
        columns: [...defaultCols],
        tasks: [...defaultTasks],
        users: [...defaultUsers],
        activeTask: null,
    },
    reducers: {
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        moveTasks: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            const overIndex = state.tasks.findIndex((t) => t.id === overId);

            if (state.tasks[activeIndex].taskStatus !== state.tasks[overIndex].taskStatus) {
                state.tasks[activeIndex].taskStatus = state.tasks[overIndex].taskStatus;
                state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
            } else {
                state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
            }
        },
        moveTasksToNames: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            const overIndex = state.tasks.findIndex((t) => t.id === overId);

            if (state.tasks[activeIndex].executor !== state.tasks[overIndex].executor) {
                state.tasks[activeIndex].executor = state.tasks[overIndex].executor;
                state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
            } else {
                state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
            }
        },

        moveTaskToColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            state.tasks[activeIndex].taskStatus = overId;
        },

        moveTaskToNameColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            state.tasks[activeIndex].executor = overId;
        },
    },
});

export const {
    setActiveTask,
    setTasks,
    moveTasks,
    moveTaskToColumn,
    moveTaskToNameColumn,
    moveTasksToNames,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
