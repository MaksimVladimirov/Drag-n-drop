import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { taskStatuses } from '@/data/taskStatuses';
import { tasks } from '@/data/tasks';

const kanbanBoardSlice = createSlice({
    name: 'kanbanBoard',
    initialState: {
        statusColumns: taskStatuses,
        nameColumns: [...new Set(tasks.map((task) => task.userName))],
        tasks,
        activeTask: null,
    },
    reducers: {
        // Передвижение карточек задач
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        moveTasks: (state, action) => {
            const { activeId, overId, boardType } = action.payload;
            const activeIndex = state.tasks.findIndex((task) => task.taskId === activeId);
            const overIndex = state.tasks.findIndex((task) => task.taskId === overId);

            if (boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES) {
                if (state.tasks[activeIndex].taskStatus !== state.tasks[overIndex].taskStatus) {
                    state.tasks[activeIndex].taskStatus = state.tasks[overIndex].taskStatus;
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
                } else {
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
                }
            } else if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
                if (state.tasks[activeIndex].userName !== state.tasks[overIndex].userName) {
                    state.tasks[activeIndex].userName = state.tasks[overIndex].userName;
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex - 1);
                } else {
                    state.tasks = arrayMove(state.tasks, activeIndex, overIndex);
                }
            }
        },

        moveTaskToColumn: (state, action) => {
            const { activeId, overId, boardType } = action.payload;
            const activeIndex = state.tasks.findIndex((task) => task.taskId === activeId);
            if (boardType === BoardTypeEnum.SWITCH_BETWEEN_STATUSES) {
                state.tasks[activeIndex].taskStatus = overId;
            } else if (boardType === BoardTypeEnum.SWITCH_BETWEEN_USERS) {
                state.tasks[activeIndex].userName = overId;
            }
            state.tasks = arrayMove(state.tasks, activeIndex, activeIndex);
        },

    },
});

export const {
    setActiveTask,
    setTasks,
    moveTasks,
    moveTaskToColumn,
} = kanbanBoardSlice.actions;

export default kanbanBoardSlice.reducer;
