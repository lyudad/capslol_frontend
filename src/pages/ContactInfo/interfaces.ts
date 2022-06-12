import { UserType } from 'store/slices/auth/auth.type';

export interface IProps {
    mb?: string;
    padding?: string;
    justify?: string;
    fs?: string;
}

export interface IChangePassword {
    newPassword: string;
    confirmPassword: string;
}

export interface IContactInfo {
    id: number;
}

export interface IBtnProps {
    openModal: () => void;
}

export interface IModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    state: number | undefined;
}

export interface ITitleProps {
    user: UserType;
}
