import { FC } from 'react';
import { classNames } from '@/lib';

import './Loader.scss';

export const Loader: FC = () => (
    <div className={classNames('lds-ellipsis', {}, [])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
