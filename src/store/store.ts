import { configureStore } from '@reduxjs/toolkit';
import kanbanBoardSlice from './slices/kanbanBoardSlice';

export const store = configureStore({
    reducer: {
        kanbanBoardSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
