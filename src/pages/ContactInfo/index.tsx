import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';

import {
    FormButton,
    FormItem,
    PwrButton,
    StyledForm,
} from 'pages/ForgotPassword/styles';
import { FormPassword } from 'pages/ResetPassword/style';
import { colors } from 'constants/index';
import { validatePassword } from 'constants/validate';
import Button from 'common/Button/Button';
import ModalWindow from 'common/ModalWindow/ModalWindow';
import { useChangePasswordMutation } from 'store/apis/profile';
import { IPassword } from 'store/apis/profile/profile.types';
import { useAppSelector } from 'hooks/redux';
import { IChangePassword } from './interfaces';
import {
    Wrapper,
    TitleGroup,
    Title,
    Block,
    Card,
    Label,
    StyledAvatar,
    CardInfo,
    Icon,
    Circle,
    IconNotFound,
} from './styles';

const ContactInfo: React.FC = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();

    const [changePassword, { isError, isSuccess }] =
        useChangePasswordMutation();
    const { user } = useAppSelector((s) => s.authReducer);

    const handleNavigate = (): void => navigate('/profile');

    const enterLoading = (): void => setLoading(true);

    const onReset = (): void => form.resetFields();

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const onFinish = async (values: IChangePassword): Promise<void> => {
        enterLoading();
        try {
            if (values.newPassword === values.confirmPassword) {
                const value: IPassword = {
                    id: Number(id),
                    password: values.confirmPassword,
                };
                await changePassword(value).unwrap();
            } else {
                message.error('Password do not match, please try again');
                onReset();
                setLoading(false);
            }
        } catch (error) {
            message.error(error.data.message);
        }
    };

    return (
        <Wrapper>
            <TitleGroup mb="50">
                <Button
                    onClick={handleNavigate}
                    mr="20"
                    color={colors.btnWhite}
                    bg={colors.btnDarkBlue}
                >
                    <LeftOutlined />
                </Button>
                <Title fs="35">{t('ContactInfo.title')}</Title>
            </TitleGroup>

            <Block>
                <div>
                    <TitleGroup mb="35">
                        <StyledAvatar size={64} icon={<UserOutlined />} />
                        <div>
                            <Title fs="28">
                                {`${user?.firstName ? user?.firstName : 'Not'}
                                ${user?.lastName ? user?.lastName : 'Found'}`}
                            </Title>
                            <Circle>
                                {user?.role ? user?.role : 'Not Found'}
                            </Circle>
                        </div>
                    </TitleGroup>
                    <Card>
                        <CardInfo>
                            <Label>{t('ContactInfo.userFirstName')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">{user?.firstName}</Title>
                                {user?.firstName ? <Icon /> : <IconNotFound />}
                            </TitleGroup>
                        </CardInfo>

                        <CardInfo>
                            <Label>{t('ContactInfo.userLastName')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">{user?.lastName}</Title>
                                {user?.lastName ? <Icon /> : <IconNotFound />}
                            </TitleGroup>
                        </CardInfo>

                        <CardInfo>
                            <Label>{t('ContactInfo.userEmail')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">{user?.email}</Title>
                                {user?.email ? <Icon /> : <IconNotFound />}
                            </TitleGroup>
                        </CardInfo>

                        <CardInfo>
                            <Label>{t('ContactInfo.userPhone')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">
                                    {user?.phoneNumber
                                        ? user?.phoneNumber
                                        : 'You phone number is empty'}
                                </Title>
                                {user?.phoneNumber ? (
                                    <Icon />
                                ) : (
                                    <IconNotFound />
                                )}
                            </TitleGroup>
                        </CardInfo>

                        <CardInfo>
                            <Label>{t('ContactInfo.userPassword')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">********</Title>
                                <Button
                                    onClick={() => openModal()}
                                    color={colors.btnWhite}
                                    bg={colors.btnDarkBlue}
                                    disabled={isSuccess || isError}
                                >
                                    {t('ContactInfo.btnChangeText')}
                                </Button>
                            </TitleGroup>
                        </CardInfo>
                    </Card>
                </div>
            </Block>

            <ModalWindow
                modalIsOpen={modalIsOpen}
                closeModal={() => closeModal()}
                bg={colors.passwordBg}
                modalBg={colors.passwordModalBg}
            >
                {isSuccess || isError || (
                    <StyledForm
                        name="normal_login"
                        className="form"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={(values) =>
                            onFinish(values as IChangePassword)
                        }
                    >
                        <FormItem
                            label={t('ContactInfo.passwordTitle.item')}
                            name="newPassword"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: `${t(
                                        'ContactInfo.passwordTitle.error'
                                    )}`,
                                },
                            ]}
                        >
                            <FormPassword
                                placeholder={t(
                                    'ContactInfo.passwordTitle.placeholder'
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('ContactInfo.conPasswordTitle.item')}
                            name="confirmPassword"
                            hasFeedback
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: `${t(
                                        'ContactInfo.conPasswordTitle.error'
                                    )}`,
                                    validator: (_, value) => {
                                        if (validatePassword.test(value)) {
                                            Promise.resolve();
                                            return;
                                        }
                                        Promise.reject(
                                            new Error(
                                                t(
                                                    'ContactInfo.passwordTitle.error'
                                                )
                                            )
                                        );
                                    },
                                },
                            ]}
                        >
                            <FormPassword
                                placeholder={t(
                                    'ContactInfo.conPasswordTitle.placeholder'
                                )}
                            />
                        </FormItem>

                        <FormButton>
                            <PwrButton
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                            >
                                {t('ContactInfo.btnText')}
                            </PwrButton>
                        </FormButton>
                    </StyledForm>
                )}

                {isSuccess && (
                    <Label>
                        {t('ContactInfo.afterChangePassword.success')}
                    </Label>
                )}
                {isError && (
                    <Label>{t('ContactInfo.afterChangePassword.error')}</Label>
                )}
            </ModalWindow>
        </Wrapper>
    );
};

export default ContactInfo;
