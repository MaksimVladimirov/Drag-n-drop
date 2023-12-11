import { RouteProps } from 'react-router-dom';
import { BoardPage } from '@/pages';
import { AppRoutes } from '@/types/AppRouteEnum';

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',

};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <BoardPage />,
    },
};
