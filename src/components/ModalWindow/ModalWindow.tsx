import React from 'react';
import Modal from 'react-modal';
import { Button, Parent } from './style';
import { ICustomStyles, IProps } from './types';

const ModalWindow: React.FC<IProps> = ({
    children,
    modalIsOpen,
    closeModal,
    bg,
    modalBg,
}) => {
    const customStyles: ICustomStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: modalBg,
        },
        content: {
            position: 'absolute',
            padding: '20px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: bg,
            borderRadius: '5px',
            width: '340px',
        },
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
            className="Modal"
            appElement={document.getElementById('root') as HTMLElement}
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
