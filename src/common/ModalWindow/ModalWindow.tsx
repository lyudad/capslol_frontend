import React from "react";
import Modal from "react-modal";
import { Button, Parent } from "./style";
import { IProps } from "./types";
import { colors } from "constants/index";

const ModalWindow: React.FC<IProps> = ({
  children,
  modalIsOpen,
  closeModal,
}) => {
  const customStyles: any = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.modalWindowBg,
    },
    content: {
      position: "absolute",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: colors.modalBg,
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <Parent>
        <Button onClick={closeModal}>x</Button>
      </Parent>

      {children}
    </Modal>
  );
};

export default ModalWindow;
