import { ReactFragment, ReactNode, ReactPortal } from 'react';

export interface IProps {
    mr?: string;
    mt?: string;
    position?: string;
    color: string;
    bg: string;
}

export type TReactNode =
    | ReactNode
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;

export interface IButtonProps {
    children: TReactNode;
    mr?: string;
    mt?: string;
    position?: string;
    onClick: () => void;
    color: string;
    bg: string;
    disabled?: boolean;
}
