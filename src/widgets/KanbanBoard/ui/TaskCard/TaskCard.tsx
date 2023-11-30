import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Task } from '@/widgets/types';
import cls from './TaskCard.module.scss';

interface Props {
    task: Task
}

function TaskCard({ task }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={cls.task_container__dragging}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cls.task_container}
        >
            <p>
                Исполнитель:
                {' '}
                {' '}
            </p>
            <p>
                Задание:
                {' '}
                {task.content}
            </p>
            <p>
                Статус:
                {' '}
                {' '}
                {' '}
                {task.taskStatus}
            </p>
        </div>
    );
}

export default TaskCard;
