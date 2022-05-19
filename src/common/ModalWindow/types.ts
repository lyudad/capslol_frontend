import { TReactNode } from 'common/Button/props';
import { CSSProperties } from 'react';

export interface IProps {
    children: TReactNode;
    modalIsOpen: boolean;
    closeModal: () => void;
    bg: string;
    modalBg: string;
}
export interface ICustomStyles {
    overlay: CSSProperties | undefined;
    content: CSSProperties | undefined;
}
