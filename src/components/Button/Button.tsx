import React from 'react';
import { IButtonProps } from './props';
import { Wrapper } from './styles';

const Button: React.FC<IButtonProps> = ({
    children,
    mr,
    mt,
    onClick,
    color,
    bg,
    position,
    disabled,
}) => {
    return (
        <Wrapper
            onClick={onClick}
            mr={mr}
            mt={mt}
            position={position}
            color={color}
            bg={bg}
            disabled={disabled}
        >
            {children}
        </Wrapper>
    );
};

export default Button;
