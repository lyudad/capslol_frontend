import { ReactFragment, ReactNode, ReactPortal } from 'react';

export interface IProps {
    mr?: string;
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
    onClick: () => void;
    color: string;
    bg: string;
    disabled?: boolean;
}
