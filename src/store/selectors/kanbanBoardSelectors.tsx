import { RootState } from '@/store/store';

export const getInitialTasks = (state: RootState) => state.kanbanBoardSlice.tasks;
export const getActiveTask = (state: RootState) => state.kanbanBoardSlice.activeTask;
export const getUserStatuses = (state: RootState) => state.kanbanBoardSlice.statusColumns;
export const getUserNames = (state: RootState) => state.kanbanBoardSlice.nameColumns;
