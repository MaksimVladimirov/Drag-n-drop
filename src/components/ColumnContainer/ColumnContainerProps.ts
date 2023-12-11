import { BoardTypeEnum } from '@/types/BoardTypeEnum';
import { ITask } from '@/types/Task';

export interface IColumnContainerProps {
    columnName: string;
    tasks: ITask[];
    switchType: BoardTypeEnum;
}
