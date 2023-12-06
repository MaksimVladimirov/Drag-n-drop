import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardTypeEnum } from '@/pages/BoardPage/ui/BoardPage';

export type Task = {
    id: number;
    status: string;
    content: string;
    name: string
  };

const defaultTasks: Task[] = [
    {
        id: 1,
        status: 'Сделать',
        content: 'Покрасить кнопку',
        name: 'Samantha Davis',
    },
    {
        id: 2,
        status: 'Сделать',
        content: 'Редизайн в соответсвии с Figma',
        name: 'Samantha Davis',
    },
    {
        id: 3,
        status: 'В работе',
        content: 'Типизация данных',
        name: 'John Smith',
    },
    {
        id: 4,
        status: 'На ревью',
        content: 'Изменить шрифты',
        name: 'John Smith',
    },
    {
        id: 5,
        status: 'Сделано',
        content: 'Вынести в глобальные переменные',
        name: 'Samantha Davis',
    },
    {
        id: 6,
        status: 'На ревью',
        content: 'Настроить линтер',
        name: 'Robert Pattinson',
    },
    {
        id: 7,
        status: 'Сделано',
        content: 'Настроить prettier',
        name: 'John Smith',
    },
    {
        id: 8,
        status: 'Сделать',
        content: 'Получение данных с бэка',
        name: 'Robert Pattinson',
    },
    {
        id: 9,
        status: 'Сделать',
        content: 'Исправить местополодение пользователя',
        name: 'Bruce Wayne',
    },
    {
        id: 10,
        status: 'На ревью',
        content: 'Сдвинуть кнопку на 10px',
        name: 'Robert Pattinson',
    },
    {
        id: 11,
        status: 'На ревью',
        content: 'Покрасить кнопку',
        name: 'John Smith',
    },
    {
        id: 12,
        status: 'В работе',
        content: 'Рефакторинг страницы',
        name: 'John Smith',
    },
    {
        id: 13,
        status: 'В работе',
        content: 'Исправления после тестирования',
        name: 'Bruce Wayne',
    },
];

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState: {
        statusColumns: [...new Set(defaultTasks.map((task) => task.status))],
        nameColumns: [...new Set(defaultTasks.map((task) => task.name))],
        tasks: defaultTasks,
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
            const { activeId, overId, boardType } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            const overIndex = state.tasks.findIndex((t) => t.id === overId);

            if (boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES) {
                if (state.tasks[activeIndex].status !== state.tasks[overIndex].status) {
                    state.tasks[activeIndex].status = state.tasks[overIndex].status;
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
                } else {
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
                }
            } else if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
                if (state.tasks[activeIndex].name !== state.tasks[overIndex].name) {
                    state.tasks[activeIndex].name = state.tasks[overIndex].name;
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
                } else {
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
                }
            }
        },

        moveTaskToColumn: (state, action) => {
            const { activeId, overId, boardType } = action.payload;
            const activeIndex = state.tasks.findIndex((t) => t.id === activeId);
            if (boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES) {
                state.tasks[activeIndex].status = overId;
            } else if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
                state.tasks[activeIndex].name = overId;
            }
        },

    },
});

export const {
    setActiveTask,
    setTasks,
    moveTasks,
    moveTaskToColumn,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
