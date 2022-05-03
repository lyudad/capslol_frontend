import React from "react";
import Modal from "react-modal";
import { Button } from "./style";
import { IProps } from "./types";

const ModalWindow: React.FC<IProps> = ({
  children,
  modalIsOpen,
  closeModal,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Button onClick={closeModal}>x</Button>
      {children}
    </Modal>
  );
};

export default ModalWindow;
