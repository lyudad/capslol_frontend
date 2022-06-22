import React from 'react';
import { useTranslation } from 'react-i18next';

import { colors } from 'constants/index';
import Button from 'components/Button/Button';
import { CardInfo, Label, TitleGroup, Title } from '../styles';
import { IBtnProps } from '../interfaces';

const ChangePasswordBtn: React.FC<IBtnProps> = ({ openModal }) => {
    const { t } = useTranslation();

    return (
        <CardInfo>
            <Label>{t('ContactInfo.userPassword')}</Label>
            <TitleGroup justify="space-between">
                <Title fs="16">********</Title>
                <Button
                    onClick={openModal}
                    color={colors.btnWhite}
                    bg={colors.btnDarkBlue}
                >
                    {t('ContactInfo.btnChangeText')}
                </Button>
            </TitleGroup>
        </CardInfo>
    );
};

export default ChangePasswordBtn;
