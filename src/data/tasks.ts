import { ITask } from '@/types/Task';

export const tasks: ITask[] = [
    {
        taskId: 1,
        taskStatus: 'Сделать',
        taskDescription: 'Покрасить кнопку',
        userName: 'Samantha Davis',
        deadline: '2023-12-15',
        taskPriority: 'высокая',
        comment: 'уточнить у дизайнера по цветам',
    },
    {
        taskId: 2,
        taskStatus: 'Сделать',
        taskDescription: 'Редизайн в соответсвии с Figma',
        userName: 'Samantha Davis',
        deadline: '2023-12-20',
        taskPriority: 'средняя',
        comment: 'уточнить у дизайнера',

    },
    {
        taskId: 3,
        taskStatus: 'В работе',
        taskDescription: 'Типизация данных',
        userName: 'John Smith',
        deadline: '2023-12-19',
        taskPriority: 'средняя',
        comment: 'обратиться к документации',

    },
    {
        taskId: 4,
        taskStatus: 'На ревью',
        taskDescription: 'Изменить шрифты',
        userName: 'John Smith',
        deadline: '2023-12-14',
        taskPriority: 'низкая',
        comment: 'скачать шрифты',

    },
    {
        taskId: 5,
        taskStatus: 'Сделано',
        taskDescription: 'Вынести в глобальные переменные',
        userName: 'Samantha Davis',
        deadline: '2023-12-18',
        taskPriority: 'высокая',
        comment: 'почитать про CSS',

    },
    {
        taskId: 6,
        taskStatus: 'На ревью',
        taskDescription: 'Настроить линтер',
        userName: 'Robert Pattinson',
        deadline: '2023-12-16',
        taskPriority: 'низкая',
        comment: 'обратиться к документации',

    },
    {
        taskId: 7,
        taskStatus: 'Сделано',
        taskDescription: 'Настроить prettier',
        userName: 'John Smith',
        deadline: '2023-12-15',
        taskPriority: 'высокая',
        comment: 'обратиться к документации',

    },
    {
        taskId: 8,
        taskStatus: 'Сделать',
        taskDescription: 'Получение данных с бэка',
        userName: 'Robert Pattinson',
        deadline: '2023-12-15',
        taskPriority: 'средняя',
        comment: 'связаться к тимлидом',

    },
    {
        taskId: 9,
        taskStatus: 'Сделать',
        taskDescription: 'Исправить местоположение пользователя',
        userName: 'Bruce Wayne',
        deadline: '2023-12-15',
        taskPriority: 'высокая',
        comment: 'обратиться к картографу',

    },
    {
        taskId: 10,
        taskStatus: 'На ревью',
        taskDescription: 'Сдвинуть кнопку на 10px',
        userName: 'Robert Pattinson',
        deadline: '2023-12-15',
        taskPriority: 'низкая',
        comment: 'взять линейку',

    },
    {
        taskId: 11,
        taskStatus: 'На ревью',
        taskDescription: 'Покрасить кнопку',
        userName: 'John Smith',
        deadline: '2023-12-19',
        taskPriority: 'высокая',
        comment: 'связаться с дизайнером',

    },
    {
        taskId: 12,
        taskStatus: 'В работе',
        taskDescription: 'Рефакторинг страницы',
        userName: 'John Smith',
        deadline: '2023-12-17',
        taskPriority: 'низкая',
        comment: 'уточнить у дизайнера по цветам',

    },
    {
        taskId: 13,
        taskStatus: 'В работе',
        taskDescription: 'Исправления после тестирования',
        userName: 'Bruce Wayne',
        deadline: '2023-12-18',
        taskPriority: 'средняя',
        comment: 'связаться с тестировщиком',

    },
];
