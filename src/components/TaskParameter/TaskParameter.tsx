import { FC } from 'react';
import { classNames } from '@/lib';
import { ITaskParameterProps } from './TaskParameterProps';

import cls from './TaskParameter.module.scss';

export const TaskParameter: FC<ITaskParameterProps> = (props) => {
    const { parameter } = props;
    return (
        <div className={classNames(cls.TaskParameter)}>
            {parameter}
        </div>
    );
};
