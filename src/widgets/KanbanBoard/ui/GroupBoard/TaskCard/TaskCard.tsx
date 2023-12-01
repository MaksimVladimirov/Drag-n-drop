import { useSortable } from '@dnd-kit/sortable';
import { type Task } from '@/widgets/types';
import cls from './TaskCard.module.scss';

interface Props {
    task: Task
}

function TaskCard({ task }: Props) {
    const {
        setNodeRef, attributes, listeners, isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                className={cls.task_container__dragging}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cls.task_container}
        >
            <div>
                Исполнитель:
                {' '}
                {' '}
                {task.executor}
            </div>
            <div>
                Задание:
                {' '}
                {task.content}
            </div>
            <div>
                Статус:
                {' '}
                {' '}
                {' '}
                {task.taskStatus}
            </div>
        </div>
    );
}

export default TaskCard;
