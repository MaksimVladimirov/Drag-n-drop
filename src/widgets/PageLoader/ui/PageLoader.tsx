import { FC } from 'react';

import cls from './PageLoader.module.scss';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { classNames } from '../../../shared/lib/classNames/classNames';

export const PageLoader: FC = () => (
    <div className={classNames(cls.PageLoader, {}, [])}>
        <Loader />
    </div>
);
