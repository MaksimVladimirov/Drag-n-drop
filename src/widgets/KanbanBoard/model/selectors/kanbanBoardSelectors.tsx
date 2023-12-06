import { RootState } from '@/app/store/store';

export const getInitialTasks = (state: RootState) => state.kanbanSlice.tasks;
export const getActiveTask = (state: RootState) => state.kanbanSlice.activeTask;
export const getUserStatuses = (state: RootState) => state.kanbanSlice.statusColumns;
export const getUserNames = (state: RootState) => state.kanbanSlice.nameColumns;
