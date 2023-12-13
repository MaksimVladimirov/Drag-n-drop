import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { taskStatuses } from '@/data/taskStatuses';
import { tasks } from '@/data/tasks';

const kanbanBoardSlice = createSlice({
    name: 'kanban',
    initialState: {
        statusColumns: taskStatuses,
        nameColumns: [...new Set(tasks.map((task) => task.userName))],
        tasks,
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

        addNewField: (state, action:PayloadAction<{parameterText:string, id: number}>) => {
            const { parameterText, id } = action.payload;
            if (parameterText === '') return;
            const activeIndex = state.tasks.findIndex((task) => task.taskId === id);
            state.tasks[activeIndex].parameters.push(
                { paramId: state.tasks[activeIndex].parameters.length + 1, paramText: parameterText },
            );
        },

        addTaskPriority: (state, action:PayloadAction<{selectedTaskPriority:string, id: number}>) => {
            const { selectedTaskPriority, id } = action.payload;
            const activeIndex = state.tasks.findIndex((task) => task.taskId === id);
            state.tasks[activeIndex].taskPriority = selectedTaskPriority;
        },

        addTaskComment: (state, action:PayloadAction<{comment:string, id: number}>) => {
            const { comment, id } = action.payload;
            const activeIndex = state.tasks.findIndex((task) => task.taskId === id);
            state.tasks[activeIndex].comment = comment;
        },

    },
});

export const {
    setActiveTask,
    setTasks,
    moveTasks,
    moveTaskToColumn,
    addNewField,
    addTaskPriority,
    addTaskComment,
} = kanbanBoardSlice.actions;

export default kanbanBoardSlice.reducer;
