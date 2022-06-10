import React from 'react';
import { IButtonProps } from './props';
import { Wrapper } from './styles';

const Button: React.FC<IButtonProps> = ({
    children,
    mr,
    onClick,
    color,
    bg,
    disabled,
}) => {
    return (
        <Wrapper
            onClick={onClick}
            mr={mr}
            color={color}
            bg={bg}
            disabled={disabled}
        >
            {children}
        </Wrapper>
    );
};

export default Button;
