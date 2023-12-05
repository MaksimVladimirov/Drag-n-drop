import { configureStore } from '@reduxjs/toolkit';
import kanbanSlice from './KanbanStore';

export const store = configureStore({
    reducer: {
        kanbanSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
