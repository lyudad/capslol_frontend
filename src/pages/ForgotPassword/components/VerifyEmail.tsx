import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLink, Section, StyledNavLink, Title, Wrapper } from '../styles';
import { IProps } from './props';

const NotFoundEmail: React.FC<IProps> = ({ data, isError, email }) => {
    const { t } = useTranslation();

    return (
        <Section>
            <Wrapper width="450">
                {data && (
                    <>
                        <Title>
                            {t('VerifyEmail.fineTitle')}{' '}
                            <StyledNavLink to="/">Login</StyledNavLink> page.
                        </Title>
                        <FormLink>
                            <StyledNavLink to="/">
                                {t('VerifyEmail.linkToLogin')}
                            </StyledNavLink>
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
