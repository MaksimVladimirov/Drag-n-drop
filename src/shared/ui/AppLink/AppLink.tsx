import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface AppLinkProps extends LinkProps {
    className?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
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
