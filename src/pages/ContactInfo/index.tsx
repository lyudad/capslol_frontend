/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import Button from 'common/Button/Button';
import ModalWindow from 'common/ModalWindow/ModalWindow';
import {
    useChangePasswordMutation,
    useEditUserValueMutation,
    useGetUserByIdQuery,
} from 'store/apis/profile';
import { IPassword } from 'store/apis/profile/profile.types';
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
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [updateFirstName, setUpdateFirstName] = useState<boolean>(false);
    const [updateLastName, setUpdateLastName] = useState<boolean>(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const state = location.state as IContactInfo;

    const [changePassword, { isError, isSuccess }] =
        useChangePasswordMutation();
    const [editUserValue, { isError: isUserError }] =
        useEditUserValueMutation();
    const { data: singleUser } = useGetUserByIdQuery(state.id);
    const { data: user } = singleUser;

    const [updateUserFirstName, setUpdateUserFirstName] = useState<
        string | undefined
    >(user?.firstName);
    const [updateUserLastName, setUpdateUserLastName] = useState<
        string | undefined
    >(user?.lastName);

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

    const handleEditUserFirstName = (): void => setUpdateFirstName(true);

    const handleEditUserLastName = (): void => setUpdateLastName(true);

    const handleUpdate = async (value: string) => {
        switch (value) {
            case 'firstName':
                await editUserValue({
                    id: user?.id,
                    firstName: updateUserFirstName,
                });
                notification.success({
                    message: t('ContactInfo.changedFirstName'),
                });
                setUpdateFirstName(false);
                break;
            case 'lastName':
                await editUserValue({
                    id: user?.id,
                    lastName: updateUserLastName,
                });
                notification.success({
                    message: t('ContactInfo.changedLastName'),
                });
                setUpdateLastName(false);
                break;
            default:
                return null;
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
                                <Title fs="16">
                                    {updateFirstName ? (
                                        <StyledInput
                                            value={updateUserFirstName}
                                            onChange={(e) =>
                                                setUpdateUserFirstName(
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                        />
                                    ) : (
                                        <span>{user?.firstName}</span>
                                    )}
                                </Title>
                                <Row>
                                    {updateFirstName ? (
                                        <SaveIcon
                                            onClick={() =>
                                                handleUpdate('firstName')
                                            }
                                        />
                                    ) : (
                                        <EditIcon
                                            onClick={handleEditUserFirstName}
                                        />
                                    )}
                                    {user?.firstName ? (
                                        <Icon />
                                    ) : (
                                        <IconNotFound />
                                    )}
                                </Row>
                            </TitleGroup>
                        </CardInfo>

                        <CardInfo>
                            <Label>{t('ContactInfo.userLastName')}</Label>
                            <TitleGroup justify="space-between">
                                <Title fs="16">
                                    {updateLastName ? (
                                        <StyledInput
                                            value={updateUserLastName}
                                            onChange={(e) =>
                                                setUpdateUserLastName(
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                        />
                                    ) : (
                                        <span>{user?.lastName}</span>
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
                                            onClick={handleEditUserLastName}
                                        />
                                    )}
                                    {user?.lastName ? (
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
                        message.error('Something went wrong, please try again')}
                </>
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
                {isSuccess &&
                    notification.success({
                        message: t('ContactInfo.afterChangePassword.success'),
                    })}
                {isError &&
                    notification.error({
                        message: t('ContactInfo.afterChangePassword.error'),
                    })}
            </>
        </Wrapper>
    );
};

export default ContactInfo;
