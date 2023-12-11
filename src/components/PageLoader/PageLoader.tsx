import { FC } from 'react';

import cls from './PageLoader.module.scss';
import { classNames } from '@/lib/classNames';
import { Loader } from '@/components/Loader/Loader';

export const PageLoader: FC = () => (
    <div className={classNames(cls.PageLoader)}>
        <Loader />
    </div>
);
