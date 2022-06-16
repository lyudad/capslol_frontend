import React from 'react';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { colors } from 'constants/index';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { IChatWindow } from 'pages/Chat/interfaces';
import { FontTitle } from 'pages/SendProposal/styles';
import { HourlyRateInput, SettingsBtn } from '../styles';

const ChatWindow: React.FC<IChatWindow> = ({
    modalIsOpen,
    closeModal,
    price,
    hourRate,
    handleHourRateChange,
    handleOffer,
}) => {
    const { t } = useTranslation();

    return (
        <ModalWindow
            modalIsOpen={modalIsOpen}
            closeModal={() => closeModal()}
            bg={colors.btnWhite}
            modalBg={colors.bgBlack}
        >
            <>
                <Row justify="center">
                    <FontTitle color={colors.black} fs="18" mb="0">
                        {t('Chat.enterTitle')}
                    </FontTitle>
                </Row>
                <HourlyRateInput
                    defaultValue={price}
                    value={hourRate}
                    placeholder={`${t('Chat.offerSentPlaceholder')}`}
                    onChange={(event) => handleHourRateChange(event)}
                />

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
