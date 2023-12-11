import { Link } from 'react-router-dom';
import { FC } from 'react';

import { IAppLinkProps } from './AppLinkProps';
import { classNames } from '@/lib';
import cls from './AppLink.module.scss';

export const AppLink: FC<IAppLinkProps> = (props) => {
    const {
        to,
        className,
        children,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink)}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
