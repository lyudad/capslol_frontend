/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Form, message, Row, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
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
import Button from 'components/Button/Button';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import {
    useChangePasswordMutation,
    useEditUserValueMutation,
    useGetUserByIdQuery,
} from 'store/apis/profile';
import { IPassword } from 'store/apis/profile/profile.types';
import { Paths } from 'router/paths';
import Spinner from 'components/Spinner';
import { IChangePassword, IContactInfo } from './interfaces';
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
    EditIcon,
    StyledInput,
    SaveIcon,
} from './styles';

const ContactInfo: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [updateFirstName, setUpdateFirstName] = useState<boolean>(false);
    const [updateLastName, setUpdateLastName] = useState<boolean>(false);
    const [updateUserFirstName, setUpdateUserFirstName] = useState<string>();
    const [updateUserLastName, setUpdateUserLastName] = useState<string>();

    const state = location.state as IContactInfo;

    const [changePassword, { isError, isSuccess }] =
        useChangePasswordMutation();
    const [editUserValue, { isError: isUserError }] =
        useEditUserValueMutation();
    const { data: user, isLoading } = useGetUserByIdQuery(state.id);

    const handleNavigate = (): void => navigate(Paths.PROFILE);

    const enterLoading = (): void => setLoading(true);

    const onReset = (): void => form.resetFields();

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const handleEditUserFirstName = (): void => setUpdateFirstName(true);

    const handleEditUserLastName = (): void => setUpdateLastName(true);

    const onFinish = async (values: IChangePassword): Promise<void> => {
        enterLoading();
        try {
            if (values.newPassword === values.confirmPassword) {
                const value: IPassword = {
                    id: state?.id,
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

    const handleEdit = async (
        updateKey: string,
        updateValue: string | undefined,
        msg: string
    ): Promise<void> => {
        try {
            await editUserValue({
                id: user?.data?.id,
                [updateKey]: updateValue,
            });

            notification.success({
                message: t(`ContactInfo.${msg}`),
            });
        } catch (error) {
            notification.error({
                message: t(`${error?.data?.message}`),
            });
        }
    };

    const handleUpdate = async (value: string): Promise<void | null> => {
        switch (value) {
            case 'firstName':
                await handleEdit(
                    'firstName',
                    updateUserFirstName,
                    'changedFirstName'
                );
                setUpdateFirstName(false);
                break;
            case 'lastName':
                await handleEdit(
                    'lastName',
                    updateUserLastName,
                    'changedLastName'
                );
                setUpdateLastName(false);
                break;
            default:
                return null;
        }
    };

    return (
        <Wrapper>
            {user && (
                <>
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
                                <StyledAvatar
                                    size={64}
                                    icon={<UserOutlined />}
                                />
                                <div>
                                    <Title fs="28">
                                        {`${
                                            user?.data?.firstName
                                                ? user?.data?.firstName
                                                : 'Not'
                                        }
                                        ${
                                            user?.data?.lastName
                                                ? user?.data?.lastName
                                                : 'Found'
                                        }`}
                                    </Title>
                                    <Circle>
                                        {user?.data?.role
                                            ? user?.data?.role
                                            : 'Not Found'}
                                    </Circle>
                                </div>
                            </TitleGroup>
                            <Card>
                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userFirstName')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {updateFirstName ? (
                                                <StyledInput
                                                    defaultValue={
                                                        user?.data?.firstName
                                                    }
                                                    value={updateUserFirstName}
                                                    onChange={(e) =>
                                                        setUpdateUserFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            ) : (
                                                <span>
                                                    {user?.data?.firstName}
                                                </span>
                                            )}
                                        </Title>
                                        <Row>
                                            {updateFirstName ? (
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleUpdate(
                                                            'firstName'
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EditIcon
                                                    onClick={
                                                        handleEditUserFirstName
                                                    }
                                                />
                                            )}
                                            {user?.data?.firstName ? (
                                                <Icon />
                                            ) : (
                                                <IconNotFound />
                                            )}
                                        </Row>
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userLastName')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {updateLastName ? (
                                                <StyledInput
                                                    defaultValue={
                                                        user?.data?.lastName
                                                    }
                                                    value={updateUserLastName}
                                                    onChange={(e) =>
                                                        setUpdateUserLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            ) : (
                                                <span>
                                                    {user?.data?.lastName}
                                                </span>
                                            )}
                                        </Title>
                                        <Row>
                                            {updateLastName ? (
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleUpdate('lastName')
                                                    }
                                                />
                                            ) : (
                                                <EditIcon
                                                    onClick={
                                                        handleEditUserLastName
                                                    }
                                                />
                                            )}
                                            {user?.data?.lastName ? (
                                                <Icon />
                                            ) : (
                                                <IconNotFound />
                                            )}
                                        </Row>
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>{t('ContactInfo.userEmail')}</Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {user?.data?.email}
                                        </Title>
                                        {user?.data?.email ? (
                                            <Icon />
                                        ) : (
                                            <IconNotFound />
                                        )}
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>{t('ContactInfo.userPhone')}</Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {user?.data?.phoneNumber
                                                ? user?.data?.phoneNumber
                                                : 'You phone number is empty'}
                                        </Title>
                                        {user?.data?.phoneNumber ? (
                                            <Icon />
                                        ) : (
                                            <IconNotFound />
                                        )}
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userPassword')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">********</Title>
                                        <Button
                                            onClick={() => openModal()}
                                            color={colors.btnWhite}
                                            bg={colors.btnDarkBlue}
                                        >
                                            {t('ContactInfo.btnChangeText')}
                                        </Button>
                                    </TitleGroup>
                                </CardInfo>
                            </Card>
                        </div>
                        <>
                            {' '}
                            {isUserError &&
                                message.error(
                                    'Something went wrong, please try again'
                                )}
                        </>
                    </Block>
                </>
            )}

            <> {isLoading && <Spinner />}</>

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
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(
                                                new Error(
                                                    t(
                                                        'ContactInfo.conPasswordTitle.error'
                                                    )
                                                )
                                            );
                                        }

                                        const rightPassword =
                                            getFieldValue('newPassword').match(
                                                validatePassword
                                            );
                                        if (!rightPassword) {
                                            return Promise.reject(
                                                new Error(
                                                    t(
                                                        'ContactInfo.conPasswordTitle.error'
                                                    )
                                                )
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
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
            </ModalWindow>

            <>
                {' '}
                {isSuccess && (
                    <Label>
                        {t('ContactInfo.afterChangePassword.success')}
                    </Label>
                )}
                {isError && (
                    <Label>{t('ContactInfo.afterChangePassword.error')}</Label>
                )}
            </>
        </Wrapper>
    );
};

export default ContactInfo;
