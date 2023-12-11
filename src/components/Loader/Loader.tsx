import { FC } from 'react';
import './Loader.scss';
import { classNames } from '@/lib';

export const Loader: FC = () => (
    <div className={classNames('lds-ellipsis', {}, [])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
