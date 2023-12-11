import { lazy } from 'react';

// Специльно сделал задержку для отображения лоадера
export const BoardPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(import('./BoardPage')), 1000);
    }),
);
