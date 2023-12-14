import { TaskPrioritiesType } from '@/types/TaskPrioritiesType';
import LowPriority from '@/assets/icons/taskPriorities/low.svg';
import MediumPriority from '@/assets/icons//taskPriorities/medium.svg';
import HighPriority from '@/assets/icons/taskPriorities/high.svg';

export const TaskPrioritiesSvgs: Record<TaskPrioritiesType, string> = {
    низкая: LowPriority,
    средняя: MediumPriority,
    высокая: HighPriority,
};
