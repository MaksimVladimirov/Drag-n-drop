import { useState } from 'react';

export const useHover = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered((prev) => !prev);
    };

    const handleMouseLeave = () => {
        setIsHovered((prev) => !prev);
    };

    return {
        setIsHovered,
        isHovered,
        hoverProps: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
    };
};
