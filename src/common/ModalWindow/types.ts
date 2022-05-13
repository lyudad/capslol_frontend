/* eslint-disable @typescript-eslint/ban-types */
export interface IProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    modalIsOpen: boolean;
    closeModal: () => void;
    bg: string;
    modalBg: string;
}
export interface ICustomStyles {
    overlay: {};
    content: {};
}
