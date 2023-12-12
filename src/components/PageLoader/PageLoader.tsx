import { FC } from 'react';
import { classNames } from '@/lib';
import { Loader } from '@/components';

import cls from './PageLoader.module.scss';

export const PageLoader: FC = () => (
    <div className={classNames(cls.PageLoader)}>
        <Loader />
    </div>
);
