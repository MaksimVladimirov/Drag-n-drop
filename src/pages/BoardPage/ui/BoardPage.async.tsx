import { lazy } from 'react';

export const BoardPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(import('./BoardPage')), 500);
    }),
);
