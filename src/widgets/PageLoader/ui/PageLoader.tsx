import { FC } from 'react';

import { Loader } from '@/shared/ui/Loader/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';

export const PageLoader: FC = () => (
    <div className={classNames(cls.PageLoader, {}, [])}>
        <Loader />
    </div>
);
