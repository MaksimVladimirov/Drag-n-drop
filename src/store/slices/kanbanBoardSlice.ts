import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { ITask } from '@/types/Task';
import { TaskStatusesType } from '@/types/TaskStatuses';

const defaultTasks: ITask[] = [
    {
        id: 1,
        status: 'Сделать',
        content: 'Покрасить кнопку',
        name: 'Samantha Davis',
        parameters: [],
    },
    {
        id: 2,
        status: 'Сделать',
        content: 'Редизайн в соответсвии с Figma',
        name: 'Samantha Davis',
        parameters: [],

    },
    {
        id: 3,
        status: 'В работе',
        content: 'Типизация данных',
        name: 'John Smith',
        parameters: [],

    },
    {
        id: 4,
        status: 'На ревью',
        content: 'Изменить шрифты',
        name: 'John Smith',
        parameters: [],

    },
    {
        id: 5,
        status: 'Сделано',
        content: 'Вынести в глобальные переменные',
        name: 'Samantha Davis',
        parameters: [],

    },
    {
        id: 6,
        status: 'На ревью',
        content: 'Настроить линтер',
        name: 'Robert Pattinson',
        parameters: [],

    },
    {
        id: 7,
        status: 'Сделано',
        content: 'Настроить prettier',
        name: 'John Smith',
        parameters: [],

    },
    {
        id: 8,
        status: 'Сделать',
        content: 'Получение данных с бэка',
        name: 'Robert Pattinson',
        parameters: [],

    },
    {
        id: 9,
        status: 'Сделать',
        content: 'Исправить местополодение пользователя',
        name: 'Bruce Wayne',
        parameters: [],

    },
    {
        id: 10,
        status: 'На ревью',
        content: 'Сдвинуть кнопку на 10px',
        name: 'Robert Pattinson',
        parameters: [],

    },
    {
        id: 11,
        status: 'На ревью',
        content: 'Покрасить кнопку',
        name: 'John Smith',
        parameters: [],

    },
    {
        id: 12,
        status: 'В работе',
        content: 'Рефакторинг страницы',
        name: 'John Smith',
        parameters: [],

    },
    {
        id: 13,
        status: 'В работе',
        content: 'Исправления после тестирования',
        name: 'Bruce Wayne',
        parameters: [],

    },
];

const defaultTaskStatuses: TaskStatusesType[] = ['Сделать', 'В работе', 'На ревью', 'Сделано'];

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState: {
        statusColumns: defaultTaskStatuses,
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
            const activeIndex = state.tasks.findIndex((task) => task.id === activeId);
            const overIndex = state.tasks.findIndex((task) => task.id === overId);

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
            const activeIndex = state.tasks.findIndex((task) => task.id === activeId);
            if (boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES) {
                state.tasks[activeIndex].status = overId;
            } else if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
                state.tasks[activeIndex].name = overId;
            }
        },

        addNewField: (state, action:PayloadAction<{parameterText:string, id: number}>) => {
            const { parameterText, id } = action.payload;
            if (parameterText === '') return;
            const activeIndex = state.tasks.findIndex((task) => task.id === id);
            state.tasks[activeIndex].parameters.push(parameterText);
        },

    },
});

export const {
    setActiveTask,
    setTasks,
    moveTasks,
    moveTaskToColumn,
    addNewField,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
