import { FC } from 'react';
import cls from './Sidebar.module.scss';
import { AppLink } from '../AppLink/AppLink';

export const Sidebar: FC = () => (
    <div className={cls.Sidebar}>
        <AppLink to="/">
            Доска
        </AppLink>
    </div>
);
