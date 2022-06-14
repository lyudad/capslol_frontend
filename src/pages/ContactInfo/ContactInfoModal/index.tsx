import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, message } from 'antd';

import ModalWindow from 'components/ModalWindow/ModalWindow';
import { colors } from 'constants/index';
import { validatePassword } from 'constants/validate';
import { IPassword } from 'store/apis/profile/profile.types';
import { useChangePasswordMutation } from 'store/apis/profile';

import {
    FormButton,
    FormItem,
    PwrButton,
    StyledForm,
} from 'pages/ForgotPassword/styles';
import { FormPassword } from 'pages/ResetPassword/style';
import { IChangePassword, IModalProps } from '../interfaces';
import { Label } from '../styles';

const ContactInfoModal: React.FC<IModalProps> = ({
    state,
    modalIsOpen,
    closeModal,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const onReset = (): void => form.resetFields();

    const enterLoading = (): void => setLoading(true);

    const [changePassword, { isError, isSuccess }] =
        useChangePasswordMutation();

    const onFinish = async (values: IChangePassword): Promise<void> => {
        enterLoading();
        try {
            const value: IPassword = {
                id: state,
                password: values.confirmPassword,
            };
            await changePassword(value).unwrap();
            onReset();
            setLoading(false);
        } catch (error) {
            message.error(error.data.message);
        }
    };

    return (
        <ModalWindow
            modalIsOpen={modalIsOpen}
            closeModal={() => closeModal()}
            bg={colors.passwordBg}
            modalBg={colors.bgBlack}
        >
            {isSuccess || isError || (
                <StyledForm
                    name="normal_login"
                    className="form"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={(values) => onFinish(values as IChangePassword)}
                >
                    <FormItem
                        label={t('ContactInfo.passwordTitle.item')}
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: `${t(
                                    'ContactInfo.passwordTitle.error'
                                )}`,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject(
                                            new Error(
                                                t(
                                                    'ContactInfo.passwordTitle.error'
                                                )
                                            )
                                        );
                                    }

                                    const matched =
                                        getFieldValue('password').match(
                                            validatePassword
                                        );
                                    if (!matched) {
                                        return Promise.reject(
                                            new Error(
                                                t(
                                                    'ContactInfo.passwordTitle.error'
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
                                'ContactInfo.passwordTitle.placeholder'
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t('ContactInfo.conPasswordTitle.item')}
                        name="confirmPassword"
                        hasFeedback
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: `${t(
                                    'ContactInfo.conPasswordTitle.error'
                                )}`,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            t(
                                                'ContactInfo.conPasswordTitle.error'
                                            )
                                        )
                                    );
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

            <>
                {' '}
                {isSuccess && (
                    <Label pd="5px 0 5px 0">
                        {t('ContactInfo.afterChangePassword.success')}
                    </Label>
                )}
                {isError && (
                    <Label pd="5px 0 5px 0">
                        {t('ContactInfo.afterChangePassword.error')}
                    </Label>
                )}
            </>
        </ModalWindow>
    );
};

export default ContactInfoModal;
