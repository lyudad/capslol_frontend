import { IContactInfo } from '../interfaces';

export interface IProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    state: IContactInfo;
}
