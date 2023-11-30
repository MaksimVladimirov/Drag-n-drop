import { FC } from 'react';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './Sidebar.module.scss';

export const Sidebar: FC = () => (
    <div className={cls.Sidebar}>
        {/* <AppLink to="/backlog">
                Бэклог
            </AppLink> */}
        <AppLink to="/">
            Доска
        </AppLink>
        {/* <AppLink to="/reports">
                Замечания
            </AppLink>
            <AppLink to="/releases">
                Релизы
            </AppLink>
            <AppLink to="/components">
                Компоненты
            </AppLink>
            <AppLink to="/issues">
                Задачи
            </AppLink>
            <AppLink to="/repository">
                Репозитории
            </AppLink>
            <AppLink to="/add_item">
                Добавить
            </AppLink>
            <AppLink to="/setting">
                Настройки
            </AppLink> */}
    </div>
);
