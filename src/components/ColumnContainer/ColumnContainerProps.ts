import { Task } from '@/store/slices/kanbanBoardSlice';
import { BoardTypeEnum } from '@/types/BoardTypeEnum';

export interface IColumnContainerProps {
    columnName: string;
    tasks: Task[];
    switchType: BoardTypeEnum;
}
