import { ChangeEvent, useState } from 'react';
import { GroupKanbanBoard } from '@/widgets/KanbanBoard/ui/GroupBoard';
import { FlatKanbanBoard } from '@/widgets/KanbanBoard/ui/FlatBoard';

export enum BoardType {
    FLAT = 'flat',
    GROUP = 'group'
}

const BoardPage = () => {
    const [board, setBoard] = useState<BoardType>(BoardType.FLAT);

    const handleChangeBoardType = (e: ChangeEvent<HTMLSelectElement>) => {
        setBoard(e.target.value as BoardType);
    };
    return (
        <div>
            <h1> Доска</h1>
            <select name="pets" id="pet-select" onChange={handleChangeBoardType}>
                <option value={BoardType.FLAT}>Плоская доска</option>
                <option value={BoardType.GROUP}>Между пользователями</option>
            </select>
            {board === 'flat' ? <FlatKanbanBoard boardType={board} /> : <GroupKanbanBoard />}

        </div>
    );
};

export default BoardPage;
