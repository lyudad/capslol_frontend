import React, { useContext } from 'react';
import { Form, message, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { AppContext } from 'context';
import { useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { IChatWindow } from 'pages/Chat/interfaces';
import { FontTitle } from 'pages/SendProposal/styles';
import { useCreateOfferMutation } from 'store/apis/offers';
import ValidateInput from 'pages/SendProposal/ValidateInput';
import { SettingsBtn } from '../styles';

const ChatWindow: React.FC<IChatWindow> = ({
    modalIsOpen,
    closeModal,
    price,
    hourRate,
    handleHourRateChange,
    currentChat,
}) => {
    const { t } = useTranslation();
    const { socket } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const [createOffer] = useCreateOfferMutation();

    const [form] = Form.useForm();

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    const handleOffer = async (): Promise<void> => {
        try {
            const newOffer = {
                ownerId: jobOwner?.id as number,
                freelancerId: freelancer?.id as number,
                jobId: job?.id as number,
                status: 'Pending',
                hourRate,
            };
            const dataOffer = await createOffer(newOffer).unwrap();

            const newMessage = {
                content: `<div className=${dataOffer?.status}>
              <h3 className='offer'>${t('Chat.offerTitle')}</h3>
              <p className='title'>${t('Chat.title')}<span>${
                    job?.title
                }<span></p>
              <p className='title'>${t('Chat.dsc')}<span>${
                    job?.description
                }<span></p>
              <p className='title'>${t(
                  'Chat.rate'
              )}<span>${hourRate}<span></p></div>`,
                senderId: user?.id,
                roomId: currentChat?.id,
                isOffer: true,
            };

            socket.emit('msgToServer', newMessage);
            closeModal();
        } catch (error) {
            message.error(error?.message);
        }
    };

    return (
        <ModalWindow
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            bg={colors.bgBlack}
            modalBg={colors.bgBlack}
            borderCol={colors.textWhite}
        >
            <>
                <Row justify="center">
                    <FontTitle color={colors.textWhite} fs="18" mb="0">
                        {t('Chat.enterTitle')}
                    </FontTitle>
                </Row>
                <Form form={form}>
                    <ValidateInput
                        onChange={handleHourRateChange}
                        propsValue={hourRate}
                        propsDefaultValue={price}
                        width="100"
                    />
                </Form>

                <Row justify="center">
                    <SettingsBtn
                        onClick={handleOffer}
                        bg={colors.chatContent}
                        color={colors.labelText}
                    >
                        {t('Chat.offer')}
                    </SettingsBtn>
                </Row>
            </>
        </ModalWindow>
    );
};

export default ChatWindow;
