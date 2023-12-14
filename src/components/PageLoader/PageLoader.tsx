import { FC } from 'react';
import { Spin } from 'antd';
import { classNames } from '@/lib';

import cls from './PageLoader.module.scss';

export const PageLoader: FC = () => (
    <div className={classNames(cls.PageLoader)}>
        <Spin size="large" />
    </div>
);
