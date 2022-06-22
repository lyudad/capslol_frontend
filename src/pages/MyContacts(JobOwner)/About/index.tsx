import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    CardInfo,
    Label,
    TitleGroup,
    IconNotFound,
    Title,
    Icon,
} from 'pages/ContactInfo/styles';
import { IAboutProps } from '../props';

const AboutCard: React.FC<IAboutProps> = ({ member, label }) => {
    const { t } = useTranslation();

    return (
        <CardInfo>
            <Label>{t(`ContactInfo.${label}`)}</Label>
            <TitleGroup justify="space-between">
                <Title fs="16">
                    {member || `Your "${t(`ContactInfo.${label}`)}" not found`}
                </Title>
                {member ? <Icon /> : <IconNotFound />}
            </TitleGroup>
        </CardInfo>
    );
};

export default AboutCard;
