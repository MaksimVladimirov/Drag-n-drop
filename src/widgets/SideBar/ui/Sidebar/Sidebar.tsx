import { FC } from 'react';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './Sidebar.module.scss';

export const Sidebar: FC = () => (
    <div className={cls.Sidebar}>
        <AppLink to="/">
            Доска
        </AppLink>
    </div>
);
