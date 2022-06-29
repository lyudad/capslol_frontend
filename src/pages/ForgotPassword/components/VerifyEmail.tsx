import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormLink, Section, Title, Wrapper } from '../styles';
import { IProps } from './props';

const NotFoundEmail: React.FC<IProps> = ({ data, isError, email }) => {
    const { t } = useTranslation();

    return (
        <Section>
            <Wrapper width="450">
                {data && (
                    <>
                        <Title>{t('VerifyEmail.fineTitle')}</Title>
                        <FormLink>
                            <NavLink to="/">
                                {t('VerifyEmail.linkToLogin')}
                            </NavLink>
                        </FormLink>
                    </>
                )}
                {isError && (
                    <Title>
                        {t('VerifyEmail.poorTitle.start')} <span>{email}</span>{' '}
                        {t('VerifyEmail.poorTitle.end')}{' '}
                    </Title>
                )}
            </Wrapper>
        </Section>
    );
};

export default NotFoundEmail;
