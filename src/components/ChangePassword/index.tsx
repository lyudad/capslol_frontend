import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    FormButton,
    FormItem,
    PwrButton,
    StyledForm,
} from 'pages/ForgotPassword/styles';
import { FormPassword } from 'pages/ResetPassword/style';
import { validatePassword } from 'constants/validate';
import { IChangePassword, IProps } from './props';

const ChangePassword: React.FC<IProps> = ({ onFinish, loading }) => {
    const { t } = useTranslation();
    const [form] = StyledForm.useForm<IChangePassword>();

    return (
        <div>
            <StyledForm
                name="normal_login"
                className="form"
                form={form}
                initialValues={{ remember: true }}
                onFinish={(values) => onFinish(values as IChangePassword)}
            >
                <FormItem
                    label={t('ResetPage.passwordTitle.item')}
                    name="password"
                    htmlFor="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                        },

                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject(
                                        new Error(
                                            t('ResetPage.passwordTitle.error')
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
                                            t('ResetPage.passwordTitle.error')
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <FormPassword
                        placeholder={t('ResetPage.passwordTitle.placeholder')}
                        name="password"
                    />
                </FormItem>

                <FormItem
                    label={t('ResetPage.conPasswordTitle.item')}
                    name="confirmPassword"
                    dependencies={['password']}
                    htmlFor="confirmPassword"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('ResetPage.conPasswordTitle.password'),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const matched =
                                    getFieldValue('confirmPassword').match(
                                        validatePassword
                                    );
                                if (!matched) {
                                    return Promise.reject(
                                        new Error(
                                            t('ResetPage.passwordTitle.error')
                                        )
                                    );
                                }
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error(
                                        t('ResetPage.conPasswordTitle.error')
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <FormPassword
                        placeholder={t(
                            'ResetPage.conPasswordTitle.placeholder'
                        )}
                        name="confirmPassword"
                    />
                </FormItem>

                <FormButton>
                    <PwrButton
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                    >
                        {t('ResetPage.btnText')}
                    </PwrButton>
                </FormButton>
            </StyledForm>
        </div>
    );
};

export default ChangePassword;
