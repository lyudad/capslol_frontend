export interface IProps {
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
