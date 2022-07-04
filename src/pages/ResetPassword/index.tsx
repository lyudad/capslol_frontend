import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, message } from 'antd';
import { useTranslation } from 'react-i18next';

import { StyledNavLink, Wrapper } from 'pages/ForgotPassword/styles';
import { colors } from 'constants/index';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { Password } from 'store/slices/auth/auth.type';
import { useResetPasswordMutation } from 'store/apis/auth';
import ChangePassword from 'components/ChangePassword';
import { IChangePassword } from 'components/ChangePassword/props';
import { TypographyTitle, WindowTitle, Section } from './style';

const ResetPassword: React.FC = () => {
    const { t } = useTranslation();
    const [params] = useSearchParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [resetPassword, { data, error: dataError, isError }] =
        useResetPasswordMutation();

    const onReset = (): void => form.resetFields();

    const enterLoading = (): void => setLoading(true);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => {
        setIsOpen(false);
        navigate('/');
    };

    const onFinish = async (values: IChangePassword): Promise<void> => {
        enterLoading();
        try {
            const value: Password = {
                token: params.get('token')?.toString(),
                password: values.confirmPassword,
            };
            await resetPassword(value);
            onReset();
            openModal();
        } catch (e) {
            message.error(e.data.message);
        }
    };

    return (
        <Section>
            <Wrapper width="340">
                <TypographyTitle color={colors.textWhite} level={3}>
                    {t('ResetPage.title')}
                </TypographyTitle>
                <ChangePassword onFinish={onFinish} loading={loading} />
            </Wrapper>

            <ModalWindow
                modalIsOpen={modalIsOpen}
                closeModal={() => closeModal()}
                bg={colors.modalBg}
                modalBg={colors.modalWindowBg}
            >
                <>
                    {data ? (
                        <WindowTitle level={3}>
                            {t('ResetPage.loginText')}{' '}
                            <StyledNavLink to="/">Login</StyledNavLink>
                        </WindowTitle>
                    ) : (
                        dataError
                    )}

                    {isError && (
                        <WindowTitle level={3}>
                            {t('ResetPage.passwordError')}
                        </WindowTitle>
                    )}

                    <StyledNavLink to="/" className="form_link">
                        {t('ResetPage.linkText')}
                    </StyledNavLink>
                </>
            </ModalWindow>
        </Section>
    );
};

export default ResetPassword;
